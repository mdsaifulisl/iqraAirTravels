/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { FaSave, FaArrowLeft, FaQuestionCircle, FaCommentDots, FaSortNumericDown } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import useFAQ from "../../../hooks/useFAQ";
import { createFAQ, updateFAQ, getFAQById } from "../../../api/faqService";
import toast from "react-hot-toast";

const AddFAQ = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const { fetchFAQs } = useFAQ();

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    status: "Active"
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchExistingFAQ = async () => {
        try {
          const faq = await getFAQById(id);
          setFormData(faq.data);
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
          toast.error("Failed to fetch FAQ details.");
        }
      };
      fetchExistingFAQ();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let res;
    if (isEditMode) {
      res = await updateFAQ(id, formData); 
    } else {
      res = await createFAQ(formData);
    }

    if (res.success) {
      toast.success(res.message);
      fetchFAQs(); 
      navigate(-1); 
    }
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
};

  return (
    <div className="animate__animated animate__fadeIn pb-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: "var(--primary-teal)" }}>
            {isEditMode ? "Edit FAQ" : "Add New FAQ"}
          </h3>
          <p className="text-muted small">Help your customers by answering common questions</p>
        </div>
        <button onClick={() => navigate(-1)} className="btn btn-outline-secondary rounded-pill px-4 shadow-sm">
          <FaArrowLeft className="me-2" /> Back to Management
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-header bg-white border-0 pt-4 px-4">
              <h5 className="fw-bold mb-0">Question Details</h5>
            </div>
            
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  {/* Question Input */}
                  <div className="col-12">
                    <label className="small fw-bold mb-2">Question</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0"><FaQuestionCircle className="text-muted" /></span>
                      <input 
                        type="text" 
                        className="form-control border-0 bg-light py-3" 
                        placeholder="e.g. What is your refund policy?"
                        value={formData.question}
                        onChange={(e) => setFormData({...formData, question: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  {/* Answer Input */}
                  <div className="col-12">
                    <label className="small fw-bold mb-2">Detailed Answer</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0 align-items-start pt-3"><FaCommentDots className="text-muted" /></span>
                      <textarea 
                        className="form-control border-0 bg-light py-3" 
                        rows="5"
                        placeholder="Write a clear and concise answer here..."
                        value={formData.answer}
                        onChange={(e) => setFormData({...formData, answer: e.target.value})}
                        required
                      ></textarea>
                    </div>
                  </div>
                  

                  {/* Status Select */}
                  <div className="col-md-6">
                    <label className="small fw-bold mb-2">Status</label>
                    <select 
                      className="form-select border-0 bg-light py-3"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Submit Buttons */}
                  <div className="col-12 mt-4 pt-3 border-top">
                    <div className="d-flex gap-3 justify-content-end">
                      <button type="button" onClick={() => navigate("/admin/slider")} className="btn btn-light rounded-pill px-4 py-2">
                        Cancel
                      </button>
                      <button type="submit" className="btn text-white rounded-pill px-5 py-2 shadow" style={{backgroundColor: 'var(--secondary-coral)'}}>
                        <FaSave className="me-2" /> {isEditMode ? "Update FAQ" : "Save FAQ"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="col-lg-4 d-none d-lg-block">
          <div className="card border-0 shadow-sm rounded-4 p-4 text-white" style={{backgroundColor: 'var(--primary-teal)'}}>
            <h5 className="fw-bold mb-3">Quick Tips</h5>
            <ul className="small opacity-75 ps-3 mb-0">
              <li className="mb-2">Keep your questions short and direct.</li>
              <li className="mb-2">Break down complex answers into smaller paragraphs.</li>
              <li className="mb-2">Use the "Display Order" to organize the sequence of questions on the website.</li>
              <li>Active status ensures the FAQ is visible to the public.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFAQ;
