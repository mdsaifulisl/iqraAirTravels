import React, { createContext, useState, useEffect } from 'react';
import { getAllBlogs, deleteBlog as deleteBlogApi } from '../api/blogService';
import { toast } from 'react-hot-toast';

// eslint-disable-next-line react-refresh/only-export-components
export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch all blogs function
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await getAllBlogs();
      if (res.success) {
        setBlogs(res.data);
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  // delete blog function
  const removeBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    
    try {
      const res = await deleteBlogApi(id);
      if (res.success) {
        setBlogs((prev) => prev.filter((blog) => blog.id !== id));
        toast.success("Blog deleted successfully");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // run on mount to fetch blogs immediately
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogContext.Provider value={{ 
      blogs, 
      loading, 
      error, 
      fetchBlogs, 
      removeBlog,
      setBlogs 
    }}>
      {children}
    </BlogContext.Provider>
  );
};



// export const useBlogs = () => {
//   const context = useContext(BlogContext);
//   if (!context) {
//     throw new Error("useBlogs must be used within a BlogProvider");
//   }
//   return context;
// };