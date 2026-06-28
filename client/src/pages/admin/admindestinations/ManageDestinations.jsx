import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaMapMarkerAlt, FaStar, FaClock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import FilterBar from "../../../components/shared/FilterBar";
import useDestinations from "../../../hooks/useDestinations";

const ManageDestinations = () => {
  const navigate = useNavigate();
  
  // Context থেকে রিয়েল ডাটা এবং ডিলিট ফাংশন নিয়ে আসা
  const { destinations, loading, error, removeDestination } = useDestinations();

  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ফিল্টারের জন্য ইউনিক লোকেশন বের করা (রিয়েল ডাটা থেকে)
  const uniqueLocations = [...new Set(destinations.map(d => d.location))];

  // ফিল্টার লজিক
  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = 
      dest.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      dest.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || dest.location === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="text-center p-5">Loading Destinations...</div>;
  if (error) return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <div className="animate__animated animate__fadeIn pb-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: "var(--primary-teal)" }}>Manage Destinations</h3>
          <p className="text-muted small mb-0">Total {destinations.length} destinations found</p>
        </div>
        <div>
          <Link to="/admin/add-destination" className="btn shadow-sm px-4 py-2 rounded-pill fw-bold text-white" 
            style={{ backgroundColor: "var(--primary-teal)" }}>
            <FaPlus className="me-2" /> Add New Spot
          </Link>
        </div>
      </div>

      {/* Search & Filter */}
      <FilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={uniqueLocations}
        placeholder="Search by title or country..."
      />

      {/* Table Data */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ backgroundColor: "var(--accent-alice-blue)" }}>
              <tr>
                <th className="ps-4 py-3 text-secondary small text-uppercase">Destination</th>
                <th className="py-3 text-secondary small text-uppercase">Highlights</th>
                <th className="py-3 text-secondary small text-uppercase">Duration & Rating</th>
                <th className="py-3 text-secondary small text-uppercase">Price</th>
                <th className="py-3 text-secondary small text-uppercase text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDestinations.length > 0 ? (
                filteredDestinations.map((dest) => (
                  <tr key={dest.id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center gap-3">
                        <img 
                          src={dest.images?.[0] || 'https://via.placeholder.com/60x45'} 
                          alt={dest.title} 
                          className="rounded-3 shadow-sm" 
                          style={{ width: "60px", height: "45px", objectFit: "cover" }} 
                        />
                        <div>
                          <h6 className="mb-0 fw-bold text-dark">{dest.title}</h6>
                          <small className="text-muted d-flex align-items-center gap-1">
                            <FaMapMarkerAlt size={10} style={{color: 'var(--secondary-coral)'}} /> {dest.location}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {dest.highlights && dest.highlights.slice(0, 2).map((h, i) => (
                          <span key={i} className="badge bg-light text-dark border-0 small fw-normal" style={{fontSize: '10px'}}>
                            {h}
                          </span>
                        ))}
                        {dest.highlights?.length > 2 && <span className="small text-muted">+{dest.highlights.length - 2}</span>}
                      </div>
                    </td>
                    <td>
                      <div className="small text-dark mb-1"><FaClock className="me-1 text-muted" size={12} /> {dest.duration}</div>
                      <div className="small text-warning"><FaStar className="me-1" size={12} /> {dest.rating}</div>
                    </td>
                    <td className="fw-bold" style={{ color: "var(--primary-teal)" }}>{dest.price}</td>
                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end gap-2">
                        <button onClick={() => navigate(`/admin/edit-destination/${dest.id}`)} className="btn btn-sm btn-light border rounded-3 shadow-sm">
                          <FaEdit style={{ color: "var(--primary-teal)" }} />
                        </button>
                        <button onClick={() => removeDestination(dest.id)} className="btn btn-sm btn-light border rounded-3 shadow-sm">
                          <FaTrash style={{ color: "var(--secondary-coral)" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">No destinations found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageDestinations;