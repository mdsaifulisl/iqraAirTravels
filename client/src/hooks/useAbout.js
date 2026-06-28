import { useContext } from 'react';
import { AboutContext } from '../context/AboutContext';

const useAbout = () => {
    const context = useContext(AboutContext);
    if (!context) {
        throw new Error("useAbout must be used within an AboutProvider");
    }
    return context;
};

export default useAbout;