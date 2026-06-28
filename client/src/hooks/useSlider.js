import { useContext } from 'react';
import { SliderContext } from '../context/SliderContext';

const useSlider = () => {
    const context = useContext(SliderContext);

    // যদি প্রোভাইডারের বাইরে এই হুক ব্যবহার করা হয় তবে এরর দিবে
    if (!context) {
        throw new Error("useSlider must be used within a SliderProvider");
    }

    return context; 
};

export default useSlider;