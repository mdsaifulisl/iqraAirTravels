import React from 'react';
import BlogCard from '../../components/shared/BlogCard';
import BlogJsonData from '../../data/blogs.json';

import useBlogs from '../../hooks/useBlogs';
import { FaNewspaper } from 'react-icons/fa';



const BlogPage = () => {

  const { blogs, loading, error } = useBlogs();

 const blogData = blogs.length > 0 ? blogs : BlogJsonData;


 if (loading) {
    return (
      <div className="d-flex flex-column align-items-center gap-3 py-5">
        <FaNewspaper size={40} className="text-muted" />
        <h5 className="text-muted">Loading articles...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column align-items-center gap-3 py-5">
        <FaNewspaper size={40} className="text-muted" />
        <h5 className="text-muted">Failed to load articles</h5>
      </div>
    );
  }


  return (
    <div className="blog-page pb-5">
      {/* Header */}
      <section className="about-hero d-flex align-items-center justify-content-center text-center text-white mb-5" 
        style={{backgroundImage: `linear-gradient(rgba(0, 128, 128, 0.8), rgba(0, 128, 128, 0.8)), url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80')`, height: '300px'}}>
        <div className="container">
          <h1 className="display-4 fw-bold">Our Travel Blog</h1>
          <p className="lead">Expert advice, travel stories, and visa tips</p>
        </div>
      </section>


      <div className="container">
        {/* Blog Grid */}
        <div className="row g-4">
          <BlogCard BlogCardData={ blogData } />
        </div>
      </div>

      
    </div>
  );
};

export default BlogPage;