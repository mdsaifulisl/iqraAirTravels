import React, { createContext, useState, useEffect } from 'react';
import { 
    getAllAirTickets, 
    deleteAirTicket as deleteAirTicketApi 
} from '../api/airTicketService';


// eslint-disable-next-line react-refresh/only-export-components
export const AirTicketContext = createContext();
export const AirTicketProvider = ({ children }) => {
    const [airTickets, setAirTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // ১. সব এয়ার টিকেট লোড করা (Fetch All)
    const fetchAirTickets = async () => {
        setLoading(true);
        try {
            const res = await getAllAirTickets();
            if (res.success) {
                setAirTickets(res.data);
                setError(null);
            }
        } catch (err) {
            setError(err.message || "data load failed");
        } finally {
            setLoading(false);
        }   
    };

    // ২. স্টেট থেকে এয়ার টিকেট ডিলিট করা (Delete)
    const deleteAirTicket = async (id) => {
        if (window.confirm("Are you sure you want to delete this ticket?")) {
            try {
                const res = await deleteAirTicketApi(id);
                if (res.success) {
                    // এপিআই ডিলিট সফল হলে স্টেট থেকেও সরিয়ে ফেলা
                    setAirTickets(prev => prev.filter(ticket => ticket.id !== id));
                    return { success: true, message: res.message };
                }
            } catch (err) {
                alert(err.message || "Failed to delete ticket");
                return { success: false };
            }
        }
    };

    useEffect(() => {
        fetchAirTickets();
    }, []);

    return (
        <AirTicketContext.Provider value={{ airTickets, loading, error, deleteAirTicket, }}>
            {children}
        </AirTicketContext.Provider>
    );
};

// export default AirTicketContext;

