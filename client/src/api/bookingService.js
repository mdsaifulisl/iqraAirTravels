import axiosInstance from './axiosInstance';

// ১. Get all bookings
export const getAllBookings = async () => {
    const response = await axiosInstance.get('/bookings');
    return response.data;
};

// ২. Create new booking (with document upload)
export const createBooking = async (formData) => {
    const response = await axiosInstance.post('/bookings', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// ৩. Get booking by ID
export const getBookingById = async (id) => {
    const response = await axiosInstance.get(`/bookings/${id}`);
    return response.data;
};

// ৪. Update booking (with document upload)
export const updateBooking = async (id, formData) => {
    const response = await axiosInstance.put(`/bookings/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// ৫. Update booking status only (Pending / Confirmed / Cancelled)
export const updateBookingStatus = async (id, status) => {
    const response = await axiosInstance.patch(`/bookings/${id}/status`, { status });
    return response.data;
};

// ৬. Delete booking
export const deleteBooking = async (id) => {
    const response = await axiosInstance.delete(`/bookings/${id}`);
    return response.data;
};