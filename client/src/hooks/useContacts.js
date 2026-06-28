import { useContext } from 'react';
import { ContactContext } from '../context/ContactContext';

const useContacts = () => {
    const context = useContext(ContactContext);
    if (!context) {
        throw new Error("useContacts must be used within a ContactProvider");
    }
    return context;
};

export default useContacts;