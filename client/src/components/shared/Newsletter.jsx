import React, { useState } from "react";
import { FaPaperPlane, FaEnvelopeOpenText } from "react-icons/fa";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <section className="newsletter-section py-5">
      <div className="container">
        <div className="newsletter-wrapper bg-alice-blue p-4 p-md-5 rounded-4 shadow-sm">
          <div className="row align-items-center">
            {/* Left Side: Content */}
            <div className="col-lg-6 mb-4 mb-lg-0 text-center text-lg-start">
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3 mb-3">
                <div className="icon-box-coral">
                  <FaEnvelopeOpenText />
                </div>
                <h6 className="text-coral fw-bold mb-0 text-uppercase ls-1">
                  Stay Updated
                </h6>
              </div>
              <h2 className="display-6 fw-bold text-teal mb-3">
                Join Our Newsletter
              </h2>
              <p className="text-secondary-custom mb-0">
                Subscribe to get the latest travel deals, destination guides,
                and exclusive offers directly in your inbox.
              </p>
            </div>

            {/* Right Side: Form */}
            <div className="col-lg-6">
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <div className="input-group d-flex flex-column flex-sm-row gap-2 gap-sm-0">
                  <input
                    type="email"
                    className="form-control custom-input-teal py-3 px-4"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    className="btn btn-coral-subscribe px-4 py-3 py-sm-0"
                    type="submit"
                  >
                    <FaPaperPlane className="me-2" /> Subscribe
                  </button>
                </div>
                <p className="small text-muted mt-3 mb-0 text-center text-lg-start">
                  * We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
