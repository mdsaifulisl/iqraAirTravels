/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaTag, FaClock } from 'react-icons/fa';
import '../../assets/style/details.css';

// Components
import Gallery from '../../components/shared/Gallery';
import ShareLink from '../../components/shared/ShareLink';
import { getBlogById } from '../../api/blogService';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // ১. এপিআই থেকে ডেটা ফেচ করা
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await getBlogById(id);
        // ব্যাকএন্ডের { success: true, data: {...} } স্ট্রাকচার অনুযায়ী সেট করা
        if (response?.success) {
          setPost(response.data);
        } else {
          setPost(response); // যদি সরাসরি অবজেক্ট আসে
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);

  // ২. ইমেজ স্লাইডার টাইমার
  useEffect(() => {
    if (post?.images && post.images.length > 1) {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev === post.images.length - 1 ? 0 : prev + 1));
      }, 3500); // স্লাইড টাইম কিছুটা বাড়ানো হয়েছে স্মুথনেসের জন্য
      return () => clearInterval(timer);
    }
  }, [post?.images, current]);

  // ৩. লোডিং থাকা অবস্থায় ইউআই
  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-teal" role="status"></div>
        <p className="mt-3 text-muted">Loading story...</p>
      </div>
    );
  }

  // ৪. পোস্ট না পাওয়া গেলে
  if (!post) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
        <h3 className="text-muted mb-4">Post not found!</h3>
        <button onClick={() => navigate('/blog')} className="btn btn-teal px-4">
          <FaArrowLeft className="me-2" /> Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="blog-details-page pb-5 overflow-hidden">
      {/* Hero Header */}
      <section className="blog-detail-hero py-5" style={{ backgroundColor: 'var(--accent-alice-blue)' }}>
        <div className="container">
          <button onClick={() => navigate(-1)} className="btn btn-link text-teal fw-bold mb-4 p-0 text-decoration-none shadow-none">
            <FaArrowLeft className="me-2" /> Back to Blog
          </button>
          
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted small">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/blog" className="text-decoration-none text-muted small">Blog</Link></li>
              <li className="breadcrumb-item active text-teal small" aria-current="page">{post.category}</li>
            </ol>
          </nav>

          <h1 className="display-5 fw-bold text-dark mb-4">{post.title}</h1>
          
          <div className="d-flex flex-wrap gap-4 text-muted small border-top pt-4">
            <span className="d-flex align-items-center gap-2"><FaUser className="text-coral" /> By {post.author}</span>
            <span className="d-flex align-items-center gap-2"><FaCalendarAlt className="text-coral" /> {post.date}</span>
            <span className="d-flex align-items-center gap-2"><FaClock className="text-coral" /> 5 Min Read</span>
            <span className="d-flex align-items-center gap-2"><FaTag className="text-coral" /> {post.category}</span>
          </div>
        </div>
      </section>

      <div className="container mt-5">
        <div className="row g-5">
          <div className="col-lg-8">
            
            {/* Image Slider */}
            {post.images && post.images.length > 0 && (
              <div className="blog-hero-container position-relative mb-5 rounded-4 overflow-hidden shadow-sm" style={{ height: '400px', backgroundColor: '#eee' }}>
                {post.images.map((img, index) => (
                  <div
                    key={index}
                    className={`position-absolute w-100 h-100 transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"}`}
                    style={{ 
                      backgroundImage: `url(${img})`, 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center',
                      transition: 'opacity 1s ease-in-out'
                    }}
                  />
                ))}
                
                {post.images.length > 1 && (
                  <div className="slider-dots d-flex gap-2 position-absolute bottom-0 start-50 translate-middle-x mb-3" style={{ zIndex: 5 }}>
                    {post.images.map((_, i) => (
                      <span 
                        key={i} 
                        className={`dot transition-all ${i === current ? 'bg-coral' : 'bg-white opacity-50'}`} 
                        onClick={() => setCurrent(i)}
                        style={{ width: i === current ? '24px' : '10px', height: '10px', borderRadius: '10px', cursor: 'pointer' }}
                      ></span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Post Content */}
            <div className="blog-content-area mb-5">
              <div 
                className="ql-editor p-0 additional-details fs-5 text-secondary details-content"
                style={{ lineHeight: '1.8', lineBreak: 'anywhere' }}
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </div>

            {/* Gallery Section */}
            <div className="gallery-section mb-5 p-4 bg-white shadow-sm rounded-4 border">
              <h4 className="fw-bold mb-4 text-teal">Photos from this Story</h4>
              <Gallery images={post.images} />
            </div>

            {/* Share Section */}
            <ShareLink post={post} />
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="blog-sidebar position-sticky" style={{ top: '100px' }}>
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                <h5 className="fw-bold mb-3 text-teal">Search</h5>
                <div className="input-group">
                  <input type="text" className="form-control border-light bg-light shadow-none" placeholder="Search topics..." />
                  <button className="btn btn-teal px-3 shadow-none">Go</button>
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                <h5 className="fw-bold mb-3 text-teal">Categories</h5>
                <ul className="list-unstyled mb-0">
                  {['Visa Tips', 'Travel Guide', 'Agency News', 'Success Stories'].map((cat, i) => (
                    <li key={i} className="mb-2 border-bottom border-light pb-2">
                      <Link to="#" className="text-decoration-none text-muted d-flex justify-content-between align-items-center hover-teal transition-all">
                        {cat} <span className="badge rounded-pill bg-alice-blue text-teal fw-normal">12</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card border-0 shadow-lg rounded-4 p-4 text-white text-center position-relative overflow-hidden" style={{ background: 'linear-gradient(45deg, var(--primary-teal), #006666)' }}>
                <div className="position-relative" style={{ zIndex: 2 }}>
                  <h4 className="fw-bold mb-2">Stay Updated</h4>
                  <p className="small mb-4 opacity-75">Get the latest visa rules for Bangladeshis.</p>
                  <input type="email" className="form-control border-0 mb-3 py-2 text-center shadow-none" placeholder="Enter your email" />
                  <button className="btn w-100 rounded-pill fw-bold py-2 shadow shadow-sm text-white" style={{ backgroundColor: 'var(--secondary-coral)' }}>Subscribe Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;