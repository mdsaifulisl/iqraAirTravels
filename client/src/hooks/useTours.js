import { useContext } from 'react';
import { TourContext } from '../context/TourContext';

export const useTours = () => {
    const context = useContext(TourContext);

    
    if (!context) {
        throw new Error("useTours অবশ্যই TourProvider এর ভেতরে ব্যবহার করতে হবে");
    }

    return context;
};
