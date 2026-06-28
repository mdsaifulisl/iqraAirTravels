import { useContext } from 'react';
import { AirTicketContext } from '../context/AirTicketContext'; 

/**
 * কাস্টম হুক: useAirTickets
 * এর মাধ্যমে কম্পোনেন্ট থেকে সরাসরি airTickets, loading, error, এবং deleteAirTicket এক্সেস করা যাবে।
 */
export const useAirTickets = () => {
    const context = useContext(AirTicketContext);

    // যদি হুকটি Provider এর বাইরে ব্যবহার করা হয় তবে এরর থ্রো করবে
    if (!context) {
        throw new Error('useAirTickets must be used within an AirTicketProvider');
    }

    return context;
};