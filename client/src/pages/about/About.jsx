import React from "react";
import { Link } from "react-router-dom";
import { FaAward, FaGlobe, FaUsers, FaShieldAlt } from "react-icons/fa";
import "../../assets/style/about.css";

// components
import FAQ from "../../components/shared/FAQ";
import Newsletter from "../../components/shared/Newsletter";

// hooks
import useAbout from "../../hooks/useAbout";

const About = () => {
  const { aboutContent, loading } = useAbout();

  return (
    <div className="about-page overflow-hidden">
      {/* 1. Breadcrumb / Header */}
      <section className="about-hero d-flex align-items-center justify-content-center text-center text-white">
        <div className="container">
          <h1 className="display-4 fw-bold">About Us</h1>
          <p className="lead">Your Trusted Partner in World Exploration</p>
        </div>
      </section>

      {/* 2. Our Story Section */}
      {/* 2. Our Story Section */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-teal" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <section className="story-section section-padding">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className="story-img-wrapper position-relative">
                  {/* ইমেজ হ্যান্ডলিং: ডাটা না থাকলে ডামি ইমেজ দেখাবে */}
                  <img
                    src={
                      aboutContent?.image ||
                      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                    }
                    alt="Our Team"
                    className="img-fluid rounded-4 shadow-lg w-100"
                    style={{ minHeight: "400px", objectFit: "cover" }}
                  />

                  {/* Experience Badge: ডাটাবেস থেকে আসা টেক্সট দেখাবে */}
                  {aboutContent?.experience && (
                    <div
                      className="experience-badge bg-coral text-white p-3 text-center rounded-3 position-absolute"
                      style={{
                        bottom: "20px",
                        right: "20px",
                        minWidth: "120px",
                      }}
                    >
                      <h3 className="fw-bold mb-0">
                        {aboutContent.experience}
                      </h3>
                      <p className="small mb-0">Experience</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <h6 className="text-coral fw-bold text-uppercase mb-2">
                  Who We Are
                </h6>

                {/* Title: ডাটা না থাকলে ডিফল্ট টাইটেল */}
                <h2 className="display-6 fw-bold text-teal mb-4">
                  {aboutContent?.title || "Welcome to Amazing Tours"}
                </h2>

                {/* Description: text-secondary এবং লাইন হাইট ঠিক করা হয়েছে */}
                <p
                  className="text-secondary mb-4"
                  style={{ textAlign: "justify", lineHeight: "1.8" }}
                >
                  {aboutContent?.description ||
                    "At Amazing Tours, we believe that travel is not just about visiting new places, but about creating unforgettable experiences. With over a decade of expertise in the travel industry, we have been dedicated to crafting personalized tours that cater to the unique preferences of each traveler."}
                </p>

                {/* Action Button */}
                <div className="mt-4">
                  <Link
                    to="/tours"
                    className="btn btn-teal px-4 py-2 fw-bold shadow-sm rounded-pill"
                  >
                    Explore Our Tours
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Why Choose Us (Icon Grid) */}
      <section className="why-choose-us py-5 bg-alice-blue">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-teal">Why Choose Amazing Tours?</h2>
            <div className="header-line mx-auto"></div>
          </div>
          <div className="row g-4">
            <div className="col-md-3 text-center">
              <div className="feature-card p-4 bg-white rounded-4 shadow-sm h-100">
                <FaGlobe className="fs-1 text-coral mb-3" />
                <h5 className="fw-bold text-teal">Global Reach</h5>
                <p className="small text-secondary">
                  Tours across 50+ countries around the globe.
                </p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="feature-card p-4 bg-white rounded-4 shadow-sm h-100">
                <FaAward className="fs-1 text-coral mb-3" />
                <h5 className="fw-bold text-teal">Certified Service</h5>
                <p className="small text-secondary">
                  A multi-award winning travel agency.
                </p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="feature-card p-4 bg-white rounded-4 shadow-sm h-100">
                <FaUsers className="fs-1 text-coral mb-3" />
                <h5 className="fw-bold text-teal">Happy Clients</h5>
                <p className="small text-secondary">
                  Over 10,000 satisfied travelers worldwide.
                </p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="feature-card p-4 bg-white rounded-4 shadow-sm h-100">
                <FaShieldAlt className="fs-1 text-coral mb-3" />
                <h5 className="fw-bold text-teal">Safe Travel</h5>
                <p className="small text-secondary">
                  Your safety is our top priority always.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <FAQ />
      </section>

      {/* news letter */}
      <section>
        <Newsletter />
      </section>
    </div>
  );
};

export default About;
