import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlane, FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import useSlider from '../../hooks/useSlider';


const sliderDataJson = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    headline: "Dream Your Next Vacation",
    subtext: "Explore the most beautiful beaches in the world",
    btn1: "Explore Beaches",
    btn2: "Learn More",
    link: "/destinations",
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
    headline: "Adventure Awaits",
    subtext: "Trekking, hiking & mountain tours",
    btn1: "Start Adventure",
    btn2: "View Tours",
    link: "/tours",
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1920&q=80',
    headline: "City Breaks",
    subtext: "Discover vibrant cities & cultures",
    btn1: "Explore Cities",
    btn2: "See Deals",
    link: "/visa-service"
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80',
    headline: "Wildlife & Nature",
    subtext: "Get close to nature with our safari tours",
    btn1: "Discover Wildlife",
    btn2: "Book Now",
    link: "/air-tickets"
  }
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const { sliders } = useSlider();

    const sliderData = sliders.length > 0 ? sliders : sliderDataJson; 
    

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [sliderData.length]);

  return (
    <section className="hero-wrapper position-relative">
      {/* Slider Area */}
      <div className="manual-slider">
        {sliderData.map((slide, index) => (
          <div key={slide.id} className={`custom-slide ${index === current ? 'active' : ''}`}>
            <div className="slide-img" style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="slider-overlay-teal"></div>
            </div>
            <div className="container slide-info">
              <div className="row justify-content-center">
                <div className="col-lg-8 text-center text-white">
                  <h1 className="display-3 fw-bold mb-3 animate-up">{slide.headline}</h1>
                  <p className="lead mb-4 animate-down">{slide.subtext}</p>
                  <div className="d-flex justify-content-center gap-3 animate-up">
                    <button className="btn btn-coral px-4 py-2 fw-bold bg-text-coral">{slide.btn1}</button>
                    <button className="btn btn-outline-light px-4 py-2 fw-bold">{slide.btn2}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Manual Navigation */}
        <button className="nav-btn prev-btn d-none d-md-flex" onClick={() => setCurrent(current === 0 ? sliderData.length - 1 : current - 1)}>
          <FaChevronLeft />
        </button>
        <button className="nav-btn next-btn d-none d-md-flex" onClick={() => setCurrent(current === sliderData.length - 1 ? 0 : current + 1)}>
          <FaChevronRight />
        </button>
      </div>

      {/* 4.1 Flight Search Form (Fixed Overlay) */}
      <div className="flight-search-container">
        <div className="container">
          <div className="search-box-white p-4 shadow-lg rounded-3">
            <h5 className="text-teal fw-bold mb-3 d-flex align-items-center gap-2">
              <FaPlane className="text-coral" /> Find Your Next Flight
            </h5>
            <form className="row g-3">
              <div className="col-lg-3 col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-light border-teal text-teal"><FaMapMarkerAlt /></span>
                  <input type="text" className="form-control border-teal" placeholder="From (Airport)" />
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-light border-teal text-teal"><FaMapMarkerAlt /></span>
                  <input type="text" className="form-control border-teal" placeholder="To (Destination)" />
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-light border-teal text-teal"><FaCalendarAlt /></span>
                  <input type="date" className="form-control border-teal" />
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-light border-teal text-teal"><FaUserFriends /></span>
                  <select className="form-select border-teal">
                    <option>1 Adult, Economy</option>
                    <option>2 Adults, Economy</option>
                    <option>Business Class</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-2">
                <button type="submit" className="btn btn-coral w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2">
                  <FaSearch /> Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;


