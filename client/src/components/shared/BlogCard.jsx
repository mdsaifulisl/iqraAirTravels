import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

const BlogCard = ({ BlogCardData }) => {
    // HTML কন্টেন্ট থেকে ট্যাগ সরিয়ে শুধু টেক্সট বের করার ফাংশন
    const getPlainText = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || "";
    };

    return (
        <>
            {BlogCardData?.map((post) => {
                const plainContent = getPlainText(post.content);

                return (
                    <div className="col-lg-4 col-md-6 mb-4" key={post.id}>
                        <article className="blog-card border-0 shadow-sm h-100 d-flex flex-column bg-white rounded-4 overflow-hidden">
                            <div className="blog-img-box position-relative">
                                <img 
                                    src={post.images[0]} 
                                    alt={post.title} 
                                    className="img-fluid w-100" 
                                    style={{ height: '220px', objectFit: 'cover' }}
                                />
                                <div className="blog-date position-absolute bottom-0 start-0 bg-teal text-white px-3 py-1 small">
                                    <FaCalendarAlt className="me-1" /> {post.date}
                                </div>
                            </div>
                            
                            <div className="blog-content p-4 d-flex flex-column flex-grow-1">
                                {/* টাইটেল ২ লাইনে সীমাবদ্ধ রাখার জন্য স্লাইসিং */}
                                <h4 className="blog-title h5 fw-bold text-teal mb-3">
                                    {post.title.length > 55 ? `${post.title.slice(0, 55)}...` : post.title}
                                </h4>
                                
                                {/* কন্টেন্ট থেকে শর্ট ডেসক্রিপশন তৈরি */}
                                <p className="blog-excerpt text-secondary small mb-4">
                                    {plainContent.length > 90 ? `${plainContent.slice(0, 90)}...` : plainContent}
                                </p>
                                
                                {/* mt-auto বাটনকে একদম নিচে পুশ করবে */}
                                <Link to={`/blog/${post.id}`} className="read-more-btn fw-bold d-flex align-items-center gap-2 mt-auto text-decoration-none text-coral">
                                    Read More <FaArrowRight />
                                </Link>
                            </div>
                        </article>
                    </div>
                );
            })}
        </>
    );
};

export default BlogCard;