
import React, { useState, useEffect } from "react";
import { FaSave, FaArrowLeft, FaCloudUploadAlt, FaHeading, FaLink, FaQuoteLeft } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createSlider, getSliderById, updateSlider } from "../../../api/sliderService";
import useSlider from "../../../hooks/useSlider";

const AddSlider = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const { setSliders, fetchSliders } = useSlider();

  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    headline: "",
    subtext: "",
    btn1: "Explore Now",
    btn2: "Learn More",
    link: "/destinations", 
    image: ""
  });

  // 
  const linkOptions = [
    { label: "Destinations Page", value: "/destinations" },
    { label: "Tours Page", value: "/tours" },
    { label: "Visa Services", value: "/visa-service" },
    { label: "Air Tickets", value: "/air-tickets" },
    { label: "Blog Page", value: "/blog" },
    { label: "Contact Us", value: "/contact" },
  ];

  useEffect(() => {
    if (isEditMode) {

      const fetchSliderDetails = async () => {
        try {
          const res = await getSliderById(id);
          if (res.success) {
            const slider = res.data;
            setFormData({
              headline: slider.headline || "",
              subtext: slider.subtext || "",
              btn1: slider.btn1 || "",
              btn2: slider.btn2 || "",
              link: slider.link || "/destinations",
              image: slider.image || ""
            });
            setSelectedImage({ preview: slider.image });
          }
        } catch (err) {
          console.error("Error fetching slider details:", err.message);
          toast.error("Failed to load slider details. Please try again.");
        }
      }
      
      fetchSliderDetails();
    }
  }, [id, isEditMode]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage({
        preview: URL.createObjectURL(file),
        file: file
      });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // ১. সাধারণ অবজেক্টের বদলে FormData তৈরি করুন
  const data = new FormData();
  data.append("headline", formData.headline);
  data.append("subtext", formData.subtext);
  data.append("btn1", formData.btn1);
  data.append("btn2", formData.btn2);
  data.append("link", formData.link);

  
  if (selectedImage && selectedImage.file) {
   
    data.append("image", selectedImage.file);
  } else if (isEditMode && formData.image) {
    
    data.append("image", formData.image);
  }

  try {
    let res;
    if (isEditMode) {
      
       res = await updateSlider(id, data);

        
    } else {
      
      if (!selectedImage?.file) {
        return toast.error("Please select an image first!");
      }
      res = await createSlider(data);
    }

    if (res.success) {
      await fetchSliders(); // Refresh the slider list
      setSliders(res);
      navigate(-1);
      toast.success(res.message);
    }
  } catch (error) {
    console.error("Submission Error:", error);
    toast.error(error.response?.data?.message || "Server Error!");
  }
};

  return (
    <div className="animate__animated animate__fadeIn pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: "var(--primary-teal)" }}>
            {isEditMode ? "Edit Hero Slider" : "Add New Slider"}
          </h3>
          <p className="text-muted small">Manage your homepage banner content</p>
        </div>
        <button onClick={ () => navigate(-1)} className="btn btn-outline-secondary rounded-pill px-4 shadow-sm">
          <FaArrowLeft className="me-2" /> Back
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-4 border-bottom pb-2">Content Information</h5>
              
              <div className="row g-3">
                {/* Headline */}
                <div className="col-12">
                  <label className="small fw-bold mb-1">Slider Headline</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0"><FaHeading size={14} /></span>
                    <input 
                      type="text" className="form-control border-0 bg-light py-3" 
                      value={formData.headline}
                      onChange={(e) => setFormData({...formData, headline: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Subtext */}
                <div className="col-12">
                  <label className="small fw-bold mb-1">Subtext</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0 align-items-start pt-3"><FaQuoteLeft size={14} /></span>
                    <textarea 
                      className="form-control border-0 bg-light py-2" rows="3"
                      value={formData.subtext}
                      onChange={(e) => setFormData({...formData, subtext: e.target.value})}
                      required
                    ></textarea>
                  </div>
                </div>

                {/* Buttons */}
                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Button 1 Text</label>
                  <input 
                    type="text" className="form-control border-0 bg-light py-3" 
                    value={formData.btn1}
                    onChange={(e) => setFormData({...formData, btn1: e.target.value})}
                  />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Button 2 Text</label>
                  <input 
                    type="text" className="form-control border-0 bg-light py-3" 
                    value={formData.btn2}
                    onChange={(e) => setFormData({...formData, btn2: e.target.value})}
                  />
                </div>

                {/* Redirect Link - এটি এখন Select Dropdown */}
                <div className="col-12">
                  <label className="small fw-bold mb-1">Redirect To (Page)</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0"><FaLink size={14} /></span>
                    <select 
                      className="form-select border-0 bg-light py-3"
                      value={formData.link}
                      onChange={(e) => setFormData({...formData, link: e.target.value})}
                    >
                      {linkOptions.map((opt, index) => (
                        <option key={index} value={opt.value}>{opt.label} ({opt.value})</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
              <h5 className="fw-bold mb-3 border-bottom pb-2 text-start">Background Image</h5>
              <div className="mb-3">
                <div className="bg-light rounded-4 overflow-hidden border border-dashed mb-3" style={{height: '180px'}}>
                  {selectedImage ? (
                    <img src={selectedImage.preview} className="w-100 h-100" style={{ objectFit: "cover" }} alt="" />
                  ) : (
                    <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted">
                      <FaCloudUploadAlt size={40} />
                      <span className="small">Upload Image</span>
                    </div>
                  )}
                </div>
                <label className="btn btn-teal w-100 rounded-pill py-2 text-white shadow-sm" style={{backgroundColor: 'var(--primary-teal)', cursor: 'pointer'}}>
                   Choose File
                  <input type="file" hidden onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
            </div>

            <button type="submit" className="btn w-100 mt-4 py-3 rounded-4 shadow fw-bold text-white border-0" style={{backgroundColor: 'var(--secondary-coral)'}}>
              <FaSave className="me-2" /> {isEditMode ? "Update Changes" : "Save Slider"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSlider;