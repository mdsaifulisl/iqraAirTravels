import axiosInstance from './axiosInstance';

/**
 * Contact Service API
 */

// new message create (Public)
export const sendContactMessage = async (contactData) => {
  try {
    // contactData = { name, email, phone, message }
    const response = await axiosInstance.post('/contacts', contactData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to send message");
  }
};

// get all messages (for admin panel)
export const getAllMessages = async () => {
  try {
    const response = await axiosInstance.get('/contacts');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to fetch messages");
  }
};

// get single message (for admin panel)
export const getMessageById = async (id) => {
  try {
    const response = await axiosInstance.get(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to fetch message");
  }
};

// update message status (for admin panel)
export const updateMessageStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(`/contacts/${id}`, { status });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to update status");
  }
};

// delete message (for admin panel)
export const deleteMessage = async (id) => {
  try {
    const response = await axiosInstance.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to delete message");
  }
};