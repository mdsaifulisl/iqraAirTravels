import { useContext } from 'react';
import { BlogContext } from '../context/BlogContext';

const useBlogs = () => {
    const context = useContext(BlogContext);

    if (!context) {
        throw new Error("useBlogs must be used within a BlogProvider");
    }

    return context;
};

export default useBlogs;