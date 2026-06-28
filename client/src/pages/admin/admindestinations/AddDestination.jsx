import React, { useState, useEffect } from "react";
import { FaSave, FaArrowLeft, FaPlus, FaTrash, FaCloudUploadAlt, FaStar } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import TextEditor from "../../../components/shared/TextEditor";
import { createDestination, updateDestination, getDestinationById } from "../../../api/destinationService";
import useDestinations from "../../../hooks/useDestinations";
const AddDestination = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const { fetchDestinations } = useDestinations();

  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState([]); // নতুন ফাইল
  const [previewImages, setPreviewImages] = useState([]); // প্রিভিউ দেখানোর জন্য
  const [existingImages, setExistingImages] = useState([]); // পুরনো সার্ভারের ছবি
  const [highlightInput, setHighlightInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    duration: "",
    rating: "5.0",
    highlights: []
  });

  // ১. Edit Mode-এ ডাটা ফেচ করা
  useEffect(() => {
    if (isEditMode) {
      const fetchDetail = async () => {
        try {
          const res = await getDestinationById(id);
          if (res.success) {
            const data = res.data;
            setFormData({
              title: data.title,
              location: data.location,
              price: data.price,
              duration: data.duration,
              rating: data.rating,
              highlights: data.highlights || []
            });
            setDescription(data.description);
            setExistingImages(data.images || []); // সার্ভার থেকে আসা ছবি
          }
        } catch (err) {
          console.error("Fetch Error:", err);
          alert("Failed to load destination data");
        }
      };
      fetchDetail();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ২. ইমেজ হ্যান্ডলিং
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages([...selectedImages, ...files]);

    // প্রিভিউ তৈরি করা
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...filePreviews]);
  };

  const removeSelectedImage = (index) => {
    const updatedFiles = selectedImages.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    setSelectedImages(updatedFiles);
    setPreviewImages(updatedPreviews);
  };

  const removeExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  // ৩. Highlights হ্যান্ডেল করা
  const addHighlight = () => {
    if (highlightInput.trim()) {
      setFormData({
        ...formData,
        highlights: [...formData.highlights, highlightInput.trim()]
      });
      setHighlightInput("");
    }
  };

  const removeHighlight = (index) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index)
    });
  };

  // ৪. সাবমিট ফাংশন (FormData ব্যবহার করে)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("price", formData.price);
    data.append("duration", formData.duration);
    data.append("rating", formData.rating);
    data.append("description", description);
    data.append("highlights", JSON.stringify(formData.highlights));

    // নতুন ইমেজগুলো যুক্ত করা
    selectedImages.forEach(file => {
      data.append("images", file);
    });

    // এডিট মোডে থাকলে পুরনো ছবিগুলোও পাঠাতে হবে (যেগুলো ইউজার ডিলিট করেনি)
    if (isEditMode) {
      data.append("existingImages", JSON.stringify(existingImages));
    }

    try {
      if (isEditMode) {
        await updateDestination(id, data);
        alert("Destination Updated Successfully!");
      } else {
        await createDestination(data);
        alert("Destination Created Successfully!");
      }
      navigate("/admin/destinations");
    } catch (err) {
      alert(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
      // ডেস্টিনেশন লিস্ট রিফ্রেশ করা
      fetchDestinations();
  };

  return (
    <div className="animate__animated animate__fadeIn pb-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0" style={{ color: "var(--primary-teal)" }}>
          {isEditMode ? "Edit Destination" : "Create Destination"}
        </h3>
        <Link to="/admin/destinations" className="btn btn-outline-secondary rounded-pill px-4">
          <FaArrowLeft className="me-2" /> Back
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-4 border-bottom pb-2">Basic Details</h5>
              <div className="row g-3">
                <div className="col-12">
                  <label className="small fw-bold mb-1">Destination Title</label>
                  <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Location</label>
                  <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Duration</label>
                  <input type="text" name="duration" className="form-control" value={formData.duration} onChange={handleChange} />
                </div>
                <div className="col-12">
                  <label className="small fw-bold mb-2">Description</label>
                  <TextEditor value={description} onChange={setDescription} />
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Tour Highlights</h5>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Add highlight" value={highlightInput} onChange={(e) => setHighlightInput(e.target.value)} />
                <button className="btn text-white" type="button" style={{backgroundColor: 'var(--primary-teal)'}} onClick={addHighlight}><FaPlus /></button>
              </div>
              <div className="d-flex flex-wrap gap-2">
                {formData.highlights.map((item, index) => (
                  <span key={index} className="badge bg-light text-dark border p-2 d-flex align-items-center gap-2">
                    {item} <FaTrash size={10} className="text-danger cursor-pointer" onClick={() => removeHighlight(index)} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Pricing & Rating</h5>
              <div className="mb-3">
                <label className="small fw-bold mb-1">Price</label>
                <input type="text" name="price" className="form-control" value={formData.price} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="small fw-bold mb-1">Rating</label>
                <div className="input-group">
                  <span className="input-group-text bg-white"><FaStar className="text-warning" /></span>
                  <input type="number" step="0.1" max="5" name="rating" className="form-control" value={formData.rating} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Media Gallery</h5>
              <label htmlFor="file-upload" className="upload-zone text-center p-4 border border-dashed rounded-4 mb-3 w-100" style={{backgroundColor: 'var(--accent-alice-blue)', cursor: 'pointer'}}>
                <FaCloudUploadAlt size={30} style={{color: 'var(--primary-teal)'}} />
                <p className="small mb-0 text-muted">Click to upload images</p>
                <input id="file-upload" type="file" multiple hidden onChange={handleImageChange} accept="image/*" />
              </label>

              {/* ইমেজ প্রিভিউ */}
              <div className="row g-2">
                {/* পুরনো ছবি */}
                {existingImages.map((img, index) => (
                  <div key={`exist-${index}`} className="col-4 position-relative">
                    <img src={img} className="img-thumbnail w-100 h-100 object-fit-cover" alt="prev" />
                    <FaTrash className="position-absolute top-0 end-0 m-1 text-danger cursor-pointer bg-white p-1 rounded" onClick={() => removeExistingImage(index)} />
                  </div>
                ))}
                {/* নতুন সিলেক্ট করা ছবি */}
                {previewImages.map((img, index) => (
                  <div key={`new-${index}`} className="col-4 position-relative">
                    <img src={img} className="img-thumbnail border-primary w-100 h-100 object-fit-cover" alt="new-prev" />
                    <FaTrash className="position-absolute top-0 end-0 m-1 text-danger cursor-pointer bg-white p-1 rounded" onClick={() => removeSelectedImage(index)} />
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn w-100 mt-4 py-3 rounded-4 shadow fw-bold text-white" style={{backgroundColor: 'var(--secondary-coral)'}}>
              <FaSave className="me-2" /> {loading ? "Processing..." : (isEditMode ? "Save Changes" : "Publish Destination")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDestination;