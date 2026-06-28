import React, { useState } from 'react';
import { FaClock, FaMoneyBillWave, FaArrowRight, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import VisaServiceCard from '../../components/shared/VisaServiceCard';
import Filter from '../../components/shared/Filter';
// import '../../assets/style/details.css';


import VisaJsonData from "../../data/visa.json"; 
// api data fetching hook
import useVisas from "../../hooks/useVisas";



const VisaService = () => {

  const { visas, loading } = useVisas();
  


  const visaList = visas.length > 0 ? visas : VisaJsonData; // API থেকে ডাটা না এলে লোকাল JSON ডাটা ব্যবহার করবে
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");


  const uniqueCountries = ["All", ...new Set(visaList.map(item => item.country))];

  // ২. সার্চ এবং কান্ট্রি ক্লিক অনুযায়ী ফিল্টার লজিক
  const filteredVisas = visaList.filter(visa => {
    const matchesSearch = visa.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === "All" || visa.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <div className="spinner-border text-teal" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="visa-page pb-5">
      {/* Header Section */}
      <section className="about-hero d-flex align-items-center justify-content-center text-center text-white mb-5" 
        style={{backgroundImage: `linear-gradient(rgba(0, 128, 128, 0.8), rgba(0, 128, 128, 0.8)), url('https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1200&q=80')`}}>
        <div className="container">
          <h1 className="display-4 fw-bold">Visa Assistance</h1>
          <p className="lead">Search and filter to find the right visa service for you</p>
        </div>
      </section>

      <div className="container">
        <div className="row g-4">
          
          {/* Left Side: Filter & Search Area */}
          <div className="col-lg-3">


            <Filter 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCountry}
              setSelectedCategory={setSelectedCountry}
              categories={uniqueCountries}
              fullList={visaList}
              categoryKey="country"
              title="Find Your visa"
            />

          </div>

          {/* Right Side: Visa Cards Result */}
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold text-teal mb-0">
                {selectedCountry === "All" ? "All Services" : `${selectedCountry} Visa Services`}
              </h4>
              <span className="text-secondary small">Found {filteredVisas.length} Services</span>
            </div>

            <div className="row g-4">
              {filteredVisas.length > 0 ? (
                filteredVisas.map((visa) => (
                  <div className="col-md-6 col-xl-4" key={visa.id}>
                    <VisaServiceCard visa={visa} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <h5 className="text-muted">No services found for "{searchTerm}"</h5>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VisaService;