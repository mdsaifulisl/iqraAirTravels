import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaClock } from 'react-icons/fa';
import useDestinations from '../../hooks/useDestinations'; // গ্লোবাল রিফ্রেশের জন্য

const ExplorePlaces = () => {
    // Context থেকে রিয়েল ডাটা নিয়ে আসা
    const { destinations, loading } = useDestinations();

    // 
    const displayDestinations = destinations.slice(0, 4);

    if (loading) {
        return <div className="text-center py-5">Loading Places...</div>;
    }

    return (
        <section className="explore-places section-padding bg-white">
            <div className="container">
                
                {/* Section Header */}
                <div className="row mb-5 text-center">
                    <div className="col-lg-12">
                        <h6 className="text-coral fw-bold text-uppercase" style={{ color: 'var(--secondary-coral)' }}>Where to Go</h6>
                        <h2 className="display-5 fw-bold" style={{ color: 'var(--primary-teal)' }}>Explore Popular Destinations</h2>
                        <div className="header-line mx-auto" style={{ width: '80px', height: '3px', backgroundColor: 'var(--secondary-coral)' }}></div>
                    </div>
                </div>

                {/* Destination Grid */}
                <div className="row g-4">
                    {displayDestinations.map((place) => (
                        <div className="col-lg-3 col-md-6" key={place.id}>
                            <Link to={`/destinations/${place.id}`} className="place-card-wrapper text-decoration-none">
                                <div className="place-card position-relative overflow-hidden rounded-4 shadow-sm h-100 bg-white border">
                                    {/* Image Container */}
                                    <div className="place-image" style={{ height: '250px' }}>
                                        <img 
                                            src={place.images[0]} 
                                            alt={place.title} 
                                            className="img-fluid w-100 h-100 object-fit-cover transition-transform"
                                        />
                                        {/* Price Tag */}
                                        <div className="position-absolute top-0 end-0 m-3 badge bg-white text-dark shadow-sm px-3 py-2 rounded-pill fw-bold">
                                            {place.price}
                                        </div>
                                    </div>

                                    {/* Place Info */}
                                    <div className="place-content p-3">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <small className="text-muted d-flex align-items-center gap-1">
                                                <FaMapMarkerAlt style={{ color: 'var(--secondary-coral)' }} /> {place.location}
                                            </small>
                                            <small className="text-warning fw-bold d-flex align-items-center gap-1">
                                                <FaStar /> {place.rating}
                                            </small>
                                        </div>
                                        
                                        <h5 className="fw-bold text-dark mb-2 text-truncate">{place.title}</h5>
                                        
                                        <div className="d-flex align-items-center gap-3 text-secondary small">
                                            <span><FaClock className="me-1" /> {place.duration}</span>
                                            <span className="text-truncate">| {place.highlights[0]}</span>
                                        </div>
                                    </div>

                                    {/* Hover Overlay Effect (Optional) */}
                                    <div className="place-overlay-simple"></div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="row mt-5">
                    <div className="col-12 text-center">
                        <Link to="/destinations" className="btn btn-outline-teal px-5 py-2 rounded-pill fw-bold">
                            View All Destinations
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ExplorePlaces;