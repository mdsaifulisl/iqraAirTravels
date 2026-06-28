import React from "react";
import { FaClock, FaMapMarkerAlt, FaStar, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TourCard = ({ tourData }) => {
  const navigate = useNavigate();

  
  const extractText = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  }; 

 console.log("Tour data received in TourCard:", tourData.toString());
  
  return (
    <>
      {tourData.map((tour) => {
        const plainDescription = extractText(tour.description).replace(/\u00A0/g, " ");

        return (
          <div className="col-lg-4 col-md-6 mb-4" key={tour.id}>
            <div className="tour-card shadow-sm border-0 h-100 d-flex flex-column bg-white rounded-4 overflow-hidden">
     
              <div className="tour-img-wrapper position-relative overflow-hidden">
                <img
                  src={`${tour.images[0]}`}
                  className="card-img-top transition-all"
                  style={{ height: "220px", objectFit: "cover" }}
                  alt={tour.title}
                />
                

                <span className="tour-price-badge position-absolute top-0 end-0 m-3 badge bg-text-coral px-3 py-2 shadow-sm">
                  {tour.price}
                </span>
                <span className="position-absolute bottom-0 start-0 m-3 badge bg-white text-dark small px-2 py-1 opacity-75">
                  {tour.category}
                </span>
              </div>

              <div className="card-body p-4 d-flex flex-column flex-grow-1">
                {/* লোকেশন এবং রেটিং */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-secondary small d-flex align-items-center gap-1">
                    <FaMapMarkerAlt className="text-coral" /> {tour.location}
                  </span>
                  {/* <span className="rating d-flex align-items-center gap-1 small fw-bold">
                    <FaStar className="text-warning" /> {tour.rating} ({tour.reviews})
                  </span> */}
                </div>

               
                <h5 className="card-title text-teal fw-bold mb-2" style={{ height: "48px", overflow: "hidden" }}>
                  {tour.title}
                </h5>

        
                <p className="text-muted small mb-3">
                  {plainDescription.length > 80
                    ? `${plainDescription.slice(0, 80)}...`
                    : plainDescription}
                </p>

                
                <div className="mb-3">
                  <span className="badge bg-light text-secondary border small fw-normal">
                    <FaUsers className="me-1" /> {tour.groupSize}
                  </span>
                </div>

              
                <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-auto">
                  <span className="text-secondary small d-flex align-items-center gap-1">
                    <FaClock className="text-teal" /> {tour.duration}
                  </span>
                  <button
                    onClick={() => navigate(`/tours/${tour.id}`)}
                    className="btn btn-coral btn-sm px-4 rounded-pill shadow-sm"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TourCard;