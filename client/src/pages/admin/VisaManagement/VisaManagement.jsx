import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaPassport, FaClock, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import FilterBar from "../../../components/shared/FilterBar";
import VisaData from "../../../data/visa.json";
import useVisas from "../../../hooks/useVisas";
import { deleteVisa } from "../../../api/visaService";

const VisaManagement = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { visas, refreshVisas, loading } = useVisas();
  // আপনার JSON স্ট্রাকচার অনুযায়ী ডাটা
  // const [visas, setVisas] = useState();
  console.log("VisaManagement visas:", visas); 

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const continents = ["Asia", "Europe", "Middle East", "America", "Africa"];

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this visa service?")) {
      // এখানে আপনার ডিলিট API কল করুন
       await deleteVisa(id);
      // তারপর ডাটা রিফ্রেশ করুন
      refreshVisas();
    }
  };

  const filteredVisas = visas.filter(visa => {
    const matchesSearch = visa.country.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          visa.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || visa.continent === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Header */}
      <div className="d-flex flex-column  justify-content-between flex-md-row align-items-md-center mb-4 gap-3">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: "var(--primary-teal)" }}>Visa Management</h3>
          <p className="text-muted small mb-0">Manage visa requirements and application details</p>
        </div>
        <div>
          <Link to="/admin/add-visa" className="btn shadow-sm px-4 py-2 rounded-pill fw-bold text-white" 
          style={{ backgroundColor: "var(--primary-teal)" }}>
          <FaPlus className="me-2" /> Add New Visa
        </Link>
        </div>
      </div>

      {/* FilterBar */}
      <FilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={continents}
        placeholder="Search country or title..."
      />

      {/* Table Section */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ backgroundColor: "var(--accent-alice-blue)" }}>
              <tr>
                <th className="ps-4 py-3 text-secondary small text-uppercase">Country & Image</th>
                <th className="py-3 text-secondary small text-uppercase">Type & Entry</th>
                <th className="py-3 text-secondary small text-uppercase">Validity/Processing</th>
                <th className="py-3 text-secondary small text-uppercase">Fee</th>
                <th className="py-3 text-secondary small text-uppercase text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisas.map((visa) => (
                <tr key={visa.id}>
                  <td className="ps-4">
                    <div className="d-flex align-items-center gap-3">
                      <img 
                        src={visa.images[0]} 
                        alt={visa.country}
                        className="rounded-3 border shadow-sm"
                        style={{ width: "60px", height: "45px", objectFit: "cover" }}
                      />
                      <div>
                        <h6 className="mb-0 fw-bold text-dark">{visa.country}</h6>
                        <small className="text-muted d-flex align-items-center gap-1">
                          <FaMapMarkerAlt size={10} style={{color: 'var(--secondary-coral)'}} /> {visa.continent}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="small fw-bold">{visa.type}</div>
                    <span className="badge rounded-pill bg-light text-teal border px-2 py-1 mt-1" style={{fontSize: '10px', color: 'var(--primary-teal)'}}>
                      {visa.entry}
                    </span>
                  </td>
                  <td>
                    <div className="small text-dark mb-1"><FaCalendarAlt className="me-1 text-muted" size={12} /> {visa.validity}</div>
                    <div className="small text-muted"><FaClock className="me-1" size={12} /> {visa.duration}</div>
                  </td>
                  <td className="fw-bold" style={{ color: "var(--primary-teal)" }}>{visa.fee}</td>
                  <td className="text-end pe-4">
                    <div className="d-flex justify-content-end gap-2">
                      <button onClick={() => navigate(`/admin/edit-visa/${visa.id}`)} className="btn btn-sm btn-light text-teal shadow-sm border rounded-3" title="Edit">
                        <FaEdit style={{ color: "var(--primary-teal)" }} />
                      </button>
                      <button onClick={() => handleDelete(visa.id)} className="btn btn-sm btn-light text-coral shadow-sm border rounded-3" title="Delete">
                        <FaTrash style={{ color: "var(--secondary-coral)" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredVisas.length === 0 && (
            <div className="text-center py-5 text-muted">No visa services found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisaManagement;