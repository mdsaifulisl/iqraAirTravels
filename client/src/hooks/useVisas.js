import { useContext } from 'react';
import { VisaContext } from '../context/VisaContext';

const useVisas = () => {
    const context = useContext(VisaContext);
    if (!context) {
        throw new Error('useVisas must be used within a VisaProvider');
    }

    return context;
};

export default useVisas;