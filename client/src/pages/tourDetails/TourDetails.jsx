import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaClock,
  FaUserFriends,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaStar,
  FaArrowLeft,
} from "react-icons/fa";

import "react-quill-new/dist/quill.snow.css"; 
import "../../assets/style/details.css";

// components 
import Gallery from "../../components/shared/Gallery";
import EnquiryForm from "../../components/shared/EnquiryForm";
import ShareLink from "../../components/shared/ShareLink";

// err page
import ErrorPage from "../error/ErrorPage";

// API
import { getTourById } from "../../api/tourService";

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  // ১. এপিআই থেকে ডাটা ফেচ করা
  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        const response = await getTourById(id);
        // আপনার এপিআই যদি { success: true, data: ... } ফরম্যাটে পাঠায়
        setTour(response.data || response); 
      } catch (error) {
        console.error("Error fetching tour:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
    window.scrollTo(0, 0);
  }, [id]);

  // ২. অটো স্লাইডার লজিক
  useEffect(() => {
    if (tour?.images?.length > 1) {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev === tour.images.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [tour]);

  // ৩. লোডিং অবস্থা
  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-teal" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading tour details...</p>
      </div>
    );
  }

  // ৪. ডাটা না পাওয়া গেলে
  if (!tour) {
    return (
      <ErrorPage />
    );
  }

  return (
    <div className="tour-details-page overflow-hidden pb-5">
      {/* --- Full-Screen Hero Slider Section --- */}
      <div className="tour-hero-container position-relative overflow-hidden" style={{ height: '60vh' }}>
        {tour.images && tour.images.map((img, index) => (
          <div
            key={index}
            className={`tour-hero-slide position-absolute w-100 h-100 transition-all duration-1000 ${index === current ? "opacity-100 scale-105" : "opacity-0"}`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}

        <div className="container h-100 d-flex flex-column justify-content-center text-white position-relative z-3">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-light rounded-pill mb-4 align-self-start px-4 glass-effect shadow-none"
          >
            <FaArrowLeft className="me-2" /> Back to Tours
          </button>
          
          <div className="badge bg-coral mb-3 align-self-start px-3 py-2 rounded-pill shadow-sm">
            {tour.category}
          </div>
          <h1 className="display-3 fw-bold mb-2 animate__animated animate__fadeInUp">{tour.title}</h1>
          <div className="d-flex flex-wrap align-items-center gap-4 mt-2 fs-5 opacity-90">
            <span className="d-flex align-items-center gap-2">
              <FaMapMarkerAlt className="text-coral" /> {tour.location}
            </span>
            <span className="d-flex align-items-center gap-2">
              <FaStar className="text-warning" /> {tour.rating} ({tour.reviews} Reviews)
            </span>
          </div>
        </div>
        
        {tour.images?.length > 1 && (
            <div className="slider-dots d-flex gap-2 position-absolute bottom-0 start-50 translate-middle-x mb-4 z-3">
              {tour.images.map((_, i) => (
                <span 
                  key={i} 
                  className={`dot cursor-pointer transition-all ${i === current ? 'active bg-coral' : 'bg-white opacity-50'}`} 
                  onClick={() => setCurrent(i)}
                  style={{ width: i === current ? '30px' : '10px', height: '10px', borderRadius: '10px' }}
                ></span>
              ))}
            </div>
        )}
      </div>

      <div className="container mt-5 pt-4">
        <div className="row g-5">
          <div className="col-lg-8">
            {/* Quick Info Bar */}
            <div className="info-bar d-flex flex-wrap gap-4 p-4 bg-alice-blue rounded-4 mb-5 shadow-sm border border-light">
              <div className="d-flex align-items-center gap-3">
                <div className="icon-box-small bg-white text-teal p-3 rounded-circle shadow-sm">
                  <FaClock size={20} />
                </div>
                <div>
                  <small className="text-muted d-block text-uppercase small fw-bold">Duration</small>
                  <strong className="text-dark">{tour.duration}</strong>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 border-md-start ps-md-4">
                <div className="icon-box-small bg-white text-teal p-3 rounded-circle shadow-sm">
                  <FaUserFriends size={20} />
                </div>
                <div>
                  <small className="text-muted d-block text-uppercase small fw-bold">Group Size</small>
                  <strong className="text-dark">{tour.groupSize}</strong>
                </div>
              </div>
            </div>

            {/* Description */}
            {tour.description && (
              <section className="mb-5">
                <h3 className="fw-bold text-teal mb-4 d-flex align-items-center gap-2">Tour Details</h3>
                <div className="ql-snow bg-white p-4 rounded-4 border border-light">
                  <div className="ql-editor p-0">
                    <div 
                      className="text-secondary fs-5 additional-details details-content" 
                      style={{ lineHeight: '1.8', lineBreak: 'anywhere',}}
                      dangerouslySetInnerHTML={{ __html: tour.description }} 
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
              <section className="mb-5">
                <h3 className="fw-bold text-teal mb-4 d-flex align-items-center gap-2">What You'll Experience</h3>
                <div className="row g-3">
                  {tour.highlights.map((h, i) => (
                    <div key={i} className="col-md-6">
                      <div className="card border-0 bg-white p-3 rounded-3 d-flex flex-row align-items-center gap-3 shadow-sm hover-translate">
                        <FaCheckCircle className="text-coral flex-shrink-0" />
                        <span className="fw-medium text-dark">{h}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            <div className="mt-5 pt-4">
              <h3 className="fw-bold text-teal mb-4">Tour Captures</h3>
              <Gallery images={tour.images} />
            </div>

            <div className="mt-5 pt-4">
              <h3 className="fw-bold text-teal mb-4">Share This Tour</h3>
              <ShareLink tour={tour} />
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="col-lg-4">
            <div className="position-sticky" style={{ top: "100px" }}>
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-4">
                <div className="bg-text-coral text-white p-4 text-center" style={{backgroundColor: '#ff7e5f'}}>
                  <small className="d-block opacity-75 text-uppercase fw-bold mb-1">Total Package Cost</small>
                  <h2 className="fw-bold mb-0 text-white display-5">{tour.price} <span className="fs-6 fw-normal">/ person</span></h2>
                </div>
                <div className="pt-4 bg-white">
                  <h5 className="fw-bold text-dark text-center mb-4 border-bottom pb-2">Reserve Your Spot</h5>
                  <EnquiryForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;