import axiosInstance from './axiosInstance';

/**
 * ১. সব ডেস্টিনেশন গেট করা
 */
export const getAllDestinations = async () => {
    try {
        const response = await axiosInstance.get('/destinations');
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error("সব ডেস্টিনেশন লোড করতে সমস্যা হচ্ছে" + " " + error.message);
    }
};

/**
 * ২. আইডি দিয়ে নির্দিষ্ট ডেস্টিনেশন গেট করা
 */
export const getDestinationById = async (id) => {
    try {
        const response = await axiosInstance.get(`/destinations/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error("ডেস্টিনেশনটি খুঁজে পাওয়া যায়নি");
    }
};

/**
 * ৩. নতুন ডেস্টিনেশন তৈরি করা
 * (FormData ব্যবহারের সময় axiosInstance অটোমেটিক headers হ্যান্ডেল করবে)
 */
export const createDestination = async (destinationData) => {
    try {
        const response = await axiosInstance.post('/destinations', destinationData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error("ডেস্টিনেশন তৈরি করতে সমস্যা হয়েছে");
    }
};

/**
 * ৪. ডেস্টিনেশন আপডেট করা
 */
export const updateDestination = async (id, updatedData) => {
    try {
        const response = await axiosInstance.put(`/destinations/${id}`, updatedData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error("আপডেট করতে সমস্যা হয়েছে");
    }
};

/**
 * ৫. ডেস্টিনেশন ডিলিট করা
 */
export const deleteDestination = async (id) => {
    try {
        const response = await axiosInstance.delete(`/destinations/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error("ডিলিট করতে সমস্যা হয়েছে");
    }
};