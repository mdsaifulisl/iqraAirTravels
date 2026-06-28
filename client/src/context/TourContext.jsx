/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getAllTours, deleteTour as deleteTourApi } from '../api/tourService';

export const TourContext = createContext();

export const TourProvider = ({ children }) => { 
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ডেটা লোড করার ফাংশন (useCallback ব্যবহার করা হয়েছে পারফরম্যান্সের জন্য)
    const fetchTours = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllTours();
            setTours(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "loading tours problems");
        } finally {
            setLoading(false);
        }
    }, []);

    // ট্যুর ডিলিট করার পর স্টেট আপডেট করা
    const removeTour = async (id) => {
        try {
            await deleteTourApi(id);
            // ডাটাবেজ থেকে ডিলিট হওয়ার পর লোকাল স্টেট থেকেও ফিল্টার করে সরিয়ে দেওয়া
            setTours((prev) => prev.filter((tour) => tour.id !== id));
            return { success: true, message: "ডিলিট সফল হয়েছে" };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    useEffect(() => {
        fetchTours();
    }, [fetchTours]);

    return (
        <TourContext.Provider value={{ tours, loading, error, fetchTours, removeTour }}>
            {children}
        </TourContext.Provider>
    );
};