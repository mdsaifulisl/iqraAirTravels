import axiosInstance from './axiosInstance';

/**
 * Hero Slider Management Services
 */

// ১. সব স্লাইডার নিয়ে আসা
export const getAllSliders = async () => {
  try {
    const response = await axiosInstance.get('/sliders');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to fetch sliders");
  }
};

// ২. নির্দিষ্ট একটি স্লাইডার আইডি দিয়ে নিয়ে আসা (Edit এর জন্য)
export const getSliderById = async (id) => {
  try {
    const response = await axiosInstance.get(`/sliders/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to fetch slider details");
  }
};

// ৩. নতুন স্লাইডার তৈরি করা (FormData support for Image)
export const createSlider = async (sliderData) => {
  try {
    // sliderData অবশ্যই FormData অবজেক্ট হতে হবে
    const response = await axiosInstance.post('/sliders', sliderData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to create slider");
  }
};

// ৪. স্লাইডার আপডেট করা (UUID এবং FormData support)
export const updateSlider = async (id, sliderData) => {
  try {
    const response = await axiosInstance.put(`/sliders/${id}`, sliderData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to update slider");
  }
};

// ৫. স্লাইডার ডিলিট করা
export const deleteSlider = async (id) => {
  try {
    const response = await axiosInstance.delete(`/sliders/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to delete slider");
  }
};