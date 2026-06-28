import axiosInstance from './axiosInstance';

// ১. About ডেটা গেট করা
export const getAboutData = async () => {
  try {
    const response = await axiosInstance.get('/about');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to fetch About data");
  }
};

// ২. About ডেটা আপডেট/তৈরি করা (ইমেজসহ)
export const updateAboutData = async (formData) => {
  try {
    const response = await axiosInstance.put('/about', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to update About data");
  }
};