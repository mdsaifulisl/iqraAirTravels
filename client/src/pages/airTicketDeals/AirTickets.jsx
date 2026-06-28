// import React, { useState } from 'react';
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaSearch,
  FaTicketAlt,
} from "react-icons/fa";
import EnquiryForm from "../../components/shared/EnquiryForm";
import { useAirTickets } from "../../hooks/useAirTickets";

const AirTickets = () => {
  const { airTickets, loading, error } = useAirTickets();

  const airTicketDealsDamodata = [
    {
      id: 1,
      from: "Dhaka (DAC)",
      to: "Bangkok (BKK)",
      airline: "Thai Airways",
      price: "28,500 BDT",
      type: "Round Trip",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      from: "Dhaka (DAC)",
      to: "Dubai (DXB)",
      airline: "Emirates",
      price: "65,000 BDT",
      type: "One Way",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      from: "Dhaka (DAC)",
      to: "Singapore (SIN)",
      airline: "Singapore Airlines",
      price: "42,000 BDT",
      type: "Round Trip",
      image:
        "https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const airTicketDeals =
    airTickets.length > 0 ? airTickets : airTicketDealsDamodata;




    // your tikit.com affiliate tracking ID (replace with your actual ID)
  const AFFILIATE_ID = "your_tracking_id"; 

  // user clicks "Book Now" for a deal
  const handleBooking = (deal) => {
    // tikit.com search URL with query parameters for from, to, and affiliate tracking
    // উদাহরণ: https://tikit.com/search?from=DAC&to=DXB&ref=myid
    const baseUrl = "https://tikit.com/search";
    const queryParams = new URLSearchParams({
      from: deal.from.split('(')[1]?.replace(')', '') || deal.from, // only airport code (DAC)
      to: deal.to.split('(')[1]?.replace(')', '') || deal.to,     // only airport code (BKK)
      ref: AFFILIATE_ID,
      utm_source: "expert_travel"
    });

    const finalUrl = `${baseUrl}?${queryParams.toString()}`;
    
    // open the tikit.com search results in a new tab
    window.open(finalUrl, "_blank", "noopener,noreferrer");
  };


  if (loading) return <div className="text-center p-5">Loading Tickets...</div>;
  if (error)
    return <div className="alert alert-danger m-4">Error: {error}</div>; 



  return (
    <div className="air-tickets-page pb-5">
      {/* Hero Header */}
      <section
        className="about-hero d-flex align-items-center justify-content-center text-center text-white mb-5"
        style={{
          backgroundImage: `linear-gradient(rgba(13, 129, 129, 0.7), rgba(171, 204, 204, 0.7)), url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80')`,
          height: "350px",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">Book Your Flight</h1>
          <p className="lead">
            Get the best deals on international and domestic air tickets
          </p>
        </div>
      </section>

      <div className="container mt-n5">
        <div className="row g-4">
          {/* Main Content: Flight Deals */}
          <div className="col-lg-8">
            <div className="bg-white p-4 shadow-sm rounded-4 mb-5 border-top border-teal border-4">
              <h4 className="fw-bold text-teal mb-4 d-flex align-items-center gap-2">
                <FaTicketAlt className="text-coral" /> Special Flight Deals
              </h4>

              <div className="row g-4">
                {airTicketDeals.map((deal) => (
                  <div className="col-12" key={deal.id}>
                    <div className="flight-deal-card p-3 border rounded-4 d-flex flex-column flex-md-row align-items-center gap-4 transition-all hover-shadow">
                      <img
                        src={deal.image}
                        alt={deal.to}
                        className="rounded-3"
                        style={{
                          width: "120px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="flex-grow-1">
                        <div className="d-flex flex-wrap justify-content-center justify-content-md-between align-items-center text-center mb-2 gap-2 gap-md-0">
                          <h5 className="fw-bold text-dark mb-0">
                            {deal.from}{" "}
                            <FaPlaneDeparture className="mx-2 text-teal small" />{" "}
                            {deal.to}
                          </h5>
                          <span
                            className="badge bg-alice-blue text-teal"
                            style={{ textAlign: "certer" }}
                          >
                            {deal.trip_type}
                          </span>
                        </div>
                        <p className="text-muted small mb-0">
                          Airline: {deal.airline}
                        </p>
                        <h4 className="text-coral fw-bold mt-2 mb-0">
                          {deal.price}
                        </h4>
                      </div>
                      <button onClick={() => handleBooking(deal)} className="btn btn-teal rounded-pill px-4">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Information Area */}
            <div className="info-section p-4 bg-light rounded-4">
              <h5 className="fw-bold text-teal mb-3">
                Why Book With Expert Travel?
              </h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <p className="small text-secondary">
                    ✅ Instant Confirmation & E-Ticket
                  </p>
                  <p className="small text-secondary">
                    ✅ 24/7 Dedicated Support Team
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="small text-secondary">
                    ✅ No Hidden Booking Charges
                  </p>
                  <p className="small text-secondary">
                    ✅ Easy Refund & Re-issue Policy
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Form */}
          <div className="col-lg-4">
            <EnquiryForm
              title="Request a Quote"
              subtitle="Send us your travel dates and destination, and we will find the cheapest fare for you."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirTickets;


