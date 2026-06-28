/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import { getAllSliders, deleteSlider } from '../api/sliderService';


export const SliderContext = createContext();

export const SliderProvider = ({ children }) => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(false); 

  // 1. Fetch all sliders from API
  const fetchSliders = async () => {
    setLoading(true);
    try {
      const res = await getAllSliders();
      if (res.success) {
        setSliders(res.data);
      }
    } catch (err) {
      console.error("Error fetching sliders:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Remove slider using window.confirm (No toast/HTML)
  const removeSlider = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this slider?");
    if (isConfirmed) {
      try {
        const res = await deleteSlider(id);
        if (res.success) {
          // Update local state after successful deletion
          setSliders((prev) => prev.filter((item) => item.id !== id));
          console.log("Slider deleted successfully");
        }
      } catch (err) {
        console.error("Delete failed:", err.message);
        alert("Failed to delete slider. Please try again.");
      }
    };
    
  };

  // Initial data load on mount
  useEffect(() => {
    fetchSliders();
  }, []);

  return (
    <SliderContext.Provider
      value={{
        sliders,
        setSliders,
        loading,
        fetchSliders,
        removeSlider,
      }}
    >
      {children}
    </SliderContext.Provider>
  );
};
