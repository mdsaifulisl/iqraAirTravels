import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import destinationsJsonData from "../../data/destinations.json";
import useDestinations from "../../hooks/useDestinations";

const Destinations = () => {
  const navigate = useNavigate();
  

  // Context থেকে রিয়েল ডাটা এবং ডিলিট ফাংশন নিয়ে আসা
  const { destinations, loading, error } = useDestinations();
  const destinationsData = destinations?.length > 0 ? destinations : destinationsJsonData;
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  if (loading) return <div className="text-center p-5">Loading Destinations...</div>;
  if (error) return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <div className="destinations-page pb-5">
      {/* --- Hero Section --- */}
      <section 
        className="destinations-hero d-flex align-items-center justify-content-center text-center text-white"
        style={{
          background: `linear-gradient(rgba(0,128,128,0.6), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1600&q=80')`,
          height: "50vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginBottom: "60px"
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Travel Destinations</h1>
          <p className="lead mx-auto opacity-90" style={{ maxWidth: "700px" }}>
            Handpicked extraordinary places for your next grand adventure.
          </p>
        </div>
      </section>

      {/* --- All Destinations Grid --- */}
      <section className="container mb-5">
        <div className="row g-4">
          {destinationsData.map((dest) => (
            <div className="col-lg-4 col-md-6" key={dest.id}>
              <div className="card h-100 shadow-sm border-0 overflow-hidden destination-card rounded-4 hover-shadow transition-all">
                
                {/* Image Section */}
                <div className="position-relative overflow-hidden" style={{ height: "240px" }}>
                  <img 
                    src={dest.images[0]} 
                    className="card-img-top w-100 h-100 object-fit-cover transition-transform duration-500 hover-zoom" 
                    alt={dest.title} 
                  />
                  {/* Price Tag Overlay */}
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-coral text-white fs-6 px-3 py-2 rounded-pill shadow">
                      From {dest.price}
                    </span>
                  </div>
                  {/* Location Badge */}
                  <div className="position-absolute bottom-0 start-0 m-3">
                    <span className="badge bg-white text-teal px-3 py-2 rounded-pill small fw-bold d-flex align-items-center gap-1 shadow-sm">
                      <FaMapMarkerAlt className="text-coral" /> {dest.location}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted small d-flex align-items-center gap-1">
                      <FaClock className="text-teal" /> {dest.duration}
                    </span>
                    <span className="text-muted small d-flex align-items-center gap-1">
                      <FaStar className="text-warning" /> {dest.rating}
                    </span>
                  </div>

                  <h4 className="card-title fw-bold text-dark mb-3 h5">{dest.title}</h4>
                  
                  {/* Clean Text Description */}
                  <p className="card-text text-secondary small mb-4 flex-grow-1">
                    {stripHtml(dest.description).length > 90 
                      ? `${stripHtml(dest.description).slice(0, 90)}...` 
                      : stripHtml(dest.description)}
                  </p>

                  <button 
                    onClick={() => navigate(`/destinations/${dest.id}`)}
                    className="btn btn-outline-teal w-100 py-2 fw-bold rounded-pill d-flex align-items-center justify-content-center gap-2 mt-auto transition-all"
                  >
                    View Details <FaArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Destinations;