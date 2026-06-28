import axiosInstance from './axiosInstance';

export const getSettings = async () => {
    const response = await axiosInstance.get('/settings');
    return response.data; 
};

export const updateSettings = async (formData) => {
    const response = await axiosInstance.put('/settings/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

