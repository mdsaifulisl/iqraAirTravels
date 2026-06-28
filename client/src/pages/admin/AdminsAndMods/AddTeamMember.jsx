/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { FaSave, FaArrowLeft, FaCloudUploadAlt, FaUserTie, FaEnvelope, FaShieldAlt, FaPhoneAlt, FaLock } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../../../hooks/useUsers"; 

const AddTeamMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const { handleAddUser, handleUpdateUser, fetchUserById, loading, message, fetchUsers } = useUsers();

  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Moderator",
    status: "Active",
    bio: "",
    password: "", 
  });

  // এডিট মোডে ডাটা লোড করা
  useEffect(() => {
    if (isEditMode) {
      const loadUser = async () => {
        const userData = await fetchUserById(id);
        if (userData) {
          setFormData({
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            role: userData.role || "Moderator",
            status: userData.status || "Active",
            bio: userData.bio || "",
            password: "", 
          });
          if (userData.image) {
            setSelectedImage({ preview: userData.image, isExisting: true });
          }
        }
      };
      loadUser();
    }
  }, [id, isEditMode]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage({
        preview: URL.createObjectURL(file),
        file: file,
        isExisting: false
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ফাইল পাঠানোর জন্য FormData অবজেক্ট তৈরি
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("role", formData.role);
    data.append("status", formData.status);
    data.append("bio", formData.bio);
    
    // যদি পাসওয়ার্ড দেওয়া হয় (ক্রিয়েট মোডে রিকোয়্যার্ড, এডিটে অপশনাল)
    if (formData.password) {
      data.append("password", formData.password);
    }

    // যদি নতুন ইমেজ সিলেক্ট করা হয়
    if (selectedImage?.file) {
      data.append("image", selectedImage.file);
    }

    let result;
    if (isEditMode) {
      result = await handleUpdateUser(id, data);
    } else {
      result = await handleAddUser(data);
    }

    if (result.success) {
      navigate("/admin/users");
      await fetchUsers();
    } else {
      alert(result.message || "Error saving data");
    }
  };

  if (loading && isEditMode) {
    return <div className="text-center mt-5">Loading User Data...</div>;
  }

  return (
    <div className="animate__animated animate__fadeIn pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0" style={{ color: "var(--primary-teal)" }}>
          {isEditMode ? "Edit Team Member" : "Add New Member"}
        </h3>
        <Link to="/admin/users" className="btn btn-outline-secondary rounded-pill px-4 shadow-sm">
          <FaArrowLeft className="me-2" /> Back
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        { message && <div className="alert alert-success">{message}</div> }
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-4 border-bottom pb-2">Personal Details</h5>
              
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0"><FaUserTie size={14} /></span>
                    <input name="name" type="text" className="form-control border-0 bg-light py-3" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0"><FaEnvelope size={14} /></span>
                    <input name="email" type="email" className="form-control border-0 bg-light py-3" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Phone Number</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0"><FaPhoneAlt size={14} /></span>
                    <input name="phone" type="text" className="form-control border-0 bg-light py-3" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Access Level</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0"><FaShieldAlt size={14} /></span>
                    <select name="role" className="form-select border-0 bg-light py-3" value={formData.role} onChange={handleChange} required>
                      <option value="Super Admin">Super Admin</option>
                      <option value="Moderator">Moderator</option>
                      <option value="Editor">Editor</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="small fw-bold mb-1">{isEditMode ? "Change Password (Optional)" : "Password"}</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0"><FaLock size={14} /></span>
                    <input 
                      name="password" 
                      type="password" 
                      className="form-control border-0 bg-light py-3" 
                      placeholder={isEditMode ? "••••••••" : "Enter a secure password"}
                      value={formData.password}
                      onChange={handleChange}
                      required={!isEditMode} 
                    />
                  </div>
                </div>

                <div className="col-12 mt-3">
                  <label className="small fw-bold mb-1">Short Biography</label>
                  <textarea name="bio" className="form-control border-0 bg-light p-3" rows="4" value={formData.bio} onChange={handleChange}></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Status</h5>
              <select 
                name="status"
                className={`form-select border-0 fw-bold bg-light ${formData.status === 'Active' ? 'text-success' : 'text-danger'}`}
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">● Active</option>
                <option value="Inactive">● Inactive</option>
              </select>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
              <h5 className="fw-bold mb-3 border-bottom pb-2 text-start">Profile Picture</h5>
              <div className="mb-3">
                <div className="mx-auto mb-3 position-relative" style={{ width: "120px", height: "120px" }}>
                  <img 
                    src={selectedImage?.preview || "https://via.placeholder.com/150"} 
                    className="rounded-circle border border-3 border-light shadow-sm"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    alt="Profile"
                  />
                </div>
                <label className="upload-zone border border-dashed rounded-4 p-3 d-block" style={{backgroundColor: 'var(--accent-alice-blue)', cursor: 'pointer'}}>
                  <FaCloudUploadAlt size={24} className="mb-2" style={{color: 'var(--primary-teal)'}} />
                  <p className="small mb-0 fw-bold text-muted">Click to Upload</p>
                  <input type="file" hidden onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn w-100 mt-4 py-3 rounded-4 shadow fw-bold text-white" style={{backgroundColor: 'var(--secondary-coral)'}}>
              <FaSave className="me-2" /> {loading ? "Saving..." : (isEditMode ? "Update Member" : "Create Member")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTeamMember;