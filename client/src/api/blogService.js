import axiosInstance from './axiosInstance';

/**
 * Blog Management API Services
 * Author: Md. Saiful Islam
 */

// all blogs fetch
export const getAllBlogs = async () => {
  try {
    const response = await axiosInstance.get('/blogs');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

// single blog fetch
export const getBlogById = async (id) => {
  try {
    const response = await axiosInstance.get(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

// new blog create
export const createBlog = async (formData) => {
  try {
    
    const response = await axiosInstance.post('/blogs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to create blog");
  }
};

// update blog with or without new images
export const updateBlog = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`/blogs/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to update blog");
  }
};

// delete blog by id
export const deleteBlog = async (id) => {
  try {
    const response = await axiosInstance.delete(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Failed to delete blog");
  }
};