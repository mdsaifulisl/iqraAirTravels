import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getAllVisas, deleteVisa as deleteVisaApi } from '../api/visaService';
import { toast } from 'react-hot-toast'; 

// eslint-disable-next-line react-refresh/only-export-components
export const VisaContext = createContext();

export const VisaProvider = ({ children }) => {
    const [visas, setVisas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ১. ডাটা ফেচ করার ফাংশন (useCallback ব্যবহার করা হয়েছে যাতে মেমোরি লিক না হয়)
    const fetchVisas = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllVisas();
            if (response.success) {
                setVisas(response.data);
            }
        } catch (err) {
            const errorMsg = err.response?.data?.error || "Failed to load visas";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    }, []);

    // ২. ভিসা ডিলিট করার গ্লোবাল ফাংশন
    const removeVisa = async (id) => {
        if (!window.confirm("Are you sure you want to delete this visa?")) return;
        
        try {
            const response = await deleteVisaApi(id);
            if (response.success) {
                setVisas((prev) => prev.filter((v) => v.id !== id));
                toast.success("Visa deleted successfully");
            }
        } catch (err) {
            toast.error(err.response?.data?.error || "Delete failed");
        }
    };

    // অ্যাপ লোড হওয়ার সময় ডাটা নিয়ে আসা
    useEffect(() => {
        fetchVisas();
    }, [fetchVisas]);

    // কনটেক্সট ভ্যালু শেয়ার করা
    const value = {
        visas,
        loading,
        error,
        refreshVisas: fetchVisas,
        removeVisa
    };

    

    return (
        <VisaContext.Provider value={value}>
            {children}
        </VisaContext.Provider>
    );
};

export default VisaContext;