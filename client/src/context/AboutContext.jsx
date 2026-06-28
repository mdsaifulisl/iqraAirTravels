import React, { createContext, useState, useEffect } from 'react';
import { getAboutData, updateAboutData } from '../api/aboutService';
import { toast } from 'react-hot-toast';

// eslint-disable-next-line react-refresh/only-export-components
export const AboutContext = createContext();

export const AboutProvider = ({ children }) => {
  const [aboutContent, setAboutContent] = useState({
    id: null,
    title: "",
    description: "",
    experience: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [ massage, setMassage ] = useState("");

  // ডেটা লোড করা
  const fetchAbout = async () => {
    setLoading(true);
    try {
      const res = await getAboutData();
      if (res.success && res.data) {
        setAboutContent(res.data);
      }
    } catch (err) {
      console.error("About data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ডেটা সেভ করা
  const saveAbout = async (formData) => {
    try {
      const res = await updateAboutData(formData);
      if (res.success) {
        setAboutContent(res.data); 
        setMassage(res.message || "About section updated successfully!");

        setTimeout(() => {          
          setMassage("");
        }, 5000);
        return res;
      }
    } catch (err) {
      toast.error(err.message || "Update failed!");
      setMassage("");
      throw err;
    }
  }; 

  useEffect(() => {
    fetchAbout();
  }, []);

  return (
    <AboutContext.Provider value={{ aboutContent, setAboutContent, loading, fetchAbout, saveAbout, massage, setMassage }}>
      {children}
    </AboutContext.Provider>
  );
};

