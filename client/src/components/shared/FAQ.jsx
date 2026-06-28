import React, { useState, useEffect } from 'react';
import useFAQ from '../../hooks/useFAQ';

const faqDataDummy = [
  {
    id: "44",
    question: "How do I book a tour package?",
    answer: "Booking is simple! You can browse our tour packages, select your preferred one, and click 'Book Now'. Alternatively, you can contact our support team via phone or email for manual booking."
  },
  {
    id: "45",
    question: "What documents are required for visa assistance?",
    answer: "Generally, a valid passport, recent photographs, bank statements, and a NOC letter from your employer are required."
  }
];

const FAQ = () => {
  const [openId, setOpenId] = useState(null);
  const { faqs, loading } = useFAQ();

  // ডাটা ফিল্টার করা
  const filteredFAQs = faqs.filter(faq => faq.status === "Active");
  const faqData = filteredFAQs.length > 0 ? filteredFAQs : faqDataDummy;

  // first FAQ Oper Load 
  useEffect(() => {
    if (faqData.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpenId(faqData[0].id);
    }
  }, [faqs]); 

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id); 
  };

  if (loading) {
    return <div className="text-center py-5">Loading FAQs...</div>;
  }

  return (
    <section className="faq-section py-5 bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5">
              <h6 className="text-coral fw-bold text-uppercase">Questions?</h6>
              <h2 className="text-teal fw-bold">Frequently Asked Questions</h2>
              <div className="header-line mx-auto"></div>
            </div>

            <div className="accordion custom-accordion">
              {faqData.map((item, index) => (
                <div className="accordion-item mb-3 border-0 shadow-sm" key={item.id || index}>
                  <h2 className="accordion-header">
                    <button 
                      className={`accordion-button ${openId !== item.id ? 'collapsed' : ''} fw-bold text-teal`} 
                      type="button"
                      onClick={() => toggleAccordion(item.id)} 
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div 
                    className={`accordion-collapse collapse ${openId === item.id ? 'show' : ''}`} 
                  >
                    <div className="accordion-body text-secondary">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;