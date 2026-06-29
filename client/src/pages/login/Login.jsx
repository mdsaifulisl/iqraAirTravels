import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaPlane, FaEye, FaEyeSlash, FaKey } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, message, sendOtp, verifyOtp, resetPassword } = useAuth();

  // Forgot Password Modal States
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1); 
  const [resetData, setResetData] = useState({ email: '', otp: '', newPassword: '' });
  const [modalError, setModalError] = useState('');
  const [modalSuccess, setModalSuccess] = useState('');
  const [modalLoading, setModalLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(formData.email, formData.password);
    if (response.success) {
      window.location.href = '/admin';
    }
  };

  // Forgot Password Flow Handlers
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setModalError('');
    setModalSuccess('');
    setModalLoading(true);

    const response = await sendOtp(resetData.email);
    setModalLoading(false);

    if (response.success) {
      setModalSuccess(response.message);
      setTimeout(() => {
        setModalSuccess('');
        setModalStep(2);
      }, 1500);
    } else {
      setModalError(response.message);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setModalError('');
    setModalSuccess('');
    setModalLoading(true);

    const response = await verifyOtp(resetData.email, resetData.otp);
    setModalLoading(false);

    if (response.success) {
      setModalSuccess(response.message);
      setTimeout(() => {
        setModalSuccess('');
        setModalStep(3);
      }, 1500);
    } else {
      setModalError(response.message);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setModalError('');
    setModalSuccess('');
    setModalLoading(true);

    const response = await resetPassword(resetData.email, resetData.otp, resetData.newPassword);
    setModalLoading(false);

    if (response.success) {
      setModalSuccess("পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!");
      setTimeout(() => {
        setShowModal(false);
        setModalStep(1);
        setResetData({ email: '', otp: '', newPassword: '' });
        setModalSuccess('');
      }, 2000);
    } else {
      setModalError(response.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalStep(1);
    setModalError('');
    setModalSuccess('');
    setResetData({ email: '', otp: '', newPassword: '' });
  };

  return (
    <div className="login-wrapper py-5 d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '90vh' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-11 col-lg-10">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="row g-0">
                
                {/* Left Side: Travel Banner Image */}
                <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center bg-teal text-white p-5 position-relative" 
                     style={{ 
                       backgroundImage: 'linear-gradient(rgba(0, 128, 128, 0.85), rgba(0, 128, 128, 0.85)), url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80")', 
                       backgroundSize: 'cover', 
                       backgroundPosition: 'center' 
                     }}>
                  <div className="text-center z-1">
                    <FaPlane className="text-white mb-3" style={{ fontSize: '3.5rem' }} />
                    <h2 className="fw-bold mb-3">Explore the World With Us</h2>
                    <p className="lead small opacity-75">Discover incredible places, manage your bookings, and track your travel history seamlessly.</p>
                  </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="col-md-6 bg-white">
                  <div className="card-body p-5">
                    
                    {/* Logo & Header */}
                    <div className="text-center mb-4">
                      <div className="login-logo-circle bg-alice-blue d-inline-flex align-items-center justify-content-center mb-3">
                        <FaPlane className="text-teal fs-2" />
                      </div>
                      <h3 className="fw-bold text-teal">Welcome Back!</h3>
                      <p className="text-muted small">Login to access your travel dashboard</p>
                    </div>

                    <form onSubmit={handleLogin}>
                      {message && <div className="alert alert-danger py-2 small">{message}</div>}
                      
                      {/* Email Input */}
                      <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary">Email Address</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-0"><FaEnvelope className="text-muted" /></span>
                          <input 
                            type="email" 
                            className="form-control bg-light border-0 py-2" 
                            placeholder="example@mail.com"
                            required
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      {/* Password Input */}
                      <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary">Password</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-0"><FaLock className="text-muted" /></span>
                          <input 
                            type={showPassword ? "text" : "password"} 
                            className="form-control bg-light border-0 py-2" 
                            placeholder="••••••••"
                            required
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                          />
                          <button 
                            type="button" 
                            className="input-group-text bg-light border-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <div className="d-flex justify-content-end align-items-center mb-4">
                        
                        <button 
                          type="button" 
                          onClick={() => { setShowModal(true); setModalStep(1); }} 
                          className="btn btn-link p-0 text-coral text-decoration-none small fw-bold border-0 bg-transparent"
                        >
                          Forgot Password?
                        </button>
                      </div>

                      <button type="submit" className="btn btn-teal w-100 py-2 rounded-pill fw-bold shadow-sm mb-4">
                        Sign In
                      </button>
                    </form>

                    <div className="position-relative mb-4 text-center">
                      <hr />
                      <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 small text-muted">Or continue with</span>
                    </div>

                    <p className="text-center small mb-0">
                      Don't have an account? <span to="/register" className="text-coral fw-bold text-decoration-none">Create Account</span>
                    </p>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow rounded-4">
              <div className="modal-header border-0 pt-4 px-4 pb-0">
                <h5 className="modal-title fw-bold text-teal">
                  {modalStep === 1 && "Reset Password"}
                  {modalStep === 2 && "Verify OTP"}
                  {modalStep === 3 && "Setup New Password"}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body p-4">
                
                {/* Modal Alerts */}
                {modalError && <div className="alert alert-danger py-2 small">{modalError}</div>}
                {modalSuccess && <div className="alert alert-success py-2 small">{modalSuccess}</div>}
                
                {/* Step 1: Input Email */}
                {modalStep === 1 && (
                  <form onSubmit={handleEmailSubmit}>
                    <p className="text-muted small mb-3">Enter your registered email address below and we'll send you an OTP code.</p>
                    <div className="mb-4">
                      <label className="form-label small fw-bold text-secondary">Email Address</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0"><FaEnvelope className="text-muted" /></span>
                        <input 
                          type="email" 
                          className="form-control bg-light border-0 py-2" 
                          placeholder="example@mail.com" 
                          required 
                          value={resetData.email}
                          onChange={(e) => setResetData({...resetData, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-teal w-100 py-2 rounded-pill fw-bold" disabled={modalLoading}>
                      {modalLoading ? "Sending..." : "Send OTP"}
                    </button>
                  </form>
                )}

                {/* Step 2: Input OTP */}
                {modalStep === 2 && (
                  <form onSubmit={handleOtpSubmit}>
                    <p className="text-muted small mb-3">An OTP code has been sent to <strong>{resetData.email}</strong>. Please enter the code to verify.</p>
                    <div className="mb-4">
                      <label className="form-label small fw-bold text-secondary">Enter OTP Code</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0"><FaKey className="text-muted" /></span>
                        <input 
                          type="text" 
                          className="form-control bg-light border-0 py-2 text-center fw-bold" 
                          placeholder="123456" 
                          maxLength="6"
                          required 
                          value={resetData.otp}
                          onChange={(e) => setResetData({...resetData, otp: e.target.value})}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-teal w-100 py-2 rounded-pill fw-bold" disabled={modalLoading}>
                      {modalLoading ? "Verifying..." : "Verify Code"}
                    </button>
                    <button type="button" className="btn btn-link w-100 text-muted small mt-2 text-decoration-none" onClick={() => setModalStep(1)}>Back to Email</button>
                  </form>
                )}

                {/* Step 3: Setup New Password */}
                {modalStep === 3 && (
                  <form onSubmit={handlePasswordReset}>
                    <p className="text-muted small mb-3">Your verification is successful. Please enter your new secure password.</p>
                    <div className="mb-4">
                      <label className="form-label small fw-bold text-secondary">New Password</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0"><FaLock className="text-muted" /></span>
                        <input 
                          type={showNewPassword ? "text" : "password"} 
                          className="form-control bg-light border-0 py-2" 
                          placeholder="••••••••" 
                          required 
                          value={resetData.newPassword}
                          onChange={(e) => setResetData({...resetData, newPassword: e.target.value})}
                        />
                        <button 
                          type="button" 
                          className="input-group-text bg-light border-0"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-teal w-100 py-2 rounded-pill fw-bold" disabled={modalLoading}>
                      {modalLoading ? "Saving..." : "Save & Update"}
                    </button>
                  </form>
                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;