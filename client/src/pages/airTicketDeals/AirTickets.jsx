import React from 'react';
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaSearch,
  FaTicketAlt,
} from "react-icons/fa";
import EnquiryForm from "../../components/shared/EnquiryForm";
import { useAirTickets } from "../../hooks/useAirTickets";
import useSetting from "../../hooks/useSetting";
import airports from "../../data/airports.json";


const AirTickets = () => {
  const { airTickets, loading, error } = useAirTickets();
  const { settings } = useSetting();

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

  const airTicketDeals = airTickets?.length > 0 ? airTickets : airTicketDealsDamodata;

  // user clicks "Book Now" for a deal

  const handleBooking = (fromAirportName, toAirportName) => {

    const fromAirport = airports.find((airport) => airport.name === fromAirportName);
    const toAirport = airports.find((airport) => airport.name === toAirportName);

    const dbTrackUrl =
      settings?.affiliateLink ||
      "https://www.trip.com/flights/Kuala%20Lumpur-to-Dhaka/tickets-KUL-DAC?flighttype=S&dcity=KUL&acity=DAC&Allianceid=7899074&SID=296372406&trip_sub1=&trip_sub3=D18363431&linkhub_token=sl_uO9kVSJTKV2";
    
    let allianceId = "7899074";
    let sid = "296372406";
    let tripSub3 = "D18363431";
    
    const fromCode = fromAirport?.code || "";
    const toCode = toAirport?.code || "";

    try {
      if (dbTrackUrl) {
        const urlObj = new URL(dbTrackUrl);
        allianceId = urlObj.searchParams.get("Allianceid") || urlObj.searchParams.get("AllianceID") || allianceId;
        sid = urlObj.searchParams.get("SID") || sid;
        tripSub3 = urlObj.searchParams.get("trip_sub3") || tripSub3;
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.error("Invalid URL in DB");
    }

    let affiliateUrl = `https://www.trip.com/flights/${fromCode}-to-${toCode}/tickets-${fromCode}-${toCode}?flighttype=S&dcity=${fromCode}&acity=${toCode}&Allianceid=${allianceId}&SID=${sid}&trip_sub1=&trip_sub3=${tripSub3}`;

    console.log("Redirecting to Affiliate URL: ", affiliateUrl);
    window.open(affiliateUrl, "_blank");
  };

  if (loading) return <div className="text-center p-5">Loading Tickets...</div>;
  if (error) return <div className="alert alert-danger m-4">Error: {error}</div>; 

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
                            style={{ textAlign: "center" }}
                          >
                            {deal.type || deal.trip_type}
                          </span>
                        </div>
                        {deal.airline && (
                          <p className="text-muted small mb-0">
                            Airline: {deal.airline}
                          </p>
                        )}
                        {deal.price && (
                          <h4 className="text-coral fw-bold mt-2 mb-0">
                            {deal.price}
                          </h4>
                        )}
                      </div>
                      <button onClick={() => handleBooking(deal.from, deal.to)} className="btn btn-teal rounded-pill px-4">
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