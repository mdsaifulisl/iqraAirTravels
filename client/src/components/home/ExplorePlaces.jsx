import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar, FaClock, FaKaaba } from "react-icons/fa";
import useDestinations from "../../hooks/useDestinations";

// Fallback Dummy Data for Hajj & Umrah Packages
const DUMMY_PACKAGES = [
  {
    id: "dummy-1",
    title: "ইকোনমি ওমরাহ প্যাকেজ (১৪ দিন)",
    category: "Umrah",
    price: "৳ ১,৪৫,০০০",
    location: "মক্কা ও মদিনা",
    rating: "4.8",
    duration: "14 Days",
    highlights: ["৩ স্টার হোটেল", "সরাসরি ফ্লাইট"],
    images: ["/makka.jpg"]
  },
  {
    id: "dummy-2",
    title: "প্রিমিয়াম হজ্জ প্যাকেজ ২০২৬",
    category: "Hajj",
    price: "৳ ৬,৫০,০০০",
    location: "মক্কা, মদিনা, মিনা",
    rating: "4.9",
    duration: "30 Days",
    highlights: ["৫ স্টার হোটেল", "হারামের কাছে হোটেল"],
    images: ["/makka2.jpg"]
  },
  {
    id: "dummy-3",
    title: "রমজান ওমরাহ স্পেশাল প্যাকেজ",
    category: "Umrah",
    price: "৳ ১,৮৫,০০০",
    location: "মক্কা ও মদিনা",
    rating: "4.7",
    duration: "15 Days",
    highlights: ["সেহরি ও ইফতার অন্তর্ভুক্ত"],
    images: ["makka.jpg"]
  },
  {
    id: "dummy-4",
    title: "এক্সিকিউটিভ ওমরাহ প্যাকেজ (১০ দিন)",
    category: "VIP Umrah",
    price: "৳ ২,১০,০০০",
    location: "মক্কা ও মদিনা",
    rating: "5.0",
    duration: "10 Days",
    highlights: ["ভিআইপি পরিবহন", "গাইড সুবিধা"],
    images: ["makka2.jpg"]
  }
];

const ExplorePlaces = () => {
  const { destinations, loading } = useDestinations();

  // যদি লোডিং চলে অথবা ডাটা না পাওয়া যায়, তবে ডামি ডাটা ব্যবহার করবে
  const rawData = (loading || !destinations || destinations.length === 0) 
    ? DUMMY_PACKAGES 
    : destinations;

  const displayDestinations = rawData.slice(0, 4);

  return (
    <section className="explore-places section-padding bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="row mb-5 text-center">
          <div className="col-lg-12">
            <h6
              className="fw-bold text-uppercase"
              style={{ color: "var(--secondary-coral)" }}
            >
              পবিত্র সফর
            </h6>
            <h2
              className="display-5 fw-bold"
              style={{ color: "var(--primary-teal)" }}
            >
              হজ্জ ও ওমরাহ প্যাকেজসমূহ
            </h2>
            <div
              className="header-line mx-auto"
              style={{
                width: "80px",
                height: "3px",
                backgroundColor: "var(--secondary-coral)",
              }}
            ></div>
          </div>
        </div>

        {/* Package Grid */}
        <div className="row g-4">
          {displayDestinations.map((place) => (
            <div className="col-lg-3 col-md-6" key={place.id}>
              <Link
                to={`/hajj&umrah/${place.id}`}
                className="place-card-wrapper text-decoration-none"
              >
                <div className="place-card position-relative overflow-hidden rounded-4 shadow-sm h-100 bg-white border d-flex flex-column justify-content-between">
                  <div>
                    {/* Image Container */}
                    <div className="place-image position-relative" style={{ height: "220px" }}>
                      <img
                        src={place.images?.[0] || "https://placehold.co/600x400?text=Hajj+Umrah"}
                        alt={place.title}
                        className="img-fluid w-100 h-100 object-fit-cover transition-transform"
                      />
                      
                      {/* Category Badge */}
                      <div className="position-absolute top-0 start-0 m-3 badge bg-teal-gradient text-white shadow-sm px-3 py-2 rounded-pill fw-medium d-flex align-items-center gap-1">
                        <FaKaaba className="me-1" />
                        {place.category || "Hajj & Umrah"}
                      </div>

                      {/* Price Tag */}
                      <div className="position-absolute top-0 end-0 m-3 badge bg-white text-dark shadow-sm px-3 py-2 rounded-pill fw-bold fs-6">
                        {place.price}
                      </div>
                    </div>

                    {/* Place Info */}
                    <div className="place-content p-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-muted d-flex align-items-center gap-1">
                          <FaMapMarkerAlt
                            style={{ color: "var(--secondary-coral)" }}
                          />{" "}
                          {place.location || "Makkah & Madinah"}
                        </small>
                        <small className="text-warning fw-bold d-flex align-items-center gap-1">
                          <FaStar /> {place.rating}
                        </small>
                      </div>

                      <h5 className="fw-bold text-dark mb-2 text-truncate">
                        {place.title}
                      </h5>

                      <div className="d-flex align-items-center gap-2 text-secondary small mb-2">
                        <span>
                          <FaClock className="me-1" /> {place.duration}
                        </span>
                        
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="px-3 pb-3">
                    <div className="btn btn-sm btn-outline-teal w-100 rounded-pill fw-semibold">
                      প্যাকেজ বিবরণ দেখুন
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            <Link
              to="/hajj&umrah"
              className="btn btn-outline-teal px-5 py-2 rounded-pill fw-bold"
            >
              সকল প্যাকেজ দেখুন
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExplorePlaces;