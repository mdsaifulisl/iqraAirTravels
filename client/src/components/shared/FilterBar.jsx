import React from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

const FilterBar = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  categories = [], 
  placeholder = "Search..." 
}) => {
  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4 p-3 p-md-4" style={{ backgroundColor: "var(--white)" }}>
      <div className="row g-3 align-items-center">
        {/* Search Input */}
        <div className="col-12 col-md-6 col-lg-5">
          <div className="input-group">
            <span className="input-group-text bg-light border-0 text-muted">
              <FaSearch />
            </span>
            <input 
              type="text" 
              className="form-control bg-light border-0 shadow-none" 
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="col-12 col-sm-6 col-md-3 col-lg-3">
          <div className="input-group">
            <span className="input-group-text bg-light border-0 text-muted">
              <FaFilter size={12} />
            </span>
            <select 
              className="form-select bg-light border-0 shadow-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filter Button */}
        {(searchTerm || selectedCategory !== "All") && (
          <div className="col-12 col-sm-auto ms-lg-auto">
            <button 
              className="btn btn-link text-decoration-none p-0 small fw-bold" 
              style={{ color: "var(--secondary-coral)" }}
              onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;