import React, { useState, useEffect } from "react";
import { FaSave, FaArrowLeft, FaPlus, FaTrash, FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import TextEditor from "../../../components/shared/TextEditor";
import 'react-quill-new/dist/quill.snow.css';

import { createTour, updateTour, getTourById } from "../../../api/tourService";
import { useTours } from "../../../hooks/useTours";
import { compressImageNative } from "../../../components/helpers/compressor";

const AddTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchTours } = useTours(); 
  const isEditMode = Boolean(id);

  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState([]); 
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    duration: "",
    groupSize: "",
    price: "",
    category: "",
    highlights: [""]
  });

  // ১. Edit Mode হলে ডাটা লোড করা
  useEffect(() => {
    if (isEditMode) {
      const loadTourData = async () => {
        try {
          const response = await getTourById(id);
          if (response.success) {
            setFormData(response.data);
            setDescription(response.data.description || "");

            if (response.data.images && response.data.images.length > 0) {
              const previousImages = response.data.images.map(imgUrl => ({
                file: null, 
                preview: imgUrl, 
                isExisting: true 
              }));
              setSelectedImages(previousImages);
            }
          }
        } catch (error) {
          console.error("ডাটা লোড করতে সমস্যা:", error);
        }
      };
      loadTourData();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ২. ইমেজ সিলেক্ট ও ক্লায়েন্ট-সাইড কমপ্রেশন হ্যান্ডলিং
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsCompressing(true);

    try {
      const compressedImageObjects = await Promise.all(
        files.map(async (file) => {
          // ইমেজ কমপ্রেশন
          const compressedFile = await compressImageNative(file, 1600, 1600, 0.7);
          return {
            file: compressedFile,
            preview: URL.createObjectURL(compressedFile),
            isExisting: false
          };
        })
      );

      setSelectedImages((prevImages) => [...prevImages, ...compressedImageObjects]);
    } catch (error) {
      console.error("ইমেজ কমপ্রেস করতে সমস্যা হয়েছে:", error);
    } finally {
      setIsCompressing(false);
      e.target.value = ""; // Input reset
    }
  };

  // ৩. ইমেজ রিমুভ ও মেমোরি ক্লিনআপ
  const removeImage = (index) => {
    const targetImage = selectedImages[index];
    if (targetImage && !targetImage.isExisting && targetImage.preview) {
      URL.revokeObjectURL(targetImage.preview);
    }

    const filtered = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(filtered);
  };

  const handleHighlightChange = (index, value) => {
    const list = [...formData.highlights];
    list[index] = value;
    setFormData({ ...formData, highlights: list });
  };

  const addHighlight = () => {
    setFormData({ ...formData, highlights: [...formData.highlights, ""] });
  };

  // ৪. সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const data = new FormData();

    Object.keys(formData).forEach(key => {
      if (key !== "highlights" && key !== "images" && key !== "description") {
        data.append(key, formData[key] || "");
      }
    });

    const finalDescription = Array.isArray(description) ? description[0] : description;
    data.append("description", finalDescription || "");
    data.append("highlights", JSON.stringify(formData.highlights || []));

    const existingImageUrls = [];

    selectedImages.forEach((imgObj) => {
      if (imgObj.file) {
        data.append("images", imgObj.file);
      } else if (imgObj.isExisting) {
        const cleanPath = imgObj.preview.replace("http://localhost:5000", "");
        existingImageUrls.push(cleanPath);
      }
    });

    data.append("existingImages", JSON.stringify(existingImageUrls));

    try {
      if (isEditMode) {
        await updateTour(id, data);
        alert("ট্যুর সফলভাবে আপডেট হয়েছে!");
      } else {
        await createTour(data);
        alert("নতুন ট্যুর সফলভাবে তৈরি হয়েছে!");
      }

      fetchTours(); 
      navigate("/admin/tours");
    } catch (error) {
      console.error("Submission Error:", error);
      alert(error.response?.data?.message || "সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate__animated animate__fadeIn pb-5 px-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-0" style={{ color: "var(--primary-teal)" }}>
            {isEditMode ? "Edit" : "Create New"} <span className="d-none d-lg-inline-block">Package</span>
          </h3>
        </div>
        <Link to="/admin/tours" className="btn btn-outline-secondary rounded-pill px-4 d-flex align-items-center">
          <FaArrowLeft className="me-2" /> Back
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-4 border-bottom pb-2">General Information</h5>
              <div className="row g-3">
                <div className="col-12">
                  <label className="small fw-bold mb-1">Tour Title</label>
                  <input type="text" name="title" className="form-control rounded-3" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Location</label>
                  <input type="text" name="location" className="form-control rounded-3" value={formData.location} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Category</label>
                  <select name="category" className="form-select rounded-3" value={formData.category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="City Tour">City Tour</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="small fw-bold mb-2 text-secondary">Detailed Description</label>
                  <TextEditor value={description} onChange={setDescription} />
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Highlights</h5>
              {formData.highlights.map((h, i) => (
                <div key={i} className="d-flex gap-2 mb-2">
                  <input type="text" className="form-control" value={h} onChange={(e) => handleHighlightChange(i, e.target.value)} placeholder="e.g. Luxury Hotel" />
                  <button type="button" className="btn btn-light text-danger" onClick={() => {
                    const list = [...formData.highlights];
                    list.splice(i, 1);
                    setFormData({...formData, highlights: list});
                  }}><FaTrash /></button>
                </div>
              ))}
              <button type="button" className="btn btn-sm mt-2" style={{backgroundColor: 'var(--primary-teal)', color: 'white'}} onClick={addHighlight}>
                <FaPlus size={12} /> Add More
              </button>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Pricing Details</h5>
              <div className="mb-3">
                <label className="small fw-bold mb-1">Price ($)</label>
                <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="small fw-bold mb-1">Duration</label>
                <input type="text" name="duration" className="form-control" value={formData.duration} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="small fw-bold mb-1">Group Size</label>
                <input type="text" name="groupSize" className="form-control" value={formData.groupSize} onChange={handleChange} />
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Upload Gallery</h5>
              <div className="upload-zone text-center p-4 border border-dashed rounded-4 mb-3" 
                   style={{ borderStyle: 'dashed', cursor: 'pointer', backgroundColor: '#f8faff' }}>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} id="fileInput" hidden disabled={isCompressing} />
                <label htmlFor="fileInput" className="cursor-pointer w-100 mb-0" style={{cursor: 'pointer'}}>
                  {isCompressing ? (
                    <>
                      <FaSpinner className="spinner-border text-teal mb-2" style={{ width: '24px', height: '24px' }} />
                      <p className="small mb-0 text-muted">Optimizing images...</p>
                    </>
                  ) : (
                    <>
                      <FaCloudUploadAlt size={40} style={{color: 'var(--primary-teal)'}} />
                      <p className="small mb-0">Click to upload JPG, PNG</p>
                    </>
                  )}
                </label>
              </div>

              <div className="row g-2">
                {selectedImages.map((img, i) => (
                  <div key={i} className="col-4 position-relative">
                    <img src={img.preview} className="img-fluid rounded-3 border" alt="preview" style={{ height: "60px", width: "100%", objectFit: "cover" }} />
                    <button type="button" onClick={() => removeImage(i)} className="btn btn-danger btn-sm position-absolute top-0 end-0 p-0 shadow-sm" style={{ width: "18px", height: "18px", fontSize: "12px", borderRadius: "50%" }}>×</button>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" disabled={isSubmitting || isCompressing} className="btn w-100 mt-4 py-3 rounded-4 shadow fw-bold text-white shadow-lg" style={{backgroundColor: 'var(--secondary-coral)'}}>
              {isSubmitting ? (
                <>
                  <FaSpinner className="spinner-border spinner-border-sm me-2" /> Saving...
                </>
              ) : (
                <>
                  <FaSave className="me-2" /> {isEditMode ? "Save Changes" : "Publish Package"}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTour;