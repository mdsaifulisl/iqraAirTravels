import React from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const Filter = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  categories, 
  fullList, 
  categoryKey, 
  title = "Find Destination"
}) => {
  return (
    <div className="filter-sidebar p-4 bg-white shadow-sm rounded-4 position-sticky" style={{ top: '100px' }}>
      <h5 className="fw-bold text-teal mb-4">{title}</h5>
      
      
      <div className="input-group mb-4 search-box border rounded-pill overflow-hidden bg-alice-blue">
        <span className="input-group-text bg-transparent border-0">
          <FaSearch className="text-muted" />
        </span>
        <input 
          type="text" 
          className="form-control border-0 shadow-none ps-0 bg-transparent" 
          placeholder="Search here..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category List Filter */}
      <div className="d-none d-lg-block">
        <h6 className="fw-bold text-secondary mb-3">Filter by Category</h6>
        <div className="country-list d-flex flex-column gap-2">
          {categories.map((cat, index) => (
            <button 
              key={index}
              className={`btn text-start d-flex justify-content-between align-items-center py-2 px-3 rounded-3 transition-all ${
                selectedCategory === cat ? 'bg-teal text-white hover-bg-teal hover:text-teal' : 'bg-alice-blue text-dark'
              }`}
              onClick={() => setSelectedCategory(cat)}
              style={{ hover: { backgroundColor: 'var(--primary-teal)' } }}
            >
              <span><FaMapMarkerAlt className={`me-2 small ${selectedCategory === cat ? 'text-white' : 'text-teal'}`} /> {cat? cat : 'Others'}</span>
              <span className={`badge rounded-pill ${selectedCategory === cat ? 'bg-white text-teal' : 'bg-teal text-white'}`}>
                {cat === "All" 
                  ? fullList.length 
                  : fullList.filter(item => item[categoryKey] === cat).length
                }
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;