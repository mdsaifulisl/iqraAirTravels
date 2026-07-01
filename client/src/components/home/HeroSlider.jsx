import React, { useState, useEffect, useRef } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlane,
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserFriends,
} from "react-icons/fa";
import useSlider from "../../hooks/useSlider";
import Airport from "../../data/airports.json";
import useSetting from "../../hooks/useSetting";

// country 
const popularAirports = Airport.map((airport) => ({
  name: airport.name,
  code: airport.code,
  airport: airport.airport,
  country: airport.country || "Unknown", 
}));

const sliderDataJson = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    headline: "Dream Your Next Vacation",
    subtext: "Explore the most beautiful beaches in the world",
    btn1: "Explore Beaches",
    btn2: "Learn More",
    link: "/destinations",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
    headline: "Adventure Awaits",
    subtext: "Trekking, hiking & mountain tours",
    btn1: "Start Adventure",
    btn2: "View Tours",
    link: "/tours",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1920&q=80",
    headline: "City Breaks",
    subtext: "Discover vibrant cities & cultures",
    btn1: "Explore Cities",
    btn2: "See Deals",
    link: "/visa-service",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80",
    headline: "Wildlife & Nature",
    subtext: "Get close to nature with our safari tours",
    btn1: "Discover Wildlife",
    btn2: "Book Now",
    link: "/air-tickets",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const { sliders } = useSlider();
  const { settings } = useSetting();
  // console.log("Affiliate Link from useSetting:", settings?.affiliateLink);

  const [formData, setFormData] = useState({
    fromAirport: "Kuala Lumpur (KUL)",
    toAirport: "Dhaka (DAC)",
    departDate: "",
  });

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const fromContainerRef = useRef(null);
  const toContainerRef = useRef(null);

  const sliderData = sliders?.length > 0 ? sliders : sliderDataJson;

  useEffect(() => {
    if (sliderData.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [sliderData.length]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        fromContainerRef.current &&
        !fromContainerRef.current.contains(event.target)
      ) {
        setShowFromDropdown(false);
      }
      if (
        toContainerRef.current &&
        !toContainerRef.current.contains(event.target)
      ) {
        setShowToDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectAirport = (fieldName, airportObj) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: `${airportObj.name} (${airportObj.code})`,
    }));
    if (fieldName === "fromAirport") setShowFromDropdown(false);
    if (fieldName === "toAirport") setShowToDropdown(false);
  };

  // 
  const getFilteredAirports = (inputValue) => {
    const cleanValue = (inputValue || "").trim().toLowerCase();
    if (!cleanValue) return popularAirports;

    if (cleanValue.includes("(") && cleanValue.includes(")")) {
      return popularAirports;
    }

    return popularAirports.filter(
      (airport) =>
        airport.name.toLowerCase().includes(cleanValue) ||
        airport.code.toLowerCase().includes(cleanValue) ||
        airport.airport.toLowerCase().includes(cleanValue) ||
        airport.country.toLowerCase().includes(cleanValue),
    );
  };

  const extractIataCode = (inputString, defaultFallback) => {
    if (!inputString) return defaultFallback;
    const match = inputString.match(/\(([^)]+)\)/);
    if (match && match[1]) {
      return match[1].trim().toUpperCase();
    }
    const cleanStr = inputString.trim();
    if (cleanStr.length === 3) return cleanStr.toUpperCase();
    return cleanStr.substring(0, 3).toUpperCase();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const fromCode = extractIataCode(formData.fromAirport, "KUL");
    const toCode = extractIataCode(formData.toAirport, "DAC");
    const departDate = formData.departDate || "";

    const dbTrackUrl =
      settings?.affiliateLink ||
      "https://www.trip.com/flights/Kuala%20Lumpur-to-Dhaka/tickets-KUL-DAC?flighttype=S&dcity=KUL&acity=DAC&Allianceid=7899074&SID=296372406&trip_sub1=&trip_sub3=D18363431&linkhub_token=sl_uO9kVSJTKV2";
    let allianceId = "7899074";
    let sid = "296372406";
    let tripSub3 = "D18363431";

    try {
      if (dbTrackUrl) {
        const urlObj = new URL(dbTrackUrl);
        allianceId = urlObj.searchParams.get("Allianceid") || allianceId;
        sid = urlObj.searchParams.get("SID") || sid;
        tripSub3 = urlObj.searchParams.get("trip_sub3") || tripSub3;
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.error("Invalid URL in DB");
    }

    let affiliateUrl = `https://www.trip.com/flights/${fromCode}-to-${toCode}/tickets-${fromCode}-${toCode}?flighttype=S&dcity=${fromCode}&acity=${toCode}&Allianceid=${allianceId}&SID=${sid}&trip_sub1=&trip_sub3=${tripSub3}`;

    if (departDate) {
      affiliateUrl += `&ddate=${departDate}`;
    }

    window.open(affiliateUrl, "_blank");
  };

  return (
    <section className="hero-wrapper position-relative">
      {/* Slider Area */}
      <div className="manual-slider">
        {sliderData.map((slide, index) => (
          <div
            key={slide.id || index}
            className={`custom-slide ${index === current ? "active" : ""}`}
          >
            <div
              className="slide-img"
              style={{ backgroundImage: `url(${slide?.image})` }}
            >
              <div className="slider-overlay-teal"></div>
            </div>
            <div className="container slide-info">
              <div className="row justify-content-center">
                <div className="col-lg-8 text-center text-white">
                  <h1 className="display-3 fw-bold mb-3 animate-up">
                    {slide?.headline}
                  </h1>
                  <p className="lead mb-4 animate-down">{slide?.subtext}</p>
                  <div className="d-flex justify-content-center gap-3 animate-up">
                    <button className="btn btn-coral px-4 py-2 fw-bold bg-text-coral">
                      {slide?.btn1}
                    </button>
                    <button className="btn btn-outline-light px-4 py-2 fw-bold">
                      {slide?.btn2}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Manual Navigation */}
        <button
          className="nav-btn prev-btn d-none d-md-flex"
          onClick={() =>
            setCurrent(current === 0 ? sliderData.length - 1 : current - 1)
          }
        >
          <FaChevronLeft />
        </button>
        <button
          className="nav-btn next-btn d-none d-md-flex"
          onClick={() =>
            setCurrent(current === sliderData.length - 1 ? 0 : current + 1)
          }
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Flight Search Form */}
      <div className="flight-search-container">
        <div className="container">
          <div className="search-box-white p-4 shadow-lg rounded-3">
            <h5 className="text-teal fw-bold mb-3 d-flex align-items-center gap-2">
              <FaPlane className="text-coral" /> Find Your Next Flight
            </h5>
            <form className="row g-3" onSubmit={handleSearchSubmit}>
              {/* From Input Container */}
              <div
                className="col-lg-3 col-md-6 position-relative"
                ref={fromContainerRef}
              >
                <div className="input-group">
                  <span className="input-group-text bg-light border-teal text-teal">
                    <FaMapMarkerAlt />
                  </span>
                  <input
                    type="text"
                    name="fromAirport"
                    value={formData.fromAirport}
                    onChange={handleInputChange}
                    onFocus={() => {
                      setShowFromDropdown(true);
                      setShowToDropdown(false);
                    }}
                    className="form-control border-teal"
                    placeholder="From City, Country or Airport"
                    required
                    autoComplete="off"
                  />
                </div>

                {showFromDropdown && (
                  <div
                    className="position-absolute w-100 bg-white border border-teal rounded-2 mt-1 shadow-lg overflow-auto webkit-scrollbar"
                    style={{ zIndex: 1050, maxHeight: "250px" }}
                  >
                    {getFilteredAirports(formData.fromAirport).map(
                      (airport) => (
                        <div
                          key={airport.code}
                          onClick={() =>
                            handleSelectAirport("fromAirport", airport)
                          }
                          className="p-2 border-bottom text-start"
                          style={{
                            cursor: "pointer",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#f1f5f9")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "#fff")
                          }
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold text-dark">
                              {airport.name} ({airport.code})
                            </span>
                            <span className="badge bg-light text-secondary border">
                              {airport.country}
                            </span>
                          </div>
                          <small
                            className="text-muted d-block text-truncate"
                            style={{ fontSize: "11px" }}
                          >
                            {airport.airport}
                          </small>
                        </div>
                      ),
                    )}
                    {getFilteredAirports(formData.fromAirport).length === 0 && (
                      <div className="p-3 text-center text-muted">
                        <small>No results found</small>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* To Input Container */}
              <div
                className="col-lg-3 col-md-6 position-relative"
                ref={toContainerRef}
              >
                <div className="input-group">
                  <span className="input-group-text bg-light border-teal text-teal">
                    <FaMapMarkerAlt />
                  </span>
                  <input
                    type="text"
                    name="toAirport"
                    value={formData.toAirport}
                    onChange={handleInputChange}
                    onFocus={() => {
                      setShowToDropdown(true);
                      setShowFromDropdown(false);
                    }}
                    className="form-control border-teal"
                    placeholder="To City, Country or Airport"
                    required
                    autoComplete="off"
                  />
                </div>

                {showToDropdown && (
                  <div
                    className="position-absolute w-100 bg-white border border-teal rounded-2 mt-1 shadow-lg overflow-auto webkit-scrollbar-none"
                    style={{
                      zIndex: 1050,
                      maxHeight:
                        "250px" /*msOverflowStyle: 'none', scrollbarWidth: 'none' */,
                    }}
                  >
                    {getFilteredAirports(formData.toAirport).map((airport) => (
                      <div
                        key={airport.code}
                        onClick={() =>
                          handleSelectAirport("toAirport", airport)
                        }
                        className="p-2 border-bottom text-start"
                        style={{
                          cursor: "pointer",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#f1f5f9")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "#fff")
                        }
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold text-dark">
                            {airport.name} ({airport.code})
                          </span>
                          <span className="badge bg-light text-secondary border">
                            {airport.country}
                          </span>
                        </div>
                        <small
                          className="text-muted d-block text-truncate"
                          style={{ fontSize: "11px" }}
                        >
                          {airport.airport}
                        </small>
                      </div>
                    ))}
                    {getFilteredAirports(formData.toAirport).length === 0 && (
                      <div className="p-3 text-center text-muted">
                        <small>No results found</small>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Date Input */}
              <div className="col-lg-2 col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-light border-teal text-teal">
                    <FaCalendarAlt />
                  </span>
                  <input
                    type="date"
                    name="departDate"
                    value={formData.departDate}
                    onChange={handleInputChange}
                    className="form-control border-teal"
                  />
                </div>
              </div>

              {/* Passengers / Class Select */}
              <div className="col-lg-2 col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-light border-teal text-teal">
                    <FaUserFriends />
                  </span>
                  <select className="form-select border-teal">
                    <option>1 Adult, Economy</option>
                    <option>2 Adults, Economy</option>
                    <option>Business Class</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-lg-2">
                <button
                  type="submit"
                  className="btn btn-coral w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                >
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
