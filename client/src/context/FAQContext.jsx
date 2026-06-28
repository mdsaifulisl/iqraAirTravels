import React, { createContext, useState, useEffect } from "react";
import { getAllFAQs, deleteFAQ as deleteFAQService } from "../api/faqService";


// eslint-disable-next-line react-refresh/only-export-components
export const FAQContext = createContext();

export const FAQProvider = ({ children }) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);

  // সব FAQ লোড করা
  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const res = await getAllFAQs();
      if (res.success) {
        setFaqs(res.data);
      }
    } catch (err) {
      console.error("FAQ Load Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // FAQ delete function
  const removeFAQ = async (id) => {
  
  const isConfirmed = window.confirm("Are you sure you want to delete this FAQ?");

  if (isConfirmed) {
    try {
      // ২. এপিআই কল
      const res = await deleteFAQService(id);

      if (res.success) {
        setFaqs((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(res.message || "Failed to delete FAQ");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert("An error occurred while deleting the FAQ.");
    }
  }
};

  useEffect(() => {
    fetchFAQs();
  }, []);

  return (
    <FAQContext.Provider value={{ faqs, loading, fetchFAQs, removeFAQ }}>
      {children}
    </FAQContext.Provider>
  );
};

