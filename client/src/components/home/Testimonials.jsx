import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';


const reviews = [
  {
    id: 1,
    name: "Anika Rahman",
    location: "Dhaka, Bangladesh",
    text: "The trip to Switzerland was breathtaking! Amazing Tours handled everything perfectly, from the visa to the hotels. Highly recommended!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "John Doe",
    location: "London, UK",
    text: "Professional and friendly service. The Bali tour package was very well-structured. I didn't have to worry about a single thing.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Samiul Islam",
    location: "Sylhet, BD",
    text: "I booked their visa service and it was incredibly fast. The staff is very helpful and they keep you updated throughout the process.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto Scroll Logic (Every 4 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => 
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonials-section section-padding bg-alice-blue overflow-hidden">
      <div className="container text-center overflow-hidden">
        
        <h6 className="text-coral fw-bold text-uppercase">Testimonials</h6>
        <h2 className="display-6 fw-bold text-teal mb-5">Our Customer Experience</h2>

        {/* Slider Wrapper */}
        <div className="testimonial-slider-container">
          <div 
            className="testimonial-track" 
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {reviews.map((item) => (
              <div className="testimonial-slide" key={item.id}>
                <div className="testimonial-card shadow-sm mx-auto">
                  <FaQuoteLeft className="quote-icon mb-3" />
                  <p className="testimonial-text mb-4">"{item.text}"</p>
                  
                  <div className="customer-info d-flex flex-column align-items-center">
                    <img src={item.image} alt={item.name} className="customer-img rounded-circle mb-2" />
                    <h5 className="customer-name text-teal fw-bold mb-0">{item.name}</h5>
                    <span className="customer-location small mb-2">{item.location}</span>
                    <div className="star-rating">
                      {[...Array(item.rating)].map((_, i) => (
                        <FaStar key={i} className="text-warning" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Dots */}
        <div className="slider-dots mt-4">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            ></button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;