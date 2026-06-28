/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaClock,
  FaMoneyBillWave,
  FaArrowLeft,
  FaCheckCircle,
  FaGlobe,
  FaFileAlt,
} from "react-icons/fa";
import "../../assets/style/details.css";
import Gallery from "../../components/shared/Gallery";
import EnquiryForm from "../../components/shared/EnquiryForm";
import ShareLink from "../../components/shared/ShareLink";
import { getVisaById } from "../../api/visaService";
import ErrorPage from "../error/ErrorPage";

const VisaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visa, setVisa] = useState(null);
  const [loading, setLoading] = useState(true);

  // ১. ডাটা ফেচ করা
  useEffect(() => {
    const fetchVisa = async () => {
      setLoading(true);
      try {
        const response = await getVisaById(id);
        // API response structure অনুযায়ী ডাটা সেট করুন
        if (response?.success) {
          setVisa(response.data);
        } else {
          setVisa(response); 
        }
      } catch (error) {
        console.error("Error fetching visa:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVisa();
    window.scrollTo(0, 0);
  }, [id]);

  // ২. ইমেজ স্লাইডার টাইমার
  useEffect(() => {
    if (visa?.images?.length > 1) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === visa.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [visa?.images]);

  // ৩. প্রথমে লোডিং স্টেট চেক করুন
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-teal" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // ৪. লোডিং শেষ হওয়ার পর যদি ডাটা না থাকে তবে এরর পেজ
  if (!visa || !visa.images) {
    return <ErrorPage />;
  }

  return (
    <div className="visa-details-page pb-5 overflow-hidden">
      {/* Banner Section */}
      <div
        className="visa-detail-header text-white d-flex align-items-center position-relative overflow-hidden"
        style={{
          height: "450px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1.2s ease-in-out",
          // সেফটি চেক: images[index] সরাসরি কল না করে কন্ডিশনাললি করুন
          backgroundImage: visa?.images?.length > 0 
            ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${visa.images[currentImageIndex]})`
            : "none",
        }}
      >
        <div className="container position-relative z-index-2">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-light rounded-pill mb-4 px-4 shadow-sm glass-effect border-0"
          >
            <FaArrowLeft className="me-2" /> Back
          </button>
          <h1 className="display-4 fw-bold mb-2 animate__animated animate__fadeInDown">
            {visa.country} Visa Assistance
          </h1>
          <p className="lead fw-medium opacity-90">
            <FaGlobe className="text-coral me-2" /> {visa.type || ""} | {visa.continent || ""}
          </p>
        </div>

        {visa.images?.length > 1 && (
          <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2 z-index-2">
            {visa.images.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`cursor-pointer rounded-circle ${
                  currentImageIndex === idx ? "bg-coral shadow scale-125" : "bg-white opacity-50"
                }`}
                style={{ width: "12px", height: "12px", transition: "0.3s" }}
              ></div>
            ))}
          </div>
        )}
      </div>

      <div className="container mt-n5 position-relative z-index-10">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
              <h3 className="fw-bold text-teal mb-4 d-flex align-items-center gap-2">
                Visa Overview
              </h3>
              
              {visa.description && (
                <div 
                  className="text-secondary fs-5 mb-5 additional-details details-content"
                  dangerouslySetInnerHTML={{ __html: visa.description }}
                />
              )}

              <div className="row g-4 mb-5">
                <div className="col-md-6">
                  <div className="p-3 rounded-4 d-flex align-items-center gap-3 bg-alice-blue border border-light">
                    <div className="icon-box bg-white p-3 rounded-circle shadow-sm text-coral">
                      <FaMoneyBillWave size={24} />
                    </div>
                    <div>
                      <small className="text-muted d-block text-uppercase fw-bold small">Visa Fee</small>
                      <strong className="fs-5 text-teal">{visa.fee}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 rounded-4 d-flex align-items-center gap-3 bg-alice-blue border border-light">
                    <div className="icon-box bg-white p-3 rounded-circle shadow-sm text-coral">
                      <FaClock size={24} />
                    </div>
                    <div>
                      <small className="text-muted d-block text-uppercase fw-bold small">Processing Time</small>
                      <strong className="fs-5 text-teal">{visa.duration}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {visa.requirements?.length > 0 && (
                <div className="requirements-box p-4 rounded-4 bg-light border mb-5">
                  <h4 className="fw-bold mb-4 text-teal d-flex align-items-center gap-2">
                    <FaFileAlt className="text-coral" /> Required Documents
                  </h4>
                  <ul className="list-unstyled mb-0">
                    {visa.requirements.map((req, index) => (
                      <li key={index} className="mb-3 d-flex align-items-start gap-3">
                        <FaCheckCircle className="mt-1 flex-shrink-0 text-teal" />
                        <span className="text-dark fw-medium">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-5">
                <h3 className="fw-bold text-teal mb-4">Gallery Photos</h3>
                <Gallery images={visa.images} />
              </div>

              <div className="mt-4">
                <ShareLink post={visa} />
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="position-sticky" style={{ top: "100px" }}>
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-4">
                <div className="bg-coral text-white p-4 text-center">
                  <small className="d-block opacity-75 text-uppercase fw-bold mb-1">Total Package Cost</small>
                  <h2 className="fw-bold mb-0 text-white fs-3">{visa.fee} <span className="fs-6 fw-normal">/ person</span></h2>
                </div>
                <div className="pt-4 bg-white">
                  <EnquiryForm 
                    title={`${visa.country} Visa Inquiry`}
                    subtitle={`Get expert help for your ${visa.country} visa application.`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaDetails;