import { useContext } from 'react';
import { SettingContext } from '../context/SettingContext';

const useSetting = () => {
    const context = useContext(SettingContext);
    if (!context) {
        throw new Error("useSetting must be used within a SettingProvider");
    }
    return context;
};

export default useSetting;