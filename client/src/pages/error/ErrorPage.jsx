import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaExclamationTriangle, FaPlane } from 'react-icons/fa';



const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 text-center">
            
            {/* Animated Icon Section */}
            <div className="error-visual mb-5">
              <div className="plane-box">
                <FaPlane className="flying-plane" />
              </div>
              <h1 className="display-1 fw-bold text-teal mt-4">404</h1>
              <div className="error-divider mx-auto"></div>
            </div>

            {/* Error Message */}
            <div className="error-content">
              <h2 className="fw-bold mb-3 text-dark">Oops! Page Not Found</h2>
              <p className="text-secondary mb-5 px-md-5">
                The destination you are looking for doesn't exist or has been moved. 
                Don't worry, our travel guide can lead you back to safety.
              </p>

              {/* Action Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                
                <button onClick={() => navigate(-1)}  className="btn btn-outline-teal px-4 py-3 fw-bold d-flex align-items-center justify-content-center gap-2">
                  <FaExclamationTriangle /> Go Back 
                </button>

                <Link to="/" className="btn btn-coral px-4 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow">
                  <FaHome /> Back to Home
                </Link>
                
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;