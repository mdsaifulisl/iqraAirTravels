import React, { useState } from 'react';
import { FaGlobeAmericas, FaMapMarkedAlt, FaPlaneDeparture } from 'react-icons/fa';

const DesiredCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const countries = [
    "Thailand", "Maldives", "Switzerland", "Japan", 
    "Indonesia", "United Kingdom", "Turkey", "Vietnam"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if(selectedCountry) {
      alert(`You expressed interest in: ${selectedCountry}`);
    } else {
      alert("Please select a country first!");
    }
  };

  return (
    <section className="desired-vacation py-5 bg-alice-blue">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="selection-box bg-white p-4 p-md-5 rounded-4 shadow-sm border-teal-light">
              <div className="row align-items-center">
                
                {/* Text Content */}
                <div className="col-md-5 mb-4 mb-md-0">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <FaGlobeAmericas className="text-coral fs-4" />
                    <span className="text-coral fw-bold text-uppercase ls-1">Dream Destination</span>
                  </div>
                  <h2 className="text-teal fw-bold mb-3">Where Do You Want to Go Next?</h2>
                  <p className="text-secondary-custom">
                    Select your desired vacation country and let us find the best deals for you.
                  </p>
                </div>

                {/* Selection Form */}
                <div className="col-md-7">
                  <form onSubmit={handleSubmit} className="d-flex flex-column flex-sm-row gap-3">
                    <div className="flex-grow-1 position-relative">
                      <FaMapMarkedAlt className="select-icon text-teal" />
                      <select 
                        className="form-select custom-select-teal ps-5 py-3"
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                      >
                        <option value="" disabled>Choose a Country...</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>
                    <button type="submit" className="btn btn-coral px-4 py-3 fw-bold d-flex align-items-center justify-content-center gap-2">
                      <FaPlaneDeparture /> Express Interest
                    </button>
                  </form>
                  <p className="small text-muted mt-3 mb-0">
                    * Our travel experts will contact you with customized packages.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesiredCountry;