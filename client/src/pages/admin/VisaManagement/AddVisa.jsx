/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  FaSave,
  FaArrowLeft,
  FaPlus,
  FaCloudUploadAlt,
  FaPassport,
  FaTimes,
} from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import TextEditor from "../../../components/shared/TextEditor";
import { createVisa, updateVisa, getVisaById } from "../../../api/visaService";
import useVisas from "../../../hooks/useVisas";
import { toast } from "react-hot-toast";

const AddVisa = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshVisas } = useVisas();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [requirementInput, setRequirementInput] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    country: "",
    type: "",
    fee: "",
    duration: "",
    validity: "",
    entry: "",
    continent: "",
  });

  // ১. ডাটা লোড করার সময় ইমেজের অরিজিনাল পাথ সেভ রাখা
  useEffect(() => {
    if (isEditMode) {
      const fetchVisaData = async () => {
        try {
          const res = await getVisaById(id);
          if (res.success) {
            // ফর্ম ডাটা সেট করা
            const { images, requirements, description, ...rest } = res.data;
            setFormData(rest);
            setDescription(description || "");
            setRequirementsList(requirements || []);

            // ইমেজ প্রিভিউ সেট করা (path সহ)
            if (images && images.length > 0) {
              const existingImages = images.map((imgUrl) => ({
                preview: imgUrl, // এটি ব্যাকএন্ড থেকে আসা ফুল URL
                path: imgUrl,    // এটিই ব্যাকএন্ডে filters হিসেবে যাবে
                isExisting: true,
              }));
              setSelectedImages(existingImages);
            }
          }
        } catch (error) {
          toast.error("Failed to fetch visa data");
        }
      };
      fetchVisaData();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addRequirement = () => {
    if (requirementInput.trim()) {
      setRequirementsList([...requirementsList, requirementInput.trim()]);
      setRequirementInput("");
    }
  };

  const removeRequirement = (index) => {
    setRequirementsList(requirementsList.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        isExisting: false,
      })
    );
    setSelectedImages([...selectedImages, ...newFiles]);
  };

  const removeImage = (index) => {
    const imageToRemove = selectedImages[index];
    if (!imageToRemove.isExisting && imageToRemove.preview.startsWith("blob:")) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    
    // সাধারণ ডাটা অ্যাপেন্ড করা
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    
    data.append("description", description);
    data.append("requirements", JSON.stringify(requirementsList));

    // ২. নতুন ফাইল অ্যাপেন্ড করা
    selectedImages.forEach((img) => {
      if (!img.isExisting) {
        data.append("images", img);
      }
    });

    // ৩. বর্তমানে থাকা পুরনো ইমেজগুলোর লিস্ট পাঠানো (যাতে ব্যাকএন্ড বাকিগুলো ডিলিট করতে পারে)
    const remainingExistingImages = selectedImages
      .filter((img) => img.isExisting)
      .map((img) => img.path);
      
    data.append("existingImages", JSON.stringify(remainingExistingImages));

    try {
      if (isEditMode) {
        await updateVisa(id, data);
        toast.success("Visa Updated Successfully!");
      } else {
        await createVisa(data);
        toast.success("New Visa Created Successfully!");
      }
      
      refreshVisas(); 
      navigate("/admin/visas");
    } catch (error) {
      toast.error(error.response?.data?.error || "Operation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate__animated animate__fadeIn pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-0" style={{ color: "var(--primary-teal)" }}>
            {isEditMode ? "Edit Visa" : "Add New Visa"}
          </h3>
          <small className="text-muted">{formData.country || "Visa Service"}</small>
        </div>
        <Link to="/admin/visas" className="btn btn-outline-secondary rounded-pill px-4">
          <FaArrowLeft className="me-2" /> Back
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-4 border-bottom pb-2">Visa Information</h5>
              <div className="row g-3">
                <div className="col-12">
                  <label className="small fw-bold mb-1">Page Title (SEO)</label>
                  <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Country</label>
                  <input type="text" name="country" className="form-control" value={formData.country} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Continent</label>
                  <select name="continent" className="form-select" value={formData.continent} onChange={handleChange} required>
                    <option value="">Select Continent</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Africa">Africa</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Australia">Australia (Oceania)</option>
                  </select>
                </div>

                <div className="col-12 mt-4">
                  <label className="small fw-bold mb-2">Specific Requirements</label>
                  <div className="input-group mb-3 shadow-sm rounded-3 overflow-hidden">
                    <input
                      type="text"
                      className="form-control border-0 p-2"
                      placeholder="Add a requirement point..."
                      value={requirementInput}
                      onChange={(e) => setRequirementInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                    />
                    <button className="btn btn-teal text-white" type="button" style={{ backgroundColor: "var(--primary-teal)" }} onClick={addRequirement}>
                      <FaPlus />
                    </button>
                  </div>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {requirementsList.map((req, index) => (
                      <span key={index} className="badge bg-light text-dark border d-flex align-items-center p-2 rounded-pill shadow-sm">
                        <FaPassport className="me-2 text-teal" style={{ color: "var(--primary-teal)" }} />
                        {req}
                        <FaTimes className="ms-2 cursor-pointer text-danger" onClick={() => removeRequirement(index)} style={{ cursor: "pointer" }} />
                      </span>
                    ))}
                  </div>
                </div>

                <div className="col-12">
                  <label className="small fw-bold mb-2 text-secondary">Detailed Description</label>
                  <TextEditor value={description} onChange={setDescription} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Specifications</h5>
              {[
                { label: "Visa Type", name: "type", placeholder: "e.g. Tourist Sticker" },
                { label: "Visa Fee", name: "fee", placeholder: "e.g. 5,500 BDT" },
                { label: "Validity", name: "validity", placeholder: "e.g. 90 Days" },
                { label: "Entry Type", name: "entry", placeholder: "e.g. Single Entry" },
                { label: "Processing Time", name: "duration", placeholder: "e.g. 5-7 Days" },
              ].map((field) => (
                <div className="mb-3" key={field.name}>
                  <label className="small fw-bold mb-1">{field.label}</label>
                  <input type="text" name={field.name} className="form-control" placeholder={field.placeholder} value={formData[field.name] || ""} onChange={handleChange} />
                </div>
              ))}
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Gallery</h5>
              <div className="upload-zone text-center p-3 border border-dashed rounded-4 mb-3" style={{ cursor: "pointer", backgroundColor: "#f8f9fa" }}>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} id="visaFile" hidden />
                <label htmlFor="visaFile" className="cursor-pointer w-100 mb-0">
                  <FaCloudUploadAlt size={30} className="mb-2" style={{ color: "var(--primary-teal)" }} />
                  <p className="small mb-0">Upload Images</p>
                </label>
              </div>
              <div className="row g-2">
                {selectedImages.map((file, i) => (
                  <div key={i} className="col-4 position-relative">
                    <img src={file.preview} className="img-fluid rounded-3 border shadow-sm" alt="preview" style={{ height: "60px", width: "100%", objectFit: "cover" }} />
                    <button type="button" onClick={() => removeImage(i)} className="btn btn-danger btn-sm position-absolute top-0 end-0 p-0 shadow-sm" style={{ width: "20px", height: "20px", fontSize: "12px", marginTop: "-5px", marginRight: "-5px" }}>×</button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-100 mt-4 py-3 rounded-4 shadow fw-bold text-white"
              style={{ backgroundColor: "var(--secondary-coral)" }}
            >
              {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <FaSave className="me-2" />}
              {isEditMode ? "Update Service" : "Publish Service"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddVisa;