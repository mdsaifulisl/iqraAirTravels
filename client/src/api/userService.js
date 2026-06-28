import axiosInstance from './axiosInstance';

export const getAllUsers = async () => {
    const response = await axiosInstance.get('/users');
    return response.data;
};

export const getUserById = async (id) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
};

export const createUser = async (data) => {
    const response = await axiosInstance.post('/users', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};


export const updateUser = async (id, data) => {
    const response = await axiosInstance.put(`/users/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
};