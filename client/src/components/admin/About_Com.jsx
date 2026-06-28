/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaHeading, FaSave } from "react-icons/fa";
import useAbout from "../../hooks/useAbout"; // আপনার কাস্টম হুক

const About_Com = () => {
  // 
  const { aboutContent, setAboutContent, loading, saveAbout, massage, setMassage } = useAbout();

  // 
  const [selectedFile, setSelectedFile] = useState(null);
  const [aboutImagePreview, setAboutImagePreview] = useState("");
  

  //
  useEffect(() => {
    // 
    if (aboutContent?.image) {
      setAboutImagePreview(aboutContent.image);
    }
  }, [aboutContent?.image]);

  const handleAboutImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); 
      setAboutImagePreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ৪. FormData তৈরি করুন
    const formData = new FormData();
    formData.append("title", aboutContent.title || "");
    formData.append("description", aboutContent.description || "");
    formData.append("experience", aboutContent.experience || "");

    // নতুন ইমেজ সিলেক্ট করা হলেই কেবল সেটা পাঠাবেন
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      await saveAbout(formData);
      setSelectedFile(null);
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  if (loading)
    return <div className="text-center py-5">Loading About Data...</div>;

  return (
    <>
      {massage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {massage}
          <button 
            onClick={() => setMassage("")}
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <div className="card border-0 shadow-sm rounded-4 p-4">
        <h5 className="fw-bold mb-4">Edit About Section</h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="row g-3">
                <div className="col-12">
                  <label className="small fw-bold mb-1">Headline</label>
                  <div className="input-group shadow-sm rounded-3 overflow-hidden">
                    <span className="input-group-text bg-white border-0">
                      <FaHeading className="text-muted" />
                    </span>
                    <input
                      type="text"
                      className="form-control border-0 py-2 bg-white"
                      value={aboutContent.title || ""}
                      onChange={(e) =>
                        setAboutContent({
                          ...aboutContent,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label className="small fw-bold mb-1">Description</label>
                  <textarea
                    className="form-control border-0 shadow-sm rounded-3 p-3 bg-white"
                    rows="5"
                    value={aboutContent.description || ""}
                    onChange={(e) =>
                      setAboutContent({
                        ...aboutContent,
                        description: e.target.value,
                      })
                    }
                    required
                  ></textarea>
                </div>
                <div className="col-12">
                  <label className="small fw-bold mb-1">
                    Experience Info (e.g. 10+ Years)
                  </label>
                  <input
                    type="text"
                    className="form-control border-0 shadow-sm rounded-3 py-2 bg-white"
                    value={aboutContent.experience || ""}
                    onChange={(e) =>
                      setAboutContent({
                        ...aboutContent,
                        experience: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <label className="small fw-bold mb-2 d-block">
                About Section Image
              </label>
              <div
                className="card border-2 border-dashed rounded-4 p-2 text-center bg-light"
                style={{
                  cursor: "pointer",
                  position: "relative",
                  minHeight: "240px",
                }}
              >
                {aboutImagePreview ? (
                  <img
                    src={aboutImagePreview}
                    className="rounded-3 mb-2 w-100"
                    alt="About Preview"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                ) : (
                  <div className="py-5 text-muted">No Image Selected</div>
                )}

                <label
                  htmlFor="about-image-upload"
                  className="btn btn-sm btn-dark position-absolute top-50 start-50 translate-middle shadow-lg px-3"
                >
                  <FaCloudUploadAlt className="me-2" /> Change Image
                </label>
                <input
                  id="about-image-upload"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleAboutImageChange}
                />
                <p className="small text-muted mt-2 mb-0">
                  Accepted: JPG, PNG, WEBP
                </p>
              </div>
            </div>

            <div className="col-12 text-end mt-4">
              <button
                type="submit"
                className="btn text-white px-5 py-2 rounded-pill shadow-sm fw-bold"
                style={{ backgroundColor: "var(--secondary-coral)" }}
              >
                <FaSave className="me-2" /> Save All Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About_Com;
