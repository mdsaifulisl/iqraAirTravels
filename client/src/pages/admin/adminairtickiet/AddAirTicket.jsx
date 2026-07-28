import React, { useState, useEffect } from "react";
import { FaSave, FaArrowLeft, FaCloudUploadAlt, FaPlane, FaDollarSign, FaTicketAlt, FaTrash } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { createAirTicket, updateAirTicket, getAirTicketById } from "../../../api/airTicketService";
import { compressImageNative } from "../../../components/helpers/compressor";
import { toast } from "react-hot-toast";

const AddAirTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    airline: "",
    price: "",
    trip_type: "Round Trip", 
    description: "",
    image: null,
  });

  // ১. এডিট মোডে থাকলে ডাটাবেস থেকে ডাটা ফেচ করা
  useEffect(() => {
    if (isEditMode) {
      const fetchTicket = async () => {
        try {
          const res = await getAirTicketById(id);
          if (res.success) {
            const data = res.data;
            setFormData({
              from: data.from || "",
              to: data.to || "",
              airline: data.airline || "",
              price: data.price || "",
              trip_type: data.trip_type || "Round Trip",
              description: data.description || "",
              image: null, 
            });
            setPreviewImage(data.image); 
          }
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
          toast.error("Failed to load ticket data");
        }
      };
      fetchTicket();
    }
  }, [id, isEditMode]);

  // ২. ইমেজ হ্যান্ডলার (প্রিভিউ সহ)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // প্রাথমিক সাইজ চেক (৫ MB পর্যন্ত এলাউড, কারণ পরে কম্প্রেস হবে)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size is too large! Max 5MB allowed.");
        e.target.value = "";
        return;
      }
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // প্রিভিউ রিমুভ হ্যান্ডলার
  const handleRemoveImage = () => {
    setFormData({ ...formData, image: null });
    setPreviewImage(null);
  };

  // ৩. সাবমিট হ্যান্ডলার (Create & Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("from", formData.from.trim());
      submitData.append("to", formData.to.trim());
      submitData.append("airline", formData.airline.trim());
      submitData.append("price", formData.price.trim());
      submitData.append("trip_type", formData.trip_type); 
      submitData.append("description", formData.description.trim());
      
      // ছবি থাকলে Native Canvas দিয়ে কম্প্রেস করে পাঠানো
      if (formData.image) {
        let finalImage = formData.image;
        if (formData.image.type.startsWith("image/")) {
          finalImage = await compressImageNative(formData.image, 1600, 1600, 0.7);
        }
        submitData.append("image", finalImage);
      }

      let res;
      if (isEditMode) {
        res = await updateAirTicket(id, submitData);
      } else {
        res = await createAirTicket(submitData);
      }

      if (res?.success) {
        toast.success(isEditMode ? "Updated successfully!" : "Created successfully!");
        navigate("/admin/tickets");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate__animated animate__fadeIn pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0" style={{ color: "var(--primary-teal)" }}>
          {isEditMode ? "Edit Air Ticket" : "Add New Ticket"}
        </h3>
        <Link to="/admin/tickets" className="btn btn-outline-secondary rounded-pill px-4 shadow-sm">
          <FaArrowLeft className="me-2" /> Back
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-4 border-bottom pb-2">Flight Route Info</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Departure (From)</label>
                  <input 
                    type="text" 
                    className="form-control border-0 bg-light py-3" 
                    placeholder="e.g. Dhaka (DAC)"
                    value={formData.from}
                    onChange={(e) => setFormData({...formData, from: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Arrival (To)</label>
                  <input 
                    type="text" 
                    className="form-control border-0 bg-light py-3" 
                    placeholder="e.g. Bangkok (BKK)"
                    value={formData.to}
                    onChange={(e) => setFormData({...formData, to: e.target.value})}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="small fw-bold mb-1">Airline Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0"><FaPlane size={14} /></span>
                    <input 
                      type="text" 
                      className="form-control border-0 bg-light py-3" 
                      placeholder="e.g. Emirates"
                      value={formData.airline}
                      onChange={(e) => setFormData({...formData, airline: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Details / Description</h5>
              <textarea 
                className="form-control border-0 bg-light" 
                rows="5" 
                placeholder="Add flight schedule or other details..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Pricing & Type</h5>
              <div className="mb-3">
                <label className="small fw-bold mb-1">Ticket Price</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0"><FaDollarSign size={14} /></span>
                  <input 
                    type="text" 
                    className="form-control border-0 bg-light py-2" 
                    placeholder="e.g. 50,000 BDT"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="small fw-bold mb-1">Trip Type</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0"><FaTicketAlt size={14} /></span>
                  <select 
                    className="form-select border-0 bg-light py-2" 
                    value={formData.trip_type} 
                    onChange={(e) => setFormData({...formData, trip_type: e.target.value})}
                  >
                    <option value="Round Trip">Round Trip</option>
                    <option value="One Way">One Way</option>
                    <option value="Multi-City">Multi-City</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Featured Image</h5>
              
              <label htmlFor="file-upload" className="upload-zone text-center p-4 border border-dashed rounded-4 mb-3" style={{backgroundColor: 'var(--accent-alice-blue)', cursor: 'pointer', display: 'block'}}>
                <FaCloudUploadAlt size={40} className="mb-2" style={{color: 'var(--primary-teal)'}} />
                <p className="small mb-1 fw-bold">Click to Upload Image</p>
                <p className="text-muted extra-small mb-0">PNG, JPG or JPEG (Max 5MB)</p>
                <input id="file-upload" type="file" accept="image/png, image/jpeg, image/jpg" hidden onChange={handleImageChange} />
              </label>

              {previewImage && (
                <div className="position-relative animate__animated animate__zoomIn">
                  <img src={previewImage} className="img-fluid rounded-3 border w-100" style={{ height: "180px", objectFit: "cover" }} alt="Preview" />
                  <button type="button" className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle shadow-sm" onClick={handleRemoveImage}>
                    <FaTrash size={12} />
                  </button>
                </div>
              )}
            </div>

            <button type="submit" disabled={loading} className="btn w-100 mt-4 py-3 rounded-4 shadow fw-bold text-white border-0" style={{backgroundColor: 'var(--secondary-coral)'}}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Compressing & Saving...
                </>
              ) : (
                <><FaSave className="me-2" /> {isEditMode ? "Update Ticket" : "Save Air Ticket"}</>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAirTicket;