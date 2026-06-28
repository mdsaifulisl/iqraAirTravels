import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import EnquiryForm from '../../components/shared/EnquiryForm';

const Contact = () => {
  const contactConfig = {
    phone: "+880 1234 567 890",
    email: "info@expertcoder.com",
    address: "House 12, Road 05, Sector 07, Uttara, Dhaka-1230",
    hours: "Sat - Thu: 10:00 AM - 07:00 PM",
  };

  return (
    <div className="contact-page pb-5 overflow-hidden">
      {/* Hero Header */}
      <section className="about-hero d-flex align-items-center justify-content-center text-center text-white mb-5" 
        style={{backgroundImage: `linear-gradient(rgba(0, 128, 128, 0.8), rgba(0, 128, 128, 0.8)), url('https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1200&q=80')`, height: '300px'}}>
        <div className="container">
          <h1 className="display-4 fw-bold">Contact Us</h1>
          <p className="lead">Have questions? We're here to help you plan your next journey.</p>
        </div>
      </section>

      <div className="container mt-n5">
        <div className="row g-5">
          {/* Contact Information */}
          <div className="col-lg-5">
            <div className="contact-info-card bg-white p-4 p-md-5 shadow-lg rounded-4 h-100 border-top border-coral border-5">
              <h2 className="fw-bold text-teal mb-4">Get In Touch</h2>
              <p className="text-secondary mb-5">
                Reach out to our expert team for visa assistance, tour packages, or any travel-related inquiries.
              </p>

              <div className="contact-methods d-flex flex-column gap-4">
                <div className="d-flex align-items-start gap-3">
                  <div className="icon-box bg-alice-blue p-3 rounded-circle text-coral">
                    <FaPhoneAlt size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Phone Number</h6>
                    <p className="text-secondary mb-0">{contactConfig.phone}</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="icon-box bg-alice-blue p-3 rounded-circle text-coral">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Email Address</h6>
                    <p className="text-secondary mb-0">{contactConfig.email}</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="icon-box bg-alice-blue p-3 rounded-circle text-coral">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Our Office</h6>
                    <p className="text-secondary mb-0">{contactConfig.address}</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="icon-box bg-alice-blue p-3 rounded-circle text-coral">
                    <FaClock size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Working Hours</h6>
                    <p className="text-secondary mb-0">{contactConfig.hours}</p>
                  </div>
                </div>
              </div>

              <hr className="my-5" />

              <h6 className="fw-bold text-teal mb-3">Follow Us</h6>
              <div className="d-flex gap-3">
                {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                  <a key={index} href="#" className="btn btn-teal rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="col-lg-7">
            <EnquiryForm 
              title="Send Us a Message" 
              subtitle="Fill out the form and our representative will get back to you within 24 hours." 
            />
          </div>
        </div>

        {/* Google Map Placeholder */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="map-container rounded-4 overflow-hidden shadow-sm" style={{height: '400px'}}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.4326550796856!2d90.39525281543163!3d23.87425199000147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c4377750790b%3A0x6b9075773177894!2sUttara%20Sector%207%20Park!5e0!3m2!1sen!2sbd!4v1647412345678!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;