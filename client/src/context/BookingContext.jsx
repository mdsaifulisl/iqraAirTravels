/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { 
    getAllBookings, 
    createBooking as createBookingApi,
    deleteBooking as deleteBookingApi,
    updateBookingStatus as updateBookingStatusApi 
} from '../api/bookingService';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const clearStatus = () => {
        setMessage(null);
        setError(null);
    };

    // message বা error সেট হলে ৫ সেকেন্ড পর অটো-ক্লিয়ার হবে
    useEffect(() => {
        if (message || error) {
            const timer = setTimeout(() => {
                clearStatus();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message, error]);

    const fetchBookings = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        setLoading(true);
        try {
            const response = await getAllBookings();
            setBookings(response.data || response);
            setError(null);
        } catch (err) {
            setError(err.error || err.message || "বুকিং লোড করতে সমস্যা হয়েছে");
        } finally {
            setLoading(false);
        }
    }, []);

    const createBooking = async (bookingData) => {
        clearStatus();
        try {
            const response = await createBookingApi(bookingData);
            const newBooking = response.data || response;
            const successMsg = response.message || response.data?.message || "বুকিং সফলভাবে জমা হয়েছে!";

            setBookings((prev) => [newBooking, ...prev]);
            setMessage(successMsg);
            setError(null);

            return { 
                success: true, 
                message: successMsg,
                data: newBooking 
            };
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || "বুকিং জমা দিতে সমস্যা হয়েছে";
            console.error("Create booking context error:", err);
            setError(errorMsg);
            setMessage(null);

            return { 
                success: false, 
                message: errorMsg 
            };
        }
    };

    const changeBookingStatus = async (id, status) => {
        clearStatus();
        try {
            await updateBookingStatusApi(id, status);
            const successMsg = "স্ট্যাটাস পরিবর্তন সফল হয়েছে";

            setBookings((prev) =>
                prev.map((item) => ((item._id || item.id) === id ? { ...item, status } : item))
            );
            setMessage(successMsg);
            setError(null);

            return { success: true, message: successMsg };
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || "স্ট্যাটাস আপডেট ব্যর্থ হয়েছে";
            setError(errorMsg);
            setMessage(null);

            return { 
                success: false, 
                message: errorMsg 
            };
        }
    };

    const removeBooking = async (id) => {
        clearStatus();
        try {
            await deleteBookingApi(id);
            const successMsg = "ডিলিট সফল হয়েছে";

            setBookings((prev) => prev.filter((booking) => (booking._id || booking.id) !== id));
            setMessage(successMsg);
            setError(null);

            return { success: true, message: successMsg };
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || "ডিলিট করতে সমস্যা হয়েছে";
            setError(errorMsg);
            setMessage(null);

            return { 
                success: false, 
                message: errorMsg 
            };
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchBookings();
        }
    }, [fetchBookings]);

    return (
        <BookingContext.Provider 
            value={{ 
                bookings, 
                loading, 
                error, 
                message, 
                setMessage, 
                setError,
                clearStatus, 
                fetchBookings, 
                createBooking,
                changeBookingStatus, 
                removeBooking 
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};