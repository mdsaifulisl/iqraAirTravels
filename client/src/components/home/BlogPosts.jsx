import React from 'react';
import BlogCard from '../shared/BlogCard';
import BlogjsonData from '../../data/blogs.json';

import useBlogs from '../../hooks/useBlogs';




const BlogPosts = () => {
  const { blogs } = useBlogs();
  const BlogjsonDatas = blogs.length > 0 ? blogs.slice(0, 3) : BlogjsonData.slice(0, 3); 
  return (
    <section className="blog-section py-5 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="row mb-5 text-center">
          <div className="col-lg-12">
            <h6 className="text-coral fw-bold text-uppercase">Travel Guides</h6>
            <h2 className="display-6 fw-bold text-teal">Latest From Our Blog</h2>
            <div className="header-line mx-auto"></div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="row g-4">
          <BlogCard BlogCardData={BlogjsonDatas} />
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;