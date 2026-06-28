import React, { useState, useEffect } from "react";
import { FaSave, FaArrowLeft, FaCamera } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { useUsers } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-hot-toast"; // টোস্ট ব্যবহার করলে ভালো হয়

const AdminProfile = () => {
  const { id } = useParams();
  const { users, handleUpdateUser,  fetchUsers, message } = useUsers();
  const { user: loggedInUser } = useAuth();

  // ID হ্যান্ডলিং (নিশ্চিত করা যে এটি সংখ্যা বা সঠিক ফরম্যাটে আছে)
  const targetUserId = id ? id : loggedInUser?.id;
  const isOwnProfile = !id || id.toString() === loggedInUser?.id?.toString();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    role: ""
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  // ডাটা লোড করার ইফেক্ট
  useEffect(() => {
    if (users && targetUserId) {
      const targetUser = users.find((u) => u.id.toString() === targetUserId.toString());
      
      if (targetUser) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData({
          name: targetUser.name || "",
          email: targetUser.email || "",
          phone: targetUser.phone || "",
          bio: targetUser.bio || "No bio available.",
          role: targetUser.role || "User"
        });

        // ইমেজ প্রিভিউ সেট করা
        const initialImage = targetUser.image 
          ? (targetUser.image.startsWith('http') ? targetUser.image : `http://localhost:5000/${targetUser.image}`)
          : `https://ui-avatars.com/api/?name=${targetUser.name}&background=0D9488&color=fff`;
        setPreview(initialImage);
      }
    }
  }, [targetUserId, users]);

  // ফাইল সিলেক্ট হ্যান্ডলার
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // মেমোরি লিক রোধ করতে আগের URL রিলিজ করা ভালো, তবে সিম্পল রাখার জন্য:
      setPreview(URL.createObjectURL(file)); 
    }
  };

  // সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("bio", formData.bio);
    
    if (selectedFile) {
      data.append("image", selectedFile);
    }

    try {
      const result = await handleUpdateUser(targetUserId, data); 
      if (result && result.success) {
        toast.success("Profile updated successfully!");
        setSelectedFile(null); 
        await fetchUsers();
      } else {
        toast.error(result?.message || "Update failed!");
      }
    } catch (error) {
      console.error("Profile Update Error:", error);
      toast.error("An unexpected error occurred!");
    }
  };

  return (
    <div className="animate__animated animate__fadeIn pb-5">
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/admin/users" className="btn btn-light rounded-circle shadow-sm">
          <FaArrowLeft />
        </Link>
        <h3 className="fw-bold mb-0" style={{ color: "var(--primary-teal)" }}>
          {isOwnProfile ? "My Profile" : `${formData.name}'s Profile`}
        </h3>
      </div>

      <div className="row g-4">
        {/* Left Side: Avatar Card */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
            <div className="position-relative d-inline-block mx-auto mb-3">
              <img 
                src={preview} 
                className="rounded-circle border border-4 border-light shadow" 
                width="150" 
                height="150" 
                alt="Profile" 
                style={{ objectFit: 'cover' }}
              />
              {isOwnProfile && (
                <label 
                  className="position-absolute bottom-0 end-0 text-white p-2 rounded-circle shadow" 
                  style={{ backgroundColor: 'var(--primary-teal)', cursor: 'pointer', transition: '0.3s' }}
                >
                  <FaCamera size={14} />
                  <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                </label>
              )}
            </div>
            <h5 className="fw-bold mb-1">{formData.name}</h5>
            <span className="badge bg-light border rounded-pill px-3 py-2 text-capitalize" style={{ color: 'var(--primary-teal)' }}>
              {formData.role}
            </span>
            <p className="text-muted small mt-3">{formData.bio || "No bio added yet."}</p>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <form onSubmit={handleSubmit}>
              { message && <div className="alert alert-success">{message}</div> }
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control bg-light border-0 py-2" 
                    value={formData.name} 
                    disabled={!isOwnProfile}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control bg-light border-0 py-2" 
                    value={formData.email} 
                    disabled={!isOwnProfile}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    className="form-control bg-light border-0 py-2" 
                    value={formData.phone} 
                    disabled={!isOwnProfile}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold mb-1">Role</label>
                  <input 
                    type="text" 
                    className="form-control bg-light border-0 py-2 text-capitalize" 
                    value={formData.role} 
                    disabled 
                  />
                </div>
               
                <div className="col-12">
                  <label className="small fw-bold mb-1">Short Biography</label>
                  <textarea 
                    className="form-control bg-light border-0" 
                    rows="4" 
                    value={formData.bio} 
                    disabled={!isOwnProfile}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  ></textarea>
                </div>
                
                {isOwnProfile && (
                  <div className="col-12 mt-4 text-end">
                    <button 
                      type="submit" 
                      className="btn text-white px-5 py-2 rounded-pill shadow-sm" 
                      style={{ backgroundColor: 'var(--secondary-coral)' }}
                    >
                      <FaSave className="me-2" /> Save Changes
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;