import axiosInstance from './axiosInstance';

// ১. সব FAQ নিয়ে আসা
export const getAllFAQs = async () => {
  try {
    const response = await axiosInstance.get('/faqs');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to fetch FAQs");
  }
};

// ২. আইডি দিয়ে একটি FAQ নিয়ে আসা
export const getFAQById = async (id) => {
  try {
    const response = await axiosInstance.get(`/faqs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to fetch FAQ");
  }
};

// ৩. নতুন FAQ তৈরি করা
export const createFAQ = async (faqData) => {
  try {
    const response = await axiosInstance.post('/faqs', faqData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to create FAQ");
  }
};

// ৪. FAQ আপডেট করা
export const updateFAQ = async (id, faqData) => {
  try {
    const response = await axiosInstance.put(`/faqs/${id}`, faqData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to update FAQ");
  }
};

// ৫. FAQ ডিলিট করা
export const deleteFAQ = async (id) => {
  try {
    const response = await axiosInstance.delete(`/faqs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to delete FAQ");
  }
};