import React from 'react';
import { FaGift, FaCheckCircle, FaArrowRight } from 'react-icons/fa';


const SpecialVacation = () => {
  return (
    <section className="special-vacation py-5">
      <div className="container">
        <div className="special-card-wrapper rounded-5 overflow-hidden shadow-lg border-0">
          <div className="row g-0 align-items-center">
            
            {/* Image Column */}
            <div className="col-lg-6 position-relative">
              <div className="offer-image">
                <img 
                  src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80" 
                  alt="Special Beach Vacation" 
                  className="img-fluid h-100 object-fit-cover"
                />
                {/* Discount Badge */}
                <div className="discount-tag animate-bounce">
                  <span className="fs-3 fw-bold">30%</span>
                  <span className="small">OFF</span>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="col-lg-6 bg-light-coral p-5 p-md-5">
              <div className="content-inner">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <FaGift className="text-coral fs-4" />
                  <span className="text-coral fw-bold text-uppercase ls-2">Exclusive Deal of the Month</span>
                </div>
                
                <h2 className="display-5 fw-bold text-teal mb-3">
                  Luxury Island Getaway <br /> 
                  <span className="text-dark">Special Package</span>
                </h2>
                
                <p className="lead text-secondary-custom mb-4">
                  Experience ultimate relaxation with our all-inclusive Maldives package. 
                  Includes private villa, snorkeling tours, and gourmet dining at a 30% discount.
                </p>

                <ul className="list-unstyled mb-4">
                  <li className="d-flex align-items-center gap-2 mb-2">
                    <FaCheckCircle className="text-teal" /> 
                    <span>5 nights in a Private Water Villa</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 mb-2">
                    <FaCheckCircle className="text-teal" /> 
                    <span>Round-trip Airport Transfers</span>
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <FaCheckCircle className="text-teal" /> 
                    <span>Daily Breakfast and Dinner Included</span>
                  </li>
                </ul>

                <div className="d-flex align-items-center gap-4 flex-wrap mt-5">
                  <button className="btn btn-coral px-4 py-2 fw-bold d-flex align-items-center gap-2">
                    Book This Offer <FaArrowRight />
                  </button>
                  <div className="price-tag">
                    <span className="text-muted text-decoration-line-through me-2">$2,500</span>
                    <span className="fs-3 fw-bold text-teal">$1,750</span>
                    <small className="text-secondary ms-1">/ Person</small>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialVacation;