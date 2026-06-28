/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { FaSave, FaArrowLeft, FaCloudUploadAlt, FaTrash, FaUserEdit } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import TextEditor from "../../../components/shared/TextEditor";
import { createBlog, updateBlog, getBlogById } from "../../../api/blogService";
import useBlogs from "../../../hooks/useBlogs";
import { toast } from "react-hot-toast";

const AddBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const { setBlogs } = useBlogs(); 

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]); // নতুন ফাইল অবজেক্ট রাখবে
  const [existingImages, setExistingImages] = useState([]); // পুরনো URL গুলো রাখবে

  const [formData, setFormData] = useState({
    title: "",
    author: "Md. Saiful Islam",
    category: "",
  });

  // ১. ডাটা লোড করা (Edit Mode)
  useEffect(() => {
    if (isEditMode) {
      const fetchBlog = async () => {
        try {
          const res = await getBlogById(id);
          if (res.success) {
            const data = res.data;
            setFormData({
              title: data.title,
              author: data.author,
              category: data.category,
            });
            setContent(data.content);
            setExistingImages(data.images || []);
          }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
          toast.error("Failed to load blog data");
        }
      };
      fetchBlog();
    }
  }, [id, isEditMode]);

  // ২. ইমেজ হ্যান্ডলার (Multiple Images)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.size <= 2 * 1024 * 1024);
    
    if (validFiles.length < files.length) {
      toast.error("Some files are too large (Max 2MB)");
    }

    setSelectedImages([...selectedImages, ...validFiles]);
  };

  // ৩. ইমেজ রিমুভ লজিক
  const removeNewImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const removeExistingImage = (url) => {
    setExistingImages(existingImages.filter(img => img !== url));
  };

  // ৪. সাবমিট হ্যান্ডলার (FormData সহ)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("author", formData.author);
    submitData.append("category", formData.category);
    submitData.append("content", content); // TextEditor থেকে আসা কন্টেন্ট

    // নতুন ইমেজগুলো অ্যাপেন্ড করা
    selectedImages.forEach((file) => {
      submitData.append("images", file);
    });

    // পুরনো যেগুলো ইউজার ডিলিট করেনি, সেগুলো পাঠানো
    if (isEditMode) {
      submitData.append("existingImages", JSON.stringify(existingImages));
    }

    try {
      let res;
      if (isEditMode) {
        res = await updateBlog(id, submitData);
        if (res.success) {
          setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
              blog.id === id ? { ...blog, ...res.data } : blog
            )
          );
        }
      } else {
        res = await createBlog(submitData);
        if (res.success) {
          setBlogs((prevBlogs) => [res.data, ...prevBlogs]);
        }
      }

      if (res.success) {
        toast.success(isEditMode ? "Updated!" : "Published!");
        navigate("/admin/blog");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate__animated animate__fadeIn pb-5">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0" style={{ color: "var(--primary-teal)" }}>
          {isEditMode ? "Edit Article" : "Write New Article"}
        </h3>
        <Link to="/admin/blog" className="btn btn-outline-secondary rounded-pill px-4 shadow-sm">
          <FaArrowLeft className="me-2" /> Back
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <div className="mb-4">
                <label className="small fw-bold mb-1">Blog Title</label>
                <input 
                  type="text" 
                  className="form-control form-control-lg fs-6 border-0 bg-light py-3" 
                  placeholder="e.g. How to get a Visa easily..."
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="small fw-bold mb-2 text-secondary">Main Content</label>
                <TextEditor value={content} onChange={setContent} />
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            {/* Meta Info */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Post Details</h5>
              <div className="mb-3">
                <label className="small fw-bold mb-1">Author Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0"><FaUserEdit size={14} /></span>
                  <input type="text" className="form-control border-0 bg-light" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} />
                </div>
              </div>
              <div className="mb-3">
                <label className="small fw-bold mb-1">Category</label>
                <select className="form-select border-0 bg-light" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required>
                  <option value="">Select Category</option>
                  <option value="Visa Guide">Visa Guide</option>
                  <option value="Travel Tips">Travel Tips</option>
                  <option value="News">News</option>
                </select>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Images Gallery</h5>
              <label htmlFor="blog-images" className="upload-zone text-center p-3 border border-dashed rounded-4 mb-3" style={{backgroundColor: 'var(--accent-alice-blue)', cursor: 'pointer', display:'block'}}>
                <FaCloudUploadAlt size={30} className="text-teal mb-2" style={{color: 'var(--primary-teal)'}} />
                <p className="small mb-0 fw-bold">Upload Images</p>
                <input type="file" id="blog-images" multiple hidden onChange={handleImageChange} accept="image/*" />
              </label>

              <div className="row g-2">
                {/* পুরনো ইমেজ প্রিভিউ */}
                {existingImages.map((img, i) => (
                  <div key={`old-${i}`} className="col-4 position-relative">
                    <img src={img} className="img-fluid rounded-3 border" style={{ height: "60px", width: "100%", objectFit: "cover" }} alt="" />
                    <button type="button" onClick={() => removeExistingImage(img)} className="btn btn-danger btn-sm position-absolute top-0 end-0 p-0 rounded-circle" style={{width:'18px', height:'18px', fontSize:'10px'}}>×</button>
                  </div>
                ))}
                
                {/* নতুন সিলেক্ট করা ইমেজ প্রিভিউ */}
                {selectedImages.map((file, i) => (
                  <div key={`new-${i}`} className="col-4 position-relative">
                    <img src={URL.createObjectURL(file)} className="img-fluid rounded-3 border" style={{ height: "60px", width: "100%", objectFit: "cover", opacity: '0.7' }} alt="" />
                    <button type="button" onClick={() => removeNewImage(i)} className="btn btn-warning btn-sm position-absolute top-0 end-0 p-0 rounded-circle" style={{width:'18px', height:'18px', fontSize:'10px'}}>×</button>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn w-100 mt-4 py-3 rounded-4 shadow fw-bold text-white border-0" style={{backgroundColor: 'var(--secondary-coral)'}}>
              {loading ? "Processing..." : <><FaSave className="me-2" /> {isEditMode ? "Update Article" : "Publish Article"}</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;