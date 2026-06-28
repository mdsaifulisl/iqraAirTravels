import React from "react";
import { Link } from "react-router-dom";
import {
  FaPlane,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowRight,
  FaWhatsapp,
} from "react-icons/fa";
import useSetting from "../../hooks/useSetting";

const Footer = () => {
 

  const { settings } = useSetting();

  return (
    <footer className="main-footer">
      <div className="container footer-top section-padding px-5 px-md-0">
        <div className="row g-4">
          {/* Column 1: About & Logo */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-about">
              <Link to="/" className="logo mb-3 d-inline-flex">
                <span className="logo-text text-white ms-2">
                  <img
                className="img-fluid"
                src={settings?.siteLogo}
                alt={settings?.siteName || "Logo"}
                style={{
                  height: "50px", 
                  width: "auto",
                  objectFit: "contain",
                  borderRadius: "5px",
                }}
              />
                </span>
              </Link>
              <p className="text-light-gray mt-3">
                {
                  settings?.metaDescription || " We are dedicated to making your travel dreams come true. Explore the world with our premium and affordable tour packages tailored just for you. "
                }
                
              </p>
              <div className="social-links d-flex gap-2 mt-4">
                {/* Facebook */}
                <a
                  href={settings?.facebook || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="social-box"
                >
                  <FaFacebookF />
                </a>

                {/* Instagram */}
                <a
                  href={settings?.instagram || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="social-box"
                >
                  <FaInstagram />
                </a>

                {/* LinkedIn */}
                <a
                  href={settings?.linkedin || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="social-box"
                >
                  <FaLinkedinIn />
                </a>

                {/* WhatsApp (নাম্বার থাকলে শো করবে) */}
                {settings?.whatsapp && (
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="social-box"
                  >
                    <FaWhatsapp />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="footer-title text-white">Quick Links</h5>
            <ul className="footer-links list-unstyled">
              <li>
                <Link to="/about">
                  <FaArrowRight className="link-icon" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/destinations">
                  <FaArrowRight className="link-icon" /> Destinations
                </Link>
              </li>
              <li>
                <Link to="/tours">
                  <FaArrowRight className="link-icon" /> Latest Tours
                </Link>
              </li>
              <li>
                <Link to="/blog">
                  <FaArrowRight className="link-icon" /> Travel Blog
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <FaArrowRight className="link-icon" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="col-lg-2 col-md-6">
            <h5 className="footer-title text-white">Our Services</h5>
            <ul className="footer-links list-unstyled">
              <li>
                <Link to="/air-tickets">
                  <FaArrowRight className="link-icon" /> Air Tickets
                </Link>
              </li>
              <li>
                <Link to="/visa-service">
                  <FaArrowRight className="link-icon" /> Visa Assistance
                </Link>
              </li>
              <li>
                <Link to="/hotels">
                  <FaArrowRight className="link-icon" /> Hotel Booking
                </Link>
              </li>
              <li>
                <Link to="/tours">
                  <FaArrowRight className="link-icon" /> Tour Packages
                </Link>
              </li>
              <li>
                <Link to="/insurance">
                  <FaArrowRight className="link-icon" /> Travel Insurance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="col-lg-4 col-md-6">
            <h5 className="footer-title text-white">Contact Info</h5>
            <div className="contact-info">
              <div className="d-flex align-items-start gap-3 mb-3">
                <FaMapMarkerAlt className="info-icon mt-1" />
                <p className="text-light-gray mb-0">
                  {settings?.address || "Dhaka, Bangladesh"}
                </p>
              </div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <FaPhoneAlt className="info-icon" />
                <p className="text-light-gray mb-0">+88 {settings?.phone || "1234567890"}</p>
              </div>
              <div className="d-flex align-items-center gap-3">
                <FaEnvelope className="info-icon" />
                <p className="text-light-gray mb-0">{settings?.siteEmail || "qBxkV@example.com"}</p>
              </div>
            </div>
            {/* Payment Methods (Placeholder) */}
            {/* <div className="payment-methods mt-4">
              <h6 className="text-white small fw-bold mb-2">We Accept:</h6>
              <img
                src="https://i.ibb.co/9vM7mK3/payment-gateways.png"
                alt="Payment Methods"
                className="img-fluid"
                style={{ maxWidth: "200px", filter: "brightness(0) invert(1)" }}
              />
            </div> */}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom py-3">
        <div className="container text-center">
          <p className="mb-0 text-light-gray small">
           {settings?.footerText || " All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
