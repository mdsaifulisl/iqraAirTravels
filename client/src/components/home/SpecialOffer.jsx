import React from 'react';

const SpecialOffer = () => {
  return (
    <section className="special-offer-section py-5">
      <div className="container">
        <div className="bg-light-coral rounded-4 p-5 overflow-hidden position-relative shadow">
          <div className="row align-items-center">
            <div className="col-lg-7 z-index-1">
              <h4 className="text-coral fw-bold mb-2">Limited Time Offer!</h4>
              <h2 className="display-4 fw-bold text-teal mb-3">Summer Special <br /> 30% Discount</h2>
              <p className="lead text-secondary-custom mb-4">
                Experience the Maldives like never before. Book your luxury water villa today and get exclusive perks.
              </p>
              <button className="btn btn-teal px-5 py-3 fw-bold shadow-lg">Grab This Deal Now</button>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
              <img 
                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62" 
                alt="Special Offer" 
                className="img-fluid rounded-3 shadow-lg rotate-3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;