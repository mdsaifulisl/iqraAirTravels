import React, { createContext, useState, useEffect } from 'react';
import { 
    getAllDestinations, 
    deleteDestination as deleteDestApi 
} from '../api/destinationService';

const DestinationContext = createContext(); 

export const DestinationProvider = ({ children }) => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ১. সব ডেস্টিনেশন লোড করা (Fetch All)
    const fetchDestinations = async () => {
        setLoading(true);
        try {
            const res = await getAllDestinations();
            if (res.success) {
                setDestinations(res.data);
                setError(null);
            }
        } catch (err) {
            setError(err.message || "ডেটা লোড করতে সমস্যা হচ্ছে");
        } finally {
            setLoading(false);
        }
    };

    // ২. স্টেট থেকে ডেস্টিনেশন ডিলিট করা (Delete)
    const removeDestination = async (id) => {
        if (window.confirm("আপনি কি নিশ্চিত যে এটি ডিলিট করতে চান?")) {
            try {
                const res = await deleteDestApi(id);
                if (res.success) {
                    // এপিআই ডিলিট সফল হলে স্টেট থেকেও সরিয়ে ফেলা
                    setDestinations(prev => prev.filter(dest => dest.id !== id));
                    return { success: true, message: res.message };
                }
            } catch (err) {
                alert(err.message || "ডিলিট করা সম্ভব হয়নি");
                return { success: false };
            }
        }
    };

    // অ্যাপ লোড হওয়ার সময় একবার ডেটা নিয়ে আসা
    useEffect(() => {
        fetchDestinations();
    }, []);

    return (
        <DestinationContext.Provider value={{ 
            destinations, 
            loading, 
            error, 
            fetchDestinations, 
            removeDestination 
        }}>
            {children}
        </DestinationContext.Provider>
    );
};

export { DestinationContext };