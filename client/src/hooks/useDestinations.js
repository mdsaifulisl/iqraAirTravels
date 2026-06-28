import { useContext } from 'react';
import { DestinationContext } from '../context/DestinationContext';


const useDestinations = () => {
    const context = useContext(DestinationContext);

    // যদি প্রোভাইডারের বাইরে এই হুক ব্যবহার করা হয় তবে এরর দিবে
    if (!context) {
        throw new Error("useDestinations must be used within a DestinationProvider");
    }

    return context;
};

export default useDestinations;