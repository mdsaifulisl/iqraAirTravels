import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaMapMarkerAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import FilterBar from "../../../components/shared/FilterBar";
import { useTours } from "../../../hooks/useTours"; 

const ManageTours = () => {
  const navigate = useNavigate();
  
  // ১. হুক থেকে গ্লোবাল স্টেট এবং ফাংশনগুলো নিয়ে আসা
  const { tours, loading, error, removeTour } = useTours();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ক্যাটাগরি লিস্ট (আপনার ব্যাকএন্ড ক্যাটাগরি অনুযায়ী আপডেট করতে পারেন)
  const categoriesList = ["Adventure", "City Tour", "Honeymoon", "International", "Domestic"];

  // ২. ডিলিট হ্যান্ডলার যা কনটেক্সটের removeTour ফাংশন ব্যবহার করবে
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      const result = await removeTour(id);
      if (result.success) {
        // ডিলিট সফল হলে মেসেজ দিতে পারেন (অপশনাল)
        console.log(result.message);
      } else {
        alert(result.message);
      }
    }
  };

  // ৩. ফিল্টারিং লজিক (রিয়েল ডাটার উপর ভিত্তি করে)
  const filteredTours = tours.filter((tour) => {
    const matchesSearch = 
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || tour.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // ৪. লোডিং এবং এরর স্টেট হ্যান্ডলিং
  if (loading) return <div className="text-center py-5">Loading Tours...</div>;
  if (error) return <div className="text-center py-5 text-danger">Error: {error}</div>;

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: "var(--primary-teal)" }}>Tour Management</h3>
          <p className="text-muted small mb-0">Showing {filteredTours.length} of {tours.length} packages</p>
        </div>
        <div>
          <Link to="/admin/add-tour" className="btn shadow-sm px-4 py-2 rounded-pill fw-bold text-white" 
            style={{ backgroundColor: "var(--primary-teal)" }}>
            <FaPlus className="me-2" /> Add New Package
          </Link>
        </div>
      </div>

      {/* Filter Component */}
      <FilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categoriesList}
      />

      {/* Table Card */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ backgroundColor: "var(--accent-alice-blue)" }}>
              <tr>
                <th className="ps-4 py-3 text-secondary small text-uppercase">Package Details</th>
                <th className="py-3 text-secondary small text-uppercase">Category</th>
                <th className="py-3 text-secondary small text-uppercase">Duration</th>
                <th className="py-3 text-secondary small text-uppercase">Price</th>
                <th className="py-3 text-secondary small text-uppercase text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.length > 0 ? (
                filteredTours.map((tour) => (
                  <tr key={tour._id}> {/* MongoDB ব্যবহার করলে tour._id হবে */}
                    <td className="ps-4">
                      <div className="d-flex align-items-center gap-3">
                        <img 
                          // ব্যাকএন্ড ইমেজ পাথ (Static Folder Setup অনুযায়ী)
                          src={tour.images && tour.images.length > 0 
                               ? `${tour.images[0]}` 
                               : "https://via.placeholder.com/60x45"} 
                          alt={tour.title} 
                          className="rounded-3 shadow-sm" 
                          style={{ width: "60px", height: "45px", objectFit: "cover" }} 
                        />
                        <div>
                          <h6 className="mb-0 fw-bold text-dark">{tour.title}</h6>
                          <small className="text-muted d-flex align-items-center gap-1">
                            <FaMapMarkerAlt style={{color: 'var(--secondary-coral)'}} /> {tour.location}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge rounded-pill bg-light border px-3 py-2 fw-medium" style={{color: 'var(--primary-teal)'}}>
                        {tour.category}
                      </span>
                    </td>
                    <td className="small text-muted">{tour.duration}</td>
                    <td className="fw-bold" style={{ color: "var(--primary-teal)" }}>${tour.price}</td>
                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end gap-2">
                        {/* Edit Route এ নিয়ে যাওয়া */}
                        <button onClick={() => navigate(`/admin/edit-tour/${tour.id}`)} className="btn btn-sm btn-light text-teal shadow-sm border rounded-3">
                          <FaEdit style={{ color: "var(--primary-teal)" }} />
                        </button>
                        {/* Delete Function Call */}
                        <button onClick={() => handleDelete(tour.id)} className="btn btn-sm btn-light text-coral shadow-sm border rounded-3">
                          <FaTrash style={{ color: "var(--secondary-coral)" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    No packages found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTours;