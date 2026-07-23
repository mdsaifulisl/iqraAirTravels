import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaFileUpload, 
  FaPaperPlane,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaTag,
  FaStar,
  FaPlus,
  FaTrash,
  FaHome
} from "react-icons/fa";

import { getDestinationById } from "../../api/destinationService";
import { getTourById } from "../../api/tourService";
import { useBookings } from "../../hooks/useBookings";

const MAX_FILE_SIZE_MB = 5;

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { createBooking, message, error } = useBookings() || {};

  const bookingType = searchParams.get("type") || "tour"; 
  const itemId = searchParams.get("id") || "";

  const [packageData, setPackageData] = useState(null);
  const [fetchingPackage, setFetchingPackage] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    specialRequest: "",
  });

  const [files, setFiles] = useState([
    { id: Date.now(), file: null, label: "Passport Copy", isRequired: true }
  ]);
  const [fileError, setFileError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      if (!itemId) {
        setFetchingPackage(false);
        return;
      }

      try {
        setFetchingPackage(true);
        let res;
        if (bookingType === "hajj") {
          res = await getDestinationById(itemId);
        } else {
          res = await getTourById(itemId);
        }

        const data = res?.data || res;
        setPackageData(data);
      } catch (err) {
        console.error("Failed to load package details:", err);
      } finally {
        setFetchingPackage(false);
      }
    };

    fetchPackageDetails();
  }, [itemId, bookingType]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fullName" && value.length > 60) return;
    if (name === "phone" && value.length > 20) return;
    if (name === "address" && value.length > 150) return;
    if (name === "specialRequest" && value.length > 500) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFile = () => {
    setFiles((prev) => [
      ...prev, 
      { id: Date.now(), file: null, label: "", isRequired: false }
    ]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileError("");
  };

  const handleFileChange = (index, event) => {
    const selectedFile = event.target.files[0];
    setFileError("");

    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setFileError(`File "${selectedFile.name}" exceeds the ${MAX_FILE_SIZE_MB}MB size limit.`);
        event.target.value = "";
        return;
      }

      const updatedFiles = [...files];
      updatedFiles[index].file = selectedFile;
      setFiles(updatedFiles);
    }
  };

  const handleLabelChange = (index, event) => {
    const updatedFiles = [...files];
    updatedFiles[index].label = event.target.value.slice(0, 30);
    setFiles(updatedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submissionData = new FormData();
    submissionData.append("bookingType", bookingType);
    submissionData.append("itemId", itemId);
    
    submissionData.append("fullName", formData.fullName.trim());
    submissionData.append("email", formData.email.trim());
    submissionData.append("phone", formData.phone.trim());
    submissionData.append("address", formData.address.trim());
    submissionData.append("specialRequest", formData.specialRequest.trim());

    files.forEach((item, index) => {
      if (item.file) {
        submissionData.append("documents", item.file);
        submissionData.append("documentLabels", item.label || `Document ${index + 1}`);
      }
    });

    const res = await createBooking(submissionData);

    if (res?.success) {
      // ১. টেক্সট ফিল্ড রিসেট
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        specialRequest: "",
      });

      // ২. ফাইল স্টেট রিসেট
      setFiles([
        { id: Date.now(), file: null, label: "Passport Copy", isRequired: true }
      ]);
      setFileError("");
    }

    setLoading(false);

    // সাবমিট করার পর স্মুথলি পেজের একদম উপরে স্ক্রোল হবে
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="booking-wrapper py-5 bg-light" style={{ minHeight: "90vh" }}>
      <div className="container">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-secondary mb-4 rounded-pill px-4 shadow-sm"
        >
          <FaArrowLeft className="me-2" /> Back
        </button>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
              <div className="text-center mb-4">
                <h3 className="fw-bold text-teal text-uppercase">
                  Complete Your Booking
                </h3>
                <p className="text-muted small">
                  Please fill out the form below to complete your booking process
                </p>
              </div>

              {/* সাকসেস মেসেজ */}
              {message && (
                <div className="alert alert-success py-2 small text-center mb-4 shadow-sm rounded-3">
                  {message}
                </div>
              )}

              {/* এরর মেসেজ */}
              {error && (
                <div className="alert alert-danger py-2 small text-center mb-4 shadow-sm rounded-3">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <h5 className="fw-bold text-secondary mb-3 border-bottom pb-2">
                  Customer Details
                </h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Full Name *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0"><FaUser className="text-muted" /></span>
                      <input
                        type="text"
                        name="fullName"
                        maxLength="60"
                        className="form-control bg-light border-0 py-2"
                        placeholder="John Doe"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Phone Number *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0"><FaPhone className="text-muted" /></span>
                      <input
                        type="tel"
                        name="phone"
                        maxLength="20"
                        className="form-control bg-light border-0 py-2"
                        placeholder="+880 1700 000000"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Email Address (Optional)</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0"><FaEnvelope className="text-muted" /></span>
                      <input
                        type="email"
                        name="email"
                        maxLength="80"
                        className="form-control bg-light border-0 py-2"
                        placeholder="example@mail.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Address *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0"><FaHome className="text-muted" /></span>
                      <input
                        type="text"
                        name="address"
                        maxLength="150"
                        className="form-control bg-light border-0 py-2"
                        placeholder="City, Country / Full Address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                  <h5 className="fw-bold text-secondary mb-0">
                    Documents Upload (Max {MAX_FILE_SIZE_MB}MB each)
                  </h5>
                  <button
                    type="button"
                    onClick={handleAddFile}
                    className="btn btn-outline-teal btn-sm rounded-pill d-flex align-items-center gap-1 px-3"
                  >
                    <FaPlus size={12} /> Add More File
                  </button>
                </div>

                {fileError && (
                  <div className="alert alert-danger py-2 small mb-3">
                    {fileError}
                  </div>
                )}

                <div className="d-flex flex-column gap-3 mb-4">
                  {files.map((item, index) => (
                    <div key={item.id} className="bg-light p-3 rounded-3 border">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label small fw-bold mb-0 text-secondary">
                          {item.isRequired ? "Document Title (Required)" : `Document Title #${index + 1}`}
                        </label>
                        {!item.isRequired && (
                          <button
                            type="button"
                            className="btn btn-link text-danger p-0 border-0 align-self-end"
                            onClick={() => handleRemoveFile(index)}
                            title="Remove file"
                          >
                            <FaTrash size={14} /> <span className="small">Remove</span>
                          </button>
                        )}
                      </div>

                      <div className="mb-2">
                        <input
                          type="text"
                          placeholder="Document Title (e.g. Passport / NID)"
                          className="form-control border-0 bg-white small py-2"
                          maxLength="30"
                          value={item.label}
                          onChange={(e) => handleLabelChange(index, e)}
                          readOnly={item.isRequired}
                        />
                      </div>

                      <div>
                        <div className="input-group">
                          <span className="input-group-text bg-white border-0"><FaFileUpload className="text-muted" /></span>
                          <input
                            key={item.id}
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, application/pdf"
                            className="form-control border-0 bg-white"
                            onChange={(e) => handleFileChange(index, e)}
                            required={item.isRequired}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold">Special Notes (Max 500 chars)</label>
                  <textarea
                    name="specialRequest"
                    rows="3"
                    maxLength="500"
                    className="form-control bg-light border-0"
                    placeholder="Special Notes..."
                    value={formData.specialRequest}
                    onChange={handleChange}
                  ></textarea>
                  <div className="text-end text-muted small mt-1">
                    {formData.specialRequest.length}/500
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-teal w-100 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                  disabled={loading}
                >
                  {loading ? "Submitting Request..." : <><FaPaperPlane /> Confirm & Submit Booking</>}
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white position-sticky" style={{ top: "90px" }}>
              <div className="bg-teal text-white p-3 text-center">
                <h5 className="fw-bold text-white mb-0 text-uppercase">
                  {bookingType === "hajj" ? "Hajj & Umrah Summary" : "Tour Summary"}
                </h5>
              </div>

              {fetchingPackage ? (
                <div className="p-4 text-center">
                  <div className="spinner-border text-teal spinner-border-sm" role="status"></div>
                  <p className="small text-muted mt-2 mb-0">Loading package details...</p>
                </div>
              ) : packageData ? (
                <div>
                  {packageData.images?.[0] && (
                    <img
                      src={packageData.images[0]}
                      alt={packageData.title}
                      className="w-100 object-fit-cover"
                      style={{ height: "180px" }}
                    />
                  )}

                  <div className="p-4">
                    <h5 className="fw-bold text-teal mb-3">{packageData.title}</h5>

                    <div className="d-flex flex-column gap-2 border-bottom pb-3 mb-3 text-muted small">
                      <div className="d-flex align-items-center gap-2">
                        <FaMapMarkerAlt className="text-coral" />
                        <span><strong>Location:</strong> {packageData.location}</span>
                      </div>
                      
                      <div className="d-flex align-items-center gap-2">
                        <FaClock className="text-teal" />
                        <span><strong>Duration:</strong> {packageData.duration}</span>
                      </div>

                      {bookingType === "tour" && packageData.category && (
                        <div className="d-flex align-items-center gap-2">
                          <FaTag className="text-teal" />
                          <span><strong>Category:</strong> {packageData.category}</span>
                        </div>
                      )}

                      {packageData.rating && (
                        <div className="d-flex align-items-center gap-2">
                          <FaStar className="text-warning" />
                          <span><strong>Rating:</strong> {packageData.rating}</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-alice-blue p-3 rounded-3 text-center">
                      <small className="text-muted d-block text-uppercase fw-bold">Package Price</small>
                      <h3 className="fw-bold text-teal mb-0">{packageData.price}</h3>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-muted small">
                  প্যাকেজের কোনো তথ্য পাওয়া যায়নি।
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;