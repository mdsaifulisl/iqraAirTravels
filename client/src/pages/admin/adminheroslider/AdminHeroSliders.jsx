import React, { useState, useEffect } from "react";
import {
  FaImages,
  FaQuestionCircle,
  FaInfoCircle,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSave,
  FaLink,
  FaHeading,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useSlider from "../../../hooks/useSlider";
import useFAQ from "../../../hooks/useFAQ";
import About_Com from "../../../components/admin/About_Com";

const AdminHeroSlider = () => {
  const [activeTab, setActiveTab] = useState("slider");

  // ১. Slider Data
  const { sliders, fetchSliders, removeSlider } = useSlider();
  // ২. FAQ Data
  const { faqs, fetchFAQs, removeFAQ } = useFAQ();

  useEffect(() => {
    fetchSliders();
    fetchFAQs();
  }, [fetchSliders, fetchFAQs]);

  // ৩. About Content Data (Updated with Image instead of Video URL)
  

  return (
    <div className="animate__animated animate__fadeIn pb-5">
      {/* Header */}
      <div className="mb-4">
        <h3 className="fw-bold" style={{ color: "var(--primary-teal)" }}>
          Home Page Management
        </h3>
        <p className="text-muted small">
          Manage Hero Slider, FAQ, and About section content
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-2">
          <ul className="nav nav-pills nav-justified gap-2">
            <li className="nav-item">
              <button
                className={`nav-link rounded-3 py-3 d-flex align-items-center justify-content-center gap-2 ${activeTab === "slider" ? "bg-teal text-white active" : "text-dark hover-bg-light"}`}
                style={
                  activeTab === "slider"
                    ? { backgroundColor: "var(--primary-teal)" }
                    : {}
                }
                onClick={() => setActiveTab("slider")}
              >
                <FaImages /> Slider
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link rounded-3 py-3 d-flex align-items-center justify-content-center gap-2 ${activeTab === "faq" ? "bg-teal text-white active" : "text-dark hover-bg-light"}`}
                style={
                  activeTab === "faq"
                    ? { backgroundColor: "var(--primary-teal)" }
                    : {}
                }
                onClick={() => setActiveTab("faq")}
              >
                <FaQuestionCircle /> Frequently Questions
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link rounded-3 py-3 d-flex align-items-center justify-content-center gap-2 ${activeTab === "about" ? "bg-teal text-white active" : "text-dark hover-bg-light"}`}
                style={
                  activeTab === "about"
                    ? { backgroundColor: "var(--primary-teal)" }
                    : {}
                }
                onClick={() => setActiveTab("about")}
              >
                <FaInfoCircle /> About Content
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* 1. SLIDER MANAGEMENT */}
        {activeTab === "slider" && (
          <div className="row g-4">
            <div className="col-12 text-end">
              <Link
                to="/admin/add-slider"
                className="btn text-white rounded-pill px-4"
                style={{ backgroundColor: "var(--primary-teal)" }}
              >
                <FaPlus className="me-2" /> Add New Slider
              </Link>
            </div>
            {Array.isArray(sliders) &&
              sliders.map((item) => (
                <div className="col-md-6" key={item.id}>
                  <div className="card border-0 shadow-sm rounded-4 overflow-hidden position-relative slider-card">
                    <img
                      src={item.image}
                      className="card-img-top"
                      alt="Slider"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="fw-bold text-truncate">{item.headline}</h5>
                      <p className="text-muted small text-truncate">
                        {item.subtext}
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-3 border-top pt-3">
                        <span
                          className="small fw-bold text-teal"
                          style={{ color: "var(--primary-teal)" }}
                        >
                          <FaLink /> {item.link}
                        </span>
                        <div className="d-flex gap-2">
                          <Link
                            to={`/admin/edit-slider/${item.id}`}
                            className="btn btn-sm btn-light border rounded-circle shadow-sm"
                          >
                            <FaEdit className="text-teal" />
                          </Link>
                          <button
                            onClick={() => removeSlider(item.id)}
                            className="btn btn-sm btn-light border rounded-circle shadow-sm"
                          >
                            <FaTrash className="text-danger" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* 2. FAQ MANAGEMENT */}
        {activeTab === "faq" && (
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <div className="d-flex justify-content-between mb-4">
              <h5 className="fw-bold">Manage FAQ</h5>
              <Link
                to="/admin/add-faq"
                className="btn btn-sm text-white px-3"
                style={{ backgroundColor: "var(--primary-teal)" }}
              >
                <FaPlus /> Add FAQ
              </Link>
            </div>

            {/* FAQ List */}
            {faqs && faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <div
                  key={faq.id || index}
                  className="bg-light p-3 rounded-3 mb-3 border-start border-4"
                  style={{ borderColor: "var(--primary-teal)" }}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-1">
                        {index + 1}. {faq.question}
                      </h6>
                      <p className="small text-muted mb-0 text-break">
                        {faq.answer}
                      </p>
                      <div className="mt-2">
                        <span
                          className={`badge ${faq.status === "Active" ? "bg-success" : "bg-secondary"} small`}
                        >
                          {faq.status}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex gap-2 ms-3">
                      <Link
                        to={`/admin/edit-faq/${faq.id}`}
                        className="btn btn-sm btn-white border-0 shadow-none bg-white"
                      >
                        <FaEdit className="text-teal" />
                      </Link>
                      <button
                        onClick={() => removeFAQ(faq.id)}
                        className="btn btn-sm btn-white border-0 shadow-none bg-white"
                      >
                        <FaTrash className="text-danger" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted py-5">
                <FaQuestionCircle size={50} className="mb-3 opacity-25" />
                <p className="mb-0">No FAQs found. Please add some FAQs.</p>
              </div>
            )}
          </div>
        )}

        {/* 3. ABOUT CONTENT MANAGEMENT (Updated) */}
        {activeTab === "about" && (
          <About_Com />
        )}
      </div>
    </div>
  );
};

export default AdminHeroSlider;
