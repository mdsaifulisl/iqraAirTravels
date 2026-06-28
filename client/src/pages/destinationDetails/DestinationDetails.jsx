import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import Gallery from "../../components/shared/Gallery";
import ShareLink from "../../components/shared/ShareLink";
import { getDestinationById } from "../../api/destinationService";
import ErrorPage from "../error/ErrorPage";

const DestinationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchDestinationData = async () => {
      try {
        setLoading(true);
        const response = await getDestinationById(id);
        if (response.success) {
          setDestination(response.data);
        } else {
          setError("Destination not found");
        }
      } catch (err) {
        setError(err.message || "Something went wrong while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationData();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <ErrorPage />
    );
  }

  return (
    <div
      className="destination-details py-5 overflow-hidden"
      style={{ backgroundColor: "var(--accent-alice-blue)" }}
    >
      <div className="container">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-coral mb-4 rounded-pill px-4 shadow-sm"
        >
          <FaArrowLeft className="me-2" /> Back to Destinations
        </button>

        <div className="row g-4">
          <div className="col-lg-12">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-white">
              {/* Main Image */}
              <div
                className="position-relative overflow-hidden"
                style={{ height: "450px" }}
              >
                <img
                  src={destination.images?.[0] || "https://via.placeholder.com/1200x600"}
                  className="img-fluid w-100 h-100 object-fit-cover"
                  alt={destination.title}
                />
              </div>

              <div className="card-body p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span
                    className="badge px-3 py-2 rounded-pill fw-bold"
                    style={{
                      backgroundColor: "var(--light-coral)",
                      color: "var(--secondary-coral)",
                    }}
                  >
                    <FaMapMarkerAlt className="me-1" /> {destination.location}
                  </span>
                  <div className="text-warning fw-bold d-flex align-items-center gap-1">
                    <FaStar /> {destination.rating}{" "}
                    <span className="text-muted fw-normal small">
                      (Featured)
                    </span>
                  </div>
                </div>

                <h1
                  className="fw-bold mb-4"
                  style={{ color: "var(--primary-teal)" }}
                >
                  {destination.title}
                </h1>

                {/* Quick Info Grid */}
                <div className="row g-3 mb-5 py-3 border-top border-bottom text-center">
                  <div className="col-4 border-end">
                    <small className="text-secondary d-block text-uppercase">
                      Duration
                    </small>
                    <span className="fw-bold">
                      <FaClock style={{ color: "var(--primary-teal)" }} />{" "}
                      {destination.duration}
                    </span>
                  </div>
                  <div className="col-4 border-end">
                    <small className="text-secondary d-block text-uppercase">
                      Tour Type
                    </small>
                    <span className="fw-bold">Experience</span>
                  </div>
                  <div className="col-4">
                    <small className="text-secondary d-block text-uppercase">
                      Price Starts
                    </small>
                    <span className="fw-bold text-teal">{destination.price}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="description-content mb-5">
                  <h4
                    className="fw-bold mb-3"
                    style={{ color: "var(--primary-teal)" }}
                  >
                    About this Destination
                  </h4>
                  <div
                    className="ql-editor p-0 additional-details2 details-content"
                    style={{ lineBreak: 'anywhere' }}
                    dangerouslySetInnerHTML={{
                      __html: destination.description,
                    }}
                  />
                </div>

                {/* Highlights */}
                {destination.highlights && destination.highlights.length > 0 && (
                  <>
                    <h4
                      className="fw-bold mb-3"
                      style={{ color: "var(--primary-teal)" }}
                    >
                      Highlights
                    </h4>
                    <div className="row g-2">
                      {destination.highlights.map((h, i) => (
                        <div className="col-md-6" key={i}>
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <FaCheckCircle
                              style={{ color: "var(--secondary-coral)" }}
                            />{" "}
                            {h}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Gallery Section */}
                {destination.images && destination.images.length > 0 && (
                  <div className="mt-5">
                    <hr />
                    <h3 className="fw-bold mb-4">Photo Gallery</h3>
                    <Gallery images={destination.images} />
                  </div>
                )}

                {/* Share Buttons */}
                <div className="mt-5">
                  <ShareLink post={destination} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;