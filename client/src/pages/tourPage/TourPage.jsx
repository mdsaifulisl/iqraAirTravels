import React, { useState } from 'react';
import { FaHistory } from 'react-icons/fa';
import TourCard from '../../components/shared/TourCard';
import Filter from '../../components/shared/Filter'; 
// import TourJsonData from '../../data/tours.json';
// const tourList = TourJsonData;
import { useTours } from '../../hooks/useTours'; // গ্লোবাল রিফ্রেশের জন্য

const TourPage = () => {
  const { tours } = useTours(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");


  const uniqueCategories = ["All", ...new Set(tours.map(item => item.category))];


  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tour.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="tour-page pb-5">
      {/* Hero Header */}
      <section className="about-hero d-flex align-items-center justify-content-center text-center text-white mb-5" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 128, 128, 0.8), rgba(0, 128, 128, 0.8)), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80')`, 
          height: '300px'
        }}>
        <div className="container">
          <h1 className="display-4 fw-bold">Explore Our Tours</h1>
          <p className="lead">Find your next adventure with Expert-Coder Travel</p>
        </div>
      </section>

      <div className="container">
        <div className="row g-4">
          
          {/* Left Side: Reusable Filter Component */}
          <div className="col-lg-3">
            <Filter 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={uniqueCategories}
              fullList={tours}
              categoryKey="category" 
              title="Plan Your Trip"
            />
          </div>

          {/* Right Side: Results Grid */}
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold text-teal mb-0">
                {selectedCategory === "All" ? "Featured Tours" : `${selectedCategory} Packages`}
              </h4>
              <span className="text-secondary small">Found {filteredTours.length} results</span>
            </div>

            <div className="row">
              {filteredTours.length > 0 ? (
                <TourCard tourData={filteredTours} />
              ) : (
                <div className="col-12 text-center py-5">
                  <FaHistory size={50} className="text-muted opacity-25 mb-3" />
                  <h5 className="text-muted">No tours found matching your search.</h5>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TourPage;