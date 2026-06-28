import React from "react";
import { FaClock, FaMoneyBillWave, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VisaServiceCard = ({ visa }) => {
  const navigate = useNavigate();

  return (
    <div className="visa-card border-0 shadow-sm rounded-4 overflow-hidden h-100 bg-white d-flex flex-column">
      {/* Image Section */}
      <div className="visa-img-box position-relative">
        <img
          src={visa.images[0]}
          alt={visa.country}
          className="w-100"
          style={{ height: "180px", objectFit: "cover" }}
        />
        <div className="country-badge bg-coral text-white px-3 py-1 rounded-pill small position-absolute" 
             style={{fontSize: '0.75rem', top: '15px', right: '15px', fontWeight: '600'}}>
          {visa.country}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 d-flex flex-column flex-grow-1">
        <h6 className="text-secondary small fw-bold mb-1">{visa.type}</h6>
        
    
        <h5 className="fw-bold text-teal mb-1 visa-title-text">
          {visa.title.length > 50 ? `${visa.title.slice(0, 50)}...` : visa.title}
        </h5>

        <div className="mt-auto">
          <hr className="my-3 opacity-10" />
          
          <div className="d-flex flex-column gap-2 mb-4">
            {
              visa.fee && (
                <div className="d-flex justify-content-between small">
              <span className="text-muted">
                <FaMoneyBillWave className="me-1 text-coral" /> Fee
              </span>
              <span className="fw-bold text-dark">{visa.fee}</span>
            </div>
              )
            }
            {
              visa.duration && (
                <div className="d-flex justify-content-between small">
              <span className="text-muted">
                <FaClock className="me-1 text-coral" /> Duration
              </span>
              <span className="fw-bold text-dark">{visa.duration}</span>
            </div>
              )
            }
            
            {
              visa.validity && (
                <div className="d-flex justify-content-between small">
              <span className="text-muted">
                <FaClock className="me-1 text-coral" /> Validity
              </span>
              <span className="fw-bold text-dark">{visa.validity}</span>
            </div>
              )
            }
          </div>

          <button
            onClick={() => navigate(`/visa-service/${visa.id}`)}
            className="btn btn-teal w-100 rounded-pill fw-bold btn-sm py-2 shadow-sm d-flex align-items-center justify-content-center gap-2"
          >
            View Details <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisaServiceCard;