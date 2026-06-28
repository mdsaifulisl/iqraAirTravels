import React, { useState, useEffect } from "react";
import {
  FaGlobe,
  FaSearch,
  FaLock,
  FaSave,
  FaCloudUploadAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import useSetting from "../../../hooks/useSetting";
import { useAuth } from "../../../hooks/useAuth";

const Settings = () => {
  // const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");
  const { settings, saveSettings, isUpdating } = useSetting();

  const [formData, setFormData] = useState({});
  const [logoFile, setLogoFile] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const { updatePassword, psmessage, setPmessage, logout } = useAuth();
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

 const [faviconFile, setFaviconFile] = useState(null); 
 const [previewFavicon, setPreviewFavicon] = useState(null);


useEffect(() => {
  if (settings) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData(settings);
    setPreviewLogo(settings.siteLogo);
    setPreviewFavicon(settings.siteFavicon); 
  }
}, [settings]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

const handleFaviconChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFaviconFile(file); 
    setPreviewFavicon(URL.createObjectURL(file)); 
  }
};

// ৩. সেটিংস সেভ করার সময় (খুবই গুরুত্বপূর্ণ)
const handleSave = async () => {
  const data = new FormData();
  
 
  Object.keys(formData).forEach((key) => {
   
    if (key !== "siteLogo" && key !== "siteFavicon") {
      data.append(key, formData[key]);
    }
  });

  
  if (logoFile) {
    data.append("siteLogo", logoFile);
  }

  
  if (faviconFile) {
    data.append("siteFavicon", faviconFile); 
  }

  await saveSettings(data);
};

  const handleChangePassword = async (e) => {
    if (e) e.preventDefault();
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      setPmessage("New Password and Confirm Password do not match");
      return;
    }
    const result = await updatePassword(
      changePassword.oldPassword,
      changePassword.newPassword,
    );

    if (result.success) {
      setChangePassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      await logout();
    }
  };

  const hendleChangePasswordinput = (e) => {
    setChangePassword({
      ...changePassword,
      [e.target.name]: e.target.value,
    });
  };

  if (!settings)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "300px" }}
      >
        <div className="spinner-border text-teal" role="status"></div>
      </div>
    );

  return (
    <div className="animate__animated animate__fadeIn pb-5">
      <div className="mb-4">
        <h3 className="fw-bold" style={{ color: "var(--primary-teal)" }}>
          Global Settings
        </h3>
        <p className="text-muted small">
          Configure your website's core information and social links
        </p>
      </div>

      <div className="row g-4">
        {/* Sidebar Tabs */}
        <div className="col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-2">
            <div className="nav flex-column nav-pills gap-2">
              {[
                { id: "general", icon: <FaGlobe />, label: "General" },
                {
                  id: "contact",
                  icon: <FaPhoneAlt />,
                  label: "Contact & Social",
                },
                { id: "seo", icon: <FaSearch />, label: "SEO & Analytics" },
                { id: "security", icon: <FaLock />, label: "Security" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`nav-link rounded-3 py-3 d-flex align-items-center gap-3 border-0 transition-all ${activeTab === tab.id ? "text-white shadow" : "text-dark hover-bg-light"}`}
                  style={{
                    backgroundColor:
                      activeTab === tab.id
                        ? "var(--primary-teal)"
                        : "transparent",
                  }}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="col-lg-9">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            {/* 1. GENERAL SETTINGS */}
            {activeTab === "general" && (
              <div className="animate__animated animate__fadeIn">
                <h5 className="fw-bold mb-4 border-bottom pb-2">
                  Basic Information
                </h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="small fw-bold mb-1">Site Name</label>
                    <input
                      type="text"
                      className="form-control bg-light border-0 py-2"
                      name="siteName"
                      value={formData.siteName || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold mb-1">
                      Footer Copyright Text
                    </label>
                    <input
                      type="text"
                      className="form-control bg-light border-0 py-2"
                      name="footerText"
                      value={formData.footerText || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <label className="small fw-bold mb-2">
                      Upload Site Logo
                    </label>
                    <div className="border border-dashed rounded-3 p-4 text-center bg-light">
                      {previewLogo ? (
                        <img
                          src={previewLogo}
                          alt="Logo Preview"
                          className="mb-2 rounded"
                          style={{ maxHeight: "60px", objectFit: "contain" }}
                        />
                      ) : (
                        <FaCloudUploadAlt
                          size={30}
                          className="text-muted mb-2"
                        />
                      )}
                      <p className="small text-muted mb-0">
                        Recommended size: 200x50px
                      </p>
                      <input
                        type="file"
                        hidden
                        id="logoUpload"
                        onChange={handleLogoChange}
                        accept="image/*"
                      />
                      <label
                        htmlFor="logoUpload"
                        className="btn btn-sm btn-outline-dark mt-2 px-4 rounded-pill"
                      >
                        Change Logo
                      </label>
                    </div>
                  </div>

                  {/* Upload Favicon (Logo Upload এর ঠিক নিচে এটি বসাতে পারেন) */}
                  <div className="col-12 mt-3">
                    <label className="small fw-bold mb-2">
                      Upload Site Favicon (Icon)
                    </label>
                    <div className="border border-dashed rounded-3 p-4 text-center bg-light">
                      {previewFavicon ? (
                        <img
                          src={previewFavicon}
                          alt="Favicon Preview"
                          className="mb-2 rounded"
                          style={{
                            maxHeight: "32px",
                            width: "32px",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <div className="text-muted mb-2">
                          {/* favicon এর জন্য একটি ছোট আইকন বা টেক্সট */}
                          <small>No Icon Selected</small>
                        </div>
                      )}
                      <p className="small text-muted mb-0">
                        Recommended size: 32x32px (.ico or .png)
                      </p>
                      <input
                        type="file"
                        hidden
                        id="faviconUpload"
                        onChange={handleFaviconChange} // এই ফাংশনটি হ্যান্ডলার হিসেবে লিখবেন
                        accept="image/x-icon, image/png, image/jpeg"
                      />
                      <label
                        htmlFor="faviconUpload"
                        className="btn btn-sm btn-outline-dark mt-2 px-4 rounded-pill"
                      >
                        Change Favicon
                      </label>
                    </div>
                  </div>

                  <div className="col-12 mt-4">
                    <div className="form-check form-switch p-3 bg-light rounded-3 d-flex justify-content-between align-items-center">
                      <div>
                        <label className="fw-bold mb-0 d-block">
                          Maintenance Mode
                        </label>
                        <small className="text-muted">
                          Temporarily hide the site from visitors
                        </small>
                      </div>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="maintenanceMode"
                        checked={formData.maintenanceMode || false}
                        onChange={handleInputChange}
                        style={{
                          width: "45px",
                          height: "22px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. CONTACT & SOCIAL */}
            {activeTab === "contact" && (
              <div className="animate__animated animate__fadeIn">
                <h5 className="fw-bold mb-4 border-bottom pb-2">
                  Contact & Social Media
                </h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="small fw-bold mb-1">
                      <FaEnvelope className="me-1 text-teal" /> Public Email
                    </label>
                    <input
                      type="email"
                      className="form-control bg-light border-0 py-2"
                      name="siteEmail"
                      value={formData.siteEmail || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold mb-1">
                      <FaPhoneAlt className="me-1 text-teal" /> Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control bg-light border-0 py-2"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="small fw-bold mb-1">
                      <FaMapMarkerAlt className="me-1 text-teal" /> Office
                      Address
                    </label>
                    <textarea
                      className="form-control bg-light border-0 py-2"
                      rows="2"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <hr className="my-4 opacity-10" />
                  <h6 className="fw-bold mb-3 text-teal">
                    Social Media Profiles
                  </h6>

                  <div className="col-md-6">
                    <label className="small fw-bold mb-1">
                      <FaFacebook className="text-primary me-1" /> Facebook URL
                    </label>
                    <input
                      type="text"
                      className="form-control bg-light border-0 py-2"
                      name="facebook"
                      value={formData.facebook || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold mb-1">
                      <FaInstagram className="text-danger me-1" /> Instagram URL
                    </label>
                    <input
                      type="text"
                      className="form-control bg-light border-0 py-2"
                      name="instagram"
                      value={formData.instagram || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold mb-1">
                      <FaLinkedin
                        className="text-primary me-1"
                        style={{ color: "#0077b5" }}
                      />{" "}
                      LinkedIn Profile
                    </label>
                    <input
                      type="text"
                      className="form-control bg-light border-0 py-2"
                      name="linkedin"
                      value={formData.linkedin || ""}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold mb-1">
                      <FaWhatsapp className="text-success me-1" /> WhatsApp
                      Number
                    </label>
                    <input
                      type="text"
                      className="form-control bg-light border-0 py-2"
                      name="whatsapp"
                      value={formData.whatsapp || ""}
                      onChange={handleInputChange}
                      placeholder="+88017XXXXXXXX"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. SEO & ANALYTICS */}
            {activeTab === "seo" && (
              <div className="animate__animated animate__fadeIn">
                <h5 className="fw-bold mb-4 border-bottom pb-2">
                  SEO Optimization
                </h5>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="small fw-bold mb-1">Meta Title</label>
                    <input
                      type="text"
                      className="form-control bg-light border-0 py-2"
                      name="metaTitle"
                      value={formData.metaTitle || ""}
                      onChange={handleInputChange}
                      placeholder="Website title for Google search"
                    />
                  </div>
                  <div className="col-12">
                    <label className="small fw-bold mb-1">
                      Meta Description
                    </label>
                    <textarea
                      className="form-control bg-light border-0 py-2"
                      rows="4"
                      name="metaDescription"
                      value={formData.metaDescription || ""}
                      onChange={handleInputChange}
                      placeholder="Brief description of your site..."
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* 4. SECURITY */}
            {activeTab === "security" && (
              <div className="animate__animated animate__fadeIn">
                <h5 className="fw-bold mb-4 border-bottom pb-2">
                  Admin Security
                </h5>
                <p className="text-muted small mb-4">
                  Update your administrative credentials here.
                </p>
                {psmessage && (
                  <div className="alert alert-danger" role="alert">
                    {psmessage}
                  </div>
                )}
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="small fw-bold mb-1">
                      Current Password
                    </label>
                    <input
                      name="oldPassword"
                      value={setChangePassword.oldPassword}
                      onChange={hendleChangePasswordinput}
                      type="password"
                      placeholder="••••••••"
                      className="form-control bg-light border-0 py-2"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold mb-1">New Password</label>
                    <input
                      name="newPassword"
                      value={setChangePassword.newPassword}
                      onChange={hendleChangePasswordinput}
                      type="password"
                      placeholder="Enter new password"
                      className="form-control bg-light border-0 py-2"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold mb-1">
                      Confirm New Password
                    </label>
                    <input
                      name="confirmPassword"
                      value={setChangePassword.confirmPassword}
                      onChange={hendleChangePasswordinput}
                      type="password"
                      placeholder="Confirm new password"
                      className="form-control bg-light border-0 py-2"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Global Save Button */}
            <div className="mt-5 border-top pt-4 text-end">
              {activeTab === "security" ? (
                <button
                  onClick={handleChangePassword}
                  className="btn text-white px-5 py-2 rounded-pill shadow-sm d-inline-flex align-items-center gap-2"
                  style={{
                    backgroundColor: "var(--secondary-coral)",
                    fontWeight: "bold",
                    opacity: isUpdating ? 0.7 : 1,
                  }}
                >
                  change password
                </button>
              ) : (
                <button
                  className="btn text-white px-5 py-2 rounded-pill shadow-sm d-inline-flex align-items-center gap-2"
                  onClick={handleSave}
                  disabled={isUpdating}
                  style={{
                    backgroundColor: "var(--secondary-coral)",
                    fontWeight: "bold",
                    opacity: isUpdating ? 0.7 : 1,
                  }}
                >
                  {isUpdating ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    <FaSave />
                  )}
                  {isUpdating ? "Saving Changes..." : "Save All Settings"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
