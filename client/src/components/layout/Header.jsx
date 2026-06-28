import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaBars,
  FaTimes,
  FaPlane,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaSignOutAlt,
} from "react-icons/fa";
import "../../assets/style/header.css";
import useSetting from "../../hooks/useSetting";
import { useAuth } from "../../hooks/useAuth";



const Header = () => {
  const { user, logout } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [showTopHeader, setShowTopHeader] = useState(true);

  const { settings } = useSetting(); 

  const handleLogout = async () => {
    
    await logout();
    window.location.reload();
  };

  // মেনু আইটেমগুলো এক জায়গায় রাখা হলো
const navLinks = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
  { name: "Tours", path: "/tours" },
  { name: "Visa Service", path: "/visa-service" },
  { name: "Air Tickets", path: "/air-tickets" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  // যদি user থাকে, তবেই এই অবজেক্টটি অ্যারেতে ঢুকবে
  ...(user ? [{ name: "Admin", path: "/admin" }] : []),
];

  useEffect(() => {
    const handleScroll = () => {
      setShowTopHeader(window.scrollY <= 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>

      <Helmet>
        <title>{settings?.siteName || "Expert Travel"}</title>
        {settings?.siteFavicon && (
          <link rel="icon" type="image/png" href={settings?.siteFavicon || "/vite.svg"} />
        )}
      </Helmet>

      {/* Top Header */}
      <div
        className={`top-header ${!showTopHeader ? "hide-top" : ""} d-none d-lg-block`}
      >
        <div className="container d-flex justify-content-between align-items-center h-100">
          <div className="top-left d-flex gap-4">
            <span className="d-flex align-items-center gap-1">
              <FaEnvelope className="top-icon" /> {settings?.siteEmail || "info@expertcoder.com"}
            </span>
            <span className="d-flex align-items-center gap-1">
              <FaPhoneAlt className="top-icon" /> +88 {settings?.phone || "0123456789"}
            </span>
          </div>
          <div className="top-right d-flex gap-3">
            <a className="text-teal" target="_blank" rel="noopener noreferrer" href={settings?.facebook || "#"}><FaFacebookF className="social-icon" /></a>
            <a className="text-teal" target="_blank" rel="noopener noreferrer" href={settings?.twitter || "#"}><FaTwitter className="social-icon" /></a>
            <a className="text-teal" target="_blank" rel="noopener noreferrer" href={settings?.instagram || "#"}><FaInstagram className="social-icon" /></a>
            
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="main-header shadow-sm">
        <div className="container d-flex justify-content-between align-items-center h-100">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-text">
              <img
                className="img-fluid"
                src={settings?.siteLogo}
                alt={settings?.siteName || "Logo"}
                style={{
                  height: "40px", 
                  width: "auto", 
                  objectFit: "contain",
                  borderRadius: "5px",
                }}
              />
            </span>
          </Link>

          {/* Navigation Menu */}
          <nav className={`nav-menu ${isMobile ? "mobile-show" : ""}`}>
            <div className="mobile-drawer-header d-lg-none">
              <div className="logo">
                
                <span className="logo-text text-white">
                  <img
                className="img-fluid"
                src={settings?.siteLogo}
                alt={settings?.siteName || "Logo"}
                style={{
                  height: "30px", 
                  width: "auto", 
                  objectFit: "contain",
                  borderRadius: "5px",
                }}
              />
                </span>
              </div>
              <button className="close-btn" onClick={() => setIsMobile(false)}>
                <FaTimes />
              </button>
            </div>

            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className="nav-item"
                onClick={() => setIsMobile(false)}
              >
                {link.name}
              </NavLink>
            ))}

            {user ? (
              <button
          
              className="nav-item d-block d-lg-none text-danger border-0 p-1 left-0"
              onClick={handleLogout}
            >
              Logout
            </button>
            ):(
              <NavLink
              to="/login"
              className="nav-item d-block d-lg-none"
              onClick={() => setIsMobile(false)}
            >
              Login
            </NavLink>
            )}
            
          </nav>

          {/* Right Actions */}
          <div className="header-actions d-flex align-items-center">
            {user ? (
              <button 
              onClick={handleLogout}
              className="login-link d-none d-lg-flex align-items-center gap-1 border-0 "
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
              
            ) : (
              <Link
              to="/login"
              className="login-link d-none d-lg-flex align-items-center gap-1"
            >
              <FaUser />
              <span>Login</span>
            </Link>
            )}
            

            <button
              className="mobile-toggle-btn d-lg-none border-0 bg-transparent"
              onClick={() => setIsMobile(true)}
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`menu-overlay ${isMobile ? "active" : ""}`}
        onClick={() => setIsMobile(false)}
      ></div>
    </>
  );
};

export default Header;
