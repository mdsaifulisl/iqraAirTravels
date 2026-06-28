import axiosInstance from './axiosInstance';

/**
 * ১. নতুন টিকিট তৈরি (Create)
 * Multipart form data হ্যান্ডেল করবে
 */
export const createAirTicket = async (formData) => {
    try {
        const response = await axiosInstance.post('/airtickets', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * ২. সব টিকিট ফেচ করা (Get All)
 */
export const getAllAirTickets = async () => {
    try {
        const response = await axiosInstance.get('/airtickets');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * ৩. নির্দিষ্ট আইডি দিয়ে টিকিট পাওয়া (Get Single)
 */
export const getAirTicketById = async (id) => {
    try {
        const response = await axiosInstance.get(`/airtickets/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * ৪. টিকিট আপডেট করা (Update)
 */
export const updateAirTicket = async (id, formData) => {
    try {
        const response = await axiosInstance.put(`/airtickets/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * ৫. টিকিট ডিলিট করা (Delete)
 */
export const deleteAirTicket = async (id) => {
    try {
        const response = await axiosInstance.delete(`/airtickets/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};