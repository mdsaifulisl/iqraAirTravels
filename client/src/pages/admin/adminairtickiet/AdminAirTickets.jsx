/* eslint-disable react-hooks/exhaustive-deps */
 

import React, { useState, useEffect } from "react";
import { 
  FaPlaneDeparture, 
  FaPlus, 
  FaTicketAlt, 
  FaTrash, 
  FaEdit, 
  FaSearch 
} from "react-icons/fa";
import { Link } from "react-router-dom"; 
import { useAirTickets } from "../../../hooks/useAirTickets"; 

const AdminAirTickets = () => {
  const { airTickets, loading, error, deleteAirTicket } = useAirTickets(); 
  
  // ফিল্টার করা ডাটা রাখার জন্য লোকাল স্টেট
  const [displayTickets, setDisplayTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All Types");

  // ১. যখনই মূল airTickets পরিবর্তন হবে, লোকাল স্টেট আপডেট হবে
  useEffect(() => {
    applyFilters(searchTerm, filterType);
  }, [airTickets]);

  // ২. ফিল্টার লজিক (Search + Dropdown)
  const applyFilters = (search, type) => {
    let filtered = airTickets.filter((ticket) => {
      const matchesSearch = 
        ticket.from.toLowerCase().includes(search.toLowerCase()) ||
        ticket.to.toLowerCase().includes(search.toLowerCase()) ||
        ticket.airline.toLowerCase().includes(search.toLowerCase());
      
      const matchesType = type === "All Types" || ticket.trip_type === type;
      
      return matchesSearch && matchesType;
    });
    setDisplayTickets(filtered);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    applyFilters(value, filterType);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setFilterType(value);
    applyFilters(searchTerm, value);
  };

  if (loading) return <div className="text-center p-5">Loading Tickets...</div>;
  if (error) return <div className="alert alert-danger m-4">Error: {error}</div>;

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Header Section */}
      <div className="d-flex justify-content-between flex-wrap align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: "var(--primary-teal)" }}>Air Tickets</h3>
          <p className="text-muted small">Manage flight routes, airlines, and pricing</p>
        </div>
        <Link to="/admin/add-air-ticket" className="btn text-white px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2" 
                style={{ backgroundColor: "var(--primary-teal)" }}>
          <FaPlus /> Add New Ticket
        </Link>
      </div>

      <div className="row g-4">
        {/* Search & Filter Bar */}
        <div className="col-12">
          <div className="card border-0 shadow-sm rounded-4 p-3">
            <div className="d-flex gap-2">
              <div className="input-group flex-grow-1 bg-light rounded-3 px-3 align-items-center">
                <FaSearch className="text-muted" />
                <input 
                  onChange={handleSearch} 
                  type="text" 
                  className="form-control bg-transparent border-0 shadow-none py-2" 
                  placeholder="Search by route or airline..." 
                />
              </div>
              <select 
                onChange={handleTypeChange}
                defaultValue="All Types" 
                className="form-select w-auto border-0 bg-light rounded-3 shadow-none fw-bold small"
              >
                <option value="All Types">All Types</option>
                <option value="One Way">One Way</option>
                <option value="Round Trip">Round Trip</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="col-12">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="px-4 py-3 border-0 small fw-bold text-muted">FLIGHT ROUTE</th>
                    <th className="py-3 border-0 small fw-bold text-muted">AIRLINE</th>
                    <th className="py-3 border-0 small fw-bold text-muted">TYPE</th>
                    <th className="py-3 border-0 small fw-bold text-muted">PRICE</th>
                    <th className="px-4 py-3 border-0 small fw-bold text-muted text-end">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {displayTickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td className="px-4 py-3 border-0">
                        <div className="d-flex align-items-center gap-3">
                          <img src={ticket.image} alt="Route" className="rounded-3 shadow-sm" style={{ width: "50px", height: "40px", objectFit: "cover" }} />
                          <div>
                            <div className="fw-bold d-flex align-items-center gap-1 small">
                              {ticket.from} <FaPlaneDeparture className="text-teal mx-1" size={12}/> {ticket.to}
                            </div>
                            <span className="text-muted" style={{ fontSize: "11px" }}>ID: {ticket.id.slice(0, 8)}...</span>
                          </div>
                        </div>
                      </td>
                      <td className="border-0">
                        <span className="fw-semibold text-dark small">{ticket.airline}</span>
                      </td>
                      <td className="border-0">
                        <span className="badge rounded-pill px-3 py-2 bg-info-subtle text-info" style={{ fontSize: "10px" }}>
                          {ticket.trip_type}
                        </span>
                      </td>
                      <td className="border-0">
                        <span className="fw-bold text-success">৳ {ticket.price}</span>
                      </td>
                      <td className="px-4 py-3 border-0 text-end">
                        <Link to={`/admin/edit-air-ticket/${ticket.id}`} className="btn btn-sm btn-light border shadow-sm me-2 rounded-circle">
                          <FaEdit className="text-primary" />
                        </Link>
                        <button 
                          onClick={() => deleteAirTicket(ticket.id)} 
                          className="btn btn-sm btn-light border shadow-sm rounded-circle"
                        >
                          <FaTrash className="text-danger" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {displayTickets.length === 0 && (
              <div className="text-center py-5">
                <FaTicketAlt size={40} className="text-light mb-2" />
                <p className="text-muted">No tickets found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAirTickets;