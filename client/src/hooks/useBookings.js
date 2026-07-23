import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';

export const useBookings = () => {
    const context = useContext(BookingContext);

    if (!context) {
        throw new Error("useBookings অবশ্যই BookingProvider এর ভেতরে ব্যবহার করতে হবে");
    }

    return context;
};