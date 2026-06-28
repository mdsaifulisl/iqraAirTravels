import axiosInstance from './axiosInstance';

// all tours get
export const getAllTours = async () => {
    const response = await axiosInstance.get('/tours');
    return response.data;
};

// create new tour (with image upload)
export const createTour = async (formData) => {
    const response = await axiosInstance.post('/tours', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', 
        },
    });
    return response.data;
};

// update tour (with image upload)
export const updateTour = async (id, formData) => {
    const response = await axiosInstance.put(`/tours/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// delete tour
export const deleteTour = async (id) => {
    const response = await axiosInstance.delete(`/tours/${id}`);
    return response.data;
}; 

// get tour by id
export const getTourById = async (id) => {
    const response = await axiosInstance.get(`/tours/${id}`);
    return response.data;
};

