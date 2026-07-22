import React, { useState } from "react";
import { FaHeadset } from "react-icons/fa";
import { sendContactMessage } from "../../api/contactService";
import useSetting from "../../hooks/useSetting";

const EnquiryForm = ({ title = "Enquire Now", subtitle = "Fill out the form below, and our expert will contact you shortly." }) => {
  const { settings } = useSetting();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // HTML Tag / Script মুছে ফেলার ফাংশন (XSS Protection)
  const sanitizeInput = (text) => {
    return text.replace(/<[^>]*>?/gm, "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // HTML ট্যাগ রিমুভ করা
    let cleanedValue = sanitizeInput(value);

    // ফোন নম্বরের জন্য শুধু সংখ্যা, প্লাস (+) এবং হাইফেন ডাইনামিক ফিল্টার
    if (name === "phone") {
      cleanedValue = cleanedValue.replace(/[^0-9+-]/g, "");
    }

    setFormData({ ...formData, [name]: cleanedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const message = formData.message.trim();
    const email = formData.email.trim();

    if (!name || !phone || !message) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // ব্যাকএন্ডে পাঠানোর আগে ক্লিন ডাটা অবজেক্ট
    const cleanData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      message: sanitizeInput(message),
    };

    try {
      const response = await sendContactMessage(cleanData);
      setMsg(response.message);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setLoading(false);
      setMsg("");
    }, 1500);
  };

  return (
    <div className="card border-0 shadow-lg rounded-4 p-4 sticky-top bg-white" style={{ top: "100px" }}>
      <h4 className="fw-bold text-teal mb-3">{title}</h4>
      <p className="small text-muted mb-4">{subtitle}</p>

      <form onSubmit={handleSubmit}>
        {msg && <div className="alert alert-success">{msg}</div>}

        {/* Name Input */}
        <div className="mb-3">
          <input
            name="name"
            type="text"
            maxLength={50}
            className="form-control bg-light border-0 py-3"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* Email Input */}
        <div className="mb-3">
          <input
            name="email"
            type="email"
            maxLength={80}
            className="form-control bg-light border-0 py-3"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Phone Input */}
        <div className="mb-3">
          <input
            name="phone"
            type="tel"
            maxLength={15}
            className="form-control bg-light border-0 py-3"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        {/* Message Input */}
        <div className="mb-4">
          <textarea
            name="message"
            maxLength={500}
            className="form-control bg-light border-0 py-3"
            rows="3"
            placeholder="Message (Max 500 chars)"
            required
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
          <div className="text-end text-muted mt-1" style={{ fontSize: "11px" }}>
            {formData.message.length}/500
          </div>
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
          <FaHeadset className="me-2" /> {settings?.phone || "Phone number not available"}
        </h5>
      </div>
    </div>
  );
};

export default EnquiryForm;