import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaPrint, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaClock, 
  FaTimesCircle,
  FaMapMarkerAlt,
  FaFileAlt,
  FaDownload,
  FaExpand,
  FaTag,
  FaMoneyBillWave,
  FaKaaba,
  FaSuitcase,
  FaHashtag
} from "react-icons/fa";
import { useBookings } from "../../../hooks/useBookings"; 
import { getBookingById } from "../../../api/bookingService"; 
import { getTourById } from "../../../api/tourService";
import { getDestinationById } from "../../../api/destinationService"; // Hajj service

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { changeBookingStatus } = useBookings();

  const [booking, setBooking] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemLoading, setItemLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Image Preview Lightbox State
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchSingleBooking = async () => {
      setLoading(true);
      try {
        const response = await getBookingById(id);
        const data = response.data || response;
        setBooking(data);
        setError(null);

        // Fetch Tour or Hajj details based on bookingType and itemId
        if (data?.itemId && data?.bookingType) {
          fetchBookedItem(data.itemId, data.bookingType);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Booking details not found");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSingleBooking();
    }
  }, [id]);

  const fetchBookedItem = async (itemId, bookingType) => {
    setItemLoading(true);
    try {
      let res;
      if (bookingType === "tour") {
        res = await getTourById(itemId);
      } else if (bookingType === "hajj") {
        res = await getDestinationById(itemId);
      }
      setItemDetails(res?.data || res);
    } catch (err) {
      console.error("Failed to fetch booked item details:", err);
    } finally {
      setItemLoading(false);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    const res = await changeBookingStatus(id, newStatus);
    if (res.success) {
      setBooking((prev) => ({ ...prev, status: newStatus }));
    } else {
      alert(res.message || "Failed to update status");
    }
  };

  // Direct Blob Download Logic
  const handleDownload = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || fileUrl.split("/").pop() || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed, opening in new tab instead:", error);
      window.open(fileUrl, "_blank");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmed":
        return (
          <span className="badge bg-success-subtle text-success border border-success px-3 py-2">
            <FaCheckCircle className="me-1" /> Confirmed
          </span>
        );
      case "Pending":
        return (
          <span className="badge bg-warning-subtle text-warning border border-warning px-3 py-2">
            <FaClock className="me-1" /> Pending
          </span>
        );
      case "Cancelled":
        return (
          <span className="badge bg-danger-subtle text-danger border border-danger px-3 py-2">
            <FaTimesCircle className="me-1" /> Cancelled
          </span>
        );
      default:
        return <span className="badge bg-secondary px-3 py-2">{status || "Pending"}</span>;
    }
  };

  const isImageFile = (filePath) => {
    if (!filePath) return false;
    return /\.(jpg|jpeg|png|webp|gif)$/i.test(filePath);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-teal" role="status">
          <span className="visually-hidden">Loading details...</span>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="container-fluid p-4 text-center">
        <div className="alert alert-danger mb-3">{error || "No booking data found"}</div>
        <button className="btn btn-secondary btn-sm" onClick={() => navigate("/admin/bookings")}>
          <FaArrowLeft className="me-1" /> Back to Bookings
        </button>
      </div>
    );
  }

  // Safely parse JSON images if stringified
  let itemImages = [];
  if (itemDetails?.images) {
    itemImages = typeof itemDetails.images === "string" 
      ? JSON.parse(itemDetails.images) 
      : itemDetails.images;
  }

  // Determine dynamic package route
  const packageRoute = booking.bookingType === "hajj" 
    ? `/hajj&umrah/${booking.itemId}` 
    : `/tours/${booking.itemId}`;

  return (
    <div className="container-fluid p-4">
      {/* Header Actions */}
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
        <button
          className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2 rounded-2"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Back to Bookings
        </button>

        <div className="d-flex align-items-center gap-2">
          <select
            className="form-select form-select-sm fw-bold"
            value={booking.status || "Pending"}
            onChange={handleStatusChange}
            style={{ width: "150px" }}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* <button
            className="btn btn-sm btn-primary d-flex align-items-center gap-2 rounded-2"
            onClick={() => window.print()}
          >
            <FaPrint /> Print Voucher
          </button> */}
        </div>
      </div>

      {/* Grid Layout: Desktop-এ Package Details বামে (col-lg-5), Mobile-এ নিচে */}
      <div className="row g-4 flex-column-reverse flex-lg-row">
        
        {/* Left Side (Desktop): Package Details */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-3 p-md-4 rounded-3 mb-4">
            <div className="border-bottom pb-3 mb-3">
              <h5 className="fw-bold text-dark m-0 text-truncate">
                {itemDetails?.title || `Package ID: ${booking.itemId}`}
              </h5>
              {itemDetails?.location && (
                <p className="text-muted small mt-1 mb-0">
                  <FaMapMarkerAlt className="me-1 text-danger" /> {itemDetails.location}
                </p>
              )}
            </div>

            {/* Package Spec Cards */}
            {itemLoading ? (
              <div className="text-center py-3">
                <div className="spinner-border spinner-border-sm text-teal" role="status"></div>
                <span className="ms-2 small text-muted">Loading package details...</span>
              </div>
            ) : itemDetails ? (
              <div className="bg-light p-3 rounded-3 mb-3">
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <small className="text-muted d-block extra-small">Price</small>
                    <span className="fw-bold text-success small">
                      <FaMoneyBillWave className="me-1" />
                      {itemDetails.price || "N/A"}
                    </span>
                  </div>
                  <div className="col-6">
                    <small className="text-muted d-block extra-small">Duration</small>
                    <span className="fw-semibold text-dark small">
                      <FaClock className="me-1 text-muted" />
                      {itemDetails.duration || "N/A"}
                    </span>
                  </div>
                  {itemDetails.category && (
                    <div className="col-12 mt-2">
                      <small className="text-muted d-block extra-small">Category</small>
                      <span className="fw-semibold text-dark small">
                        <FaTag className="me-1 text-muted" />
                        {itemDetails.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Package Gallery */}
                {Array.isArray(itemImages) && itemImages.length > 0 && (
                  <div className="mt-3 border-top pt-3">
                    <small className="text-muted d-block mb-2 fw-bold extra-small">Package Gallery:</small>
                    <div className="d-flex gap-2 overflow-auto pb-1">
                      {itemImages.map((img, idx) => {
                        const imgUrl = `${img}`;
                        return (
                          <img
                            key={idx}
                            src={imgUrl}
                            alt="Package preview"
                            className="rounded border object-fit-cover cursor-pointer"
                            style={{ width: "60px", height: "45px", cursor: "pointer" }}
                            onClick={() => setPreviewImage(imgUrl)}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* Requested Package Dynamic Route Button (New Tab) */}
            {booking.itemId && (
              <div className="pt-2 text-end">
                <button
                  type="button"
                  onClick={() => window.open(packageRoute, "_blank")}
                  className="btn btn-coral btn-sm px-4 rounded-pill shadow-sm"
                >
                  View Details
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side (Desktop): Customer Details & Booking Documents (col-lg-7) */}
        <div className="col-lg-7">
          {/* Customer Card */}
          <div className="card border-0 shadow-sm p-4 rounded-3 mb-4">
            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
              <h5 className="fw-bold text-dark m-0">Customer Details</h5>
              <div>{getStatusBadge(booking.status)}</div>
            </div>

            {/* Booking Category (Tour / Hajj) */}
            <div className="mb-3">
              <span className="badge bg-teal-subtle text-teal fw-bold py-2 px-3 border border-teal text-capitalize w-100 d-flex align-items-center justify-content-center gap-2" style={{ color: "var(--primary-teal, #0f766e)", fontSize: "13px" }}>
                {booking.bookingType === "hajj" ? <FaKaaba className="fs-6" /> : <FaSuitcase className="fs-6" />}
                Booking Type: {booking.bookingType === "hajj" ? "Hajj / Umrah Package" : "Tour Package"}
              </span>
            </div>

            {/* Booking Meta: ID & Date */}
            <div className="row g-2 mb-3">
              <div className="col-6">
                <div className="p-2 bg-light rounded-3 border">
                  <small className="text-muted d-block extra-small">Booking ID</small>
                  <strong className="small text-dark font-monospace" title={booking.id}>
                    <FaHashtag className="me-1 text-teal" />
                    {booking.id?.slice(0, 8)}...
                  </strong>
                </div>
              </div>
              <div className="col-6">
                <div className="p-2 bg-light rounded-3 border">
                  <small className="text-muted d-block extra-small">Booking Date</small>
                  <strong className="small text-dark">
                    <FaCalendarAlt className="me-1 text-primary" />
                    {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "N/A"}
                  </strong>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="p-2 bg-light rounded-circle text-primary">
                  <FaUser />
                </div>
                <div>
                  <small className="text-muted d-block">Full Name</small>
                  <span className="fw-bold text-dark">{booking.fullName}</span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="p-2 bg-light rounded-circle text-primary">
                  <FaEnvelope />
                </div>
                <div>
                  <small className="text-muted d-block">Email Address</small>
                  <span className="small text-dark">{booking.email || "N/A"}</span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="p-2 bg-light rounded-circle text-primary">
                  <FaPhone />
                </div>
                <div>
                  <small className="text-muted d-block">Phone Number</small>
                  <span className="small text-dark fw-semibold">{booking.phone}</span>
                </div>
              </div>

              {booking.address && (
                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 bg-light rounded-circle text-primary">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <small className="text-muted d-block">Customer Address</small>
                    <span className="small text-dark">{booking.address}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Special Request */}
            {booking.specialRequest && (
              <div className="border border-warning-subtle bg-warning-subtle p-3 rounded-3 mt-3">
                <small className="fw-bold text-dark d-block mb-1">Customer Special Request:</small>
                <p className="small m-0 text-secondary">{booking.specialRequest}</p>
              </div>
            )}
          </div>

          {/* Booking Documents Card */}
          {booking.documents && booking.documents.length > 0 && (
            <div className="card border-0 shadow-sm p-4 rounded-3">
              <h5 className="fw-bold border-bottom pb-2 mb-3 text-dark">
                Booking Documents ({booking.documents.length})
              </h5>
              
              <div className="row g-3">
                {booking.documents.map((doc) => {
                  const fileUrl = `${doc.filePath}`;
                  const isImg = isImageFile(doc.filePath);
                  const fileName = doc.filePath?.split("/").pop() || doc.label;

                  return (
                    <div key={doc.id} className="col-12 col-sm-6">
                      <div className="card h-100 border rounded-3 overflow-hidden shadow-sm">
                        {isImg ? (
                          <div 
                            className="position-relative bg-dark text-center" 
                            style={{ height: "120px", cursor: "pointer" }}
                            onClick={() => setPreviewImage(fileUrl)}
                          >
                            <img
                              src={fileUrl}
                              alt={doc.label || "Document"}
                              className="w-100 h-100 object-fit-cover opacity-75-hover"
                            />
                            <span className="position-absolute top-50 start-50 translate-middle text-white bg-dark bg-opacity-50 p-2 rounded-circle">
                              <FaExpand />
                            </span>
                          </div>
                        ) : (
                          <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: "120px" }}>
                            <FaFileAlt className="text-teal display-4" />
                          </div>
                        )}

                        <div className="p-2 d-flex flex-column justify-content-between flex-grow-1">
                          <div className="mb-2">
                            <strong className="d-block small text-dark text-truncate" title={doc.label}>
                              {doc.label || "Document"}
                            </strong>
                            <span className="text-muted extra-small d-block text-truncate" style={{ fontSize: "11px" }}>
                              {fileName}
                            </span>
                          </div>

                          <div className="d-flex gap-1 mt-auto">
                            {isImg && (
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-1"
                                style={{ fontSize: "12px" }}
                                onClick={() => setPreviewImage(fileUrl)}
                              >
                                <FaExpand /> View
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDownload(fileUrl, fileName)}
                              className="btn btn-sm text-white flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-1"
                              style={{ fontSize: "12px", backgroundColor: "var(--primary-teal, #0f766e)" }}
                            >
                              <FaDownload /> Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Lightbox Modal for Image Preview */}
      {previewImage && (
        <div 
          className="modal fade show d-block bg-dark bg-opacity-75" 
          tabIndex="-1" 
          style={{ zIndex: 1055 }}
          onClick={() => setPreviewImage(null)}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-transparent border-0">
              <div className="modal-header border-0 pb-0">
                <button 
                  type="button" 
                  className="btn-close btn-close-white ms-auto" 
                  onClick={() => setPreviewImage(null)}
                ></button>
              </div>
              <div className="modal-body text-center p-2">
                <img 
                  src={previewImage} 
                  alt="Enlarged document" 
                  className="img-fluid rounded shadow-lg"
                  style={{ maxHeight: "80vh", objectFit: "contain" }}
                  onClick={(e) => e.stopPropagation()} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;