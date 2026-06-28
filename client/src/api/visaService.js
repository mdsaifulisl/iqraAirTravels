import axiosInstance from './axiosInstance';

/**
 * Visa Management API Services
 * Author: Md. Saiful Islam
 */

// ১. সব ভিসা পাওয়ার জন্য
export const getAllVisas = async () => {
    const response = await axiosInstance.get('/visas');
    return response.data;
};



// ২. নির্দিষ্ট একটি ভিসা পাওয়ার জন্য
export const getVisaById = async (id) => {
    const response = await axiosInstance.get(`/visas/${id}`);
    return response.data;
};


// ৩. নতুন ভিসা তৈরি (FormData এর মাধ্যমে)
export const createVisa = async (formData) => {
    const response = await axiosInstance.post('/visas', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// ৪. ভিসা আপডেট (FormData এর মাধ্যমে)
export const updateVisa = async (id, formData) => {
    const response = await axiosInstance.put(`/visas/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// ৫. ভিসা ডিলিট করার জন্য
export const deleteVisa = async (id) => {
    const response = await axiosInstance.delete(`/visas/${id}`);
    return response.data;
};