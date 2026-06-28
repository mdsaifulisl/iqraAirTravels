// create inbox 

import React, { useState } from "react";
import { FaHeadset } from "react-icons/fa";
import { sendContactMessage } from "../../api/contactService";


const EnquiryForm = ({ title = "Enquire Now", subtitle = "Fill out the form below, and our expert will contact you shortly." }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [ msg, setMsg ] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.phone || !formData.message) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await sendContactMessage(formData);
      setMsg(response.message);
      // toast.success(response.message);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
      setLoading(false);
      return;
    }

    
    setTimeout(() => {
      console.log("Submitted Data:", formData);
      // alert("Inquiry Sent Successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setLoading(false);
      setMsg("");
    }, 1500);
  };

  return (
    <div className="card border-0 shadow-lg rounded-4 p-4 sticky-top" style={{ top: "100px" }}>
      <h4 className="fw-bold text-teal mb-3">{title}</h4>
      <p className="small text-muted mb-4">{subtitle}</p>

      <form onSubmit={handleSubmit}>
          {msg && <div className="alert alert-success">{msg}</div>}
        <div className="mb-3">
          <input
            name="name"
            type="text"
            className="form-control bg-light border-0 py-3"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <input
            name="email"
            type="email"
            className="form-control bg-light border-0 py-3"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <input
            name="phone"
            type="tel"
            className="form-control bg-light border-0 py-3"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <textarea
            name="message"
            className="form-control bg-light border-0 py-3"
            rows="3"
            placeholder="Message"
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-coral w-100 py-3 rounded-pill fw-bold shadow-sm transition-all"
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm me-2"></span>
          ) : (
            "Send Inquiry"
          )}
        </button>
      </form>

      <hr className="my-4" />

      <div className="text-center">
        <p className="small text-muted mb-2">Or call for instant support</p>
        <h5 className="text-teal fw-bold">
          <FaHeadset className="me-2" /> +880 1234 567 890
        </h5>
      </div>
    </div>
  );
};

export default EnquiryForm;