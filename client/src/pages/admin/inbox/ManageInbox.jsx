/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  FaReply,
  FaTrash,
  FaEnvelope,
  FaEnvelopeOpen,
  FaUser,
} from "react-icons/fa";

import useContacts from "../../../hooks/useContacts";

const ManageInbox = () => {
  // useContacts হুক থেকে ডাটা এবং ফাংশনগুলো নেওয়া হচ্ছে
  const {
    messages, 
    loading,
    unreadCount,
    removeMessage,
    markAsRead,
    fetchMessages
  } = useContacts();

  const [selectedMsg, setSelectedMsg] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  // পেজ লোড হলে একবার ডাটা রিফ্রেশ করা
  useEffect(() => {
    fetchMessages();
  }, []);

  // ডিলিট হ্যান্ডলার যা Context এর removeMessage কল করবে
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this message?");
    if (!confirmed) return;

     await removeMessage(id);
    setSelectedMsg(null);
      fetchMessages(); 
    
  };

  // মেসেজ ক্লিক করলে যা হবে
  const handleSelectMessage = (msg) => {
    setSelectedMsg(msg);
    if (msg.status === "unread") {
      markAsRead(msg.id);
    }
  };

  // ফিল্টারিং লজিক
  const filteredMessages = messages.filter((msg) =>
    filterStatus === "All" ? true : msg.status === filterStatus.toLowerCase()
  );

  if (loading && messages.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-teal" role="status"></div>
        <p className="mt-2 text-muted">Loading Inbox...</p>
      </div>
    );
  }

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: "var(--primary-teal)" }}>
            Inquiry Inbox {unreadCount > 0 && <span className="badge bg-danger rounded-pill fs-6 ms-2">{unreadCount}</span>}
          </h3>
          <p className="text-muted small mb-0">Manage customer queries</p>
        </div>
        <select
          className="form-select form-select-sm rounded-pill px-3 shadow-sm border-0 w-auto"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Messages</option>
          <option value="Unread">Unread</option>
          <option value="Read">Read</option>
        </select>
      </div>

      <div className="row g-4 position-relative">
        {/* Detail View Area */}
        {selectedMsg ? (
          <div className="col-lg-7 order-1 order-lg-2">
            <div
              className="card border-0 shadow-lg rounded-4 p-4 sticky-top mb-3"
              style={{
                top: "10px",
                zIndex: 1050,
                maxHeight: "85vh",
                overflowY: "auto",
              }}
            >
              <button
                className="btn-close position-absolute top-0 end-0 m-3 shadow-none bg-light rounded-circle p-2"
                onClick={() => setSelectedMsg(null)}
              ></button>

              <div className="d-flex align-items-center gap-3 mb-3 mt-2">
                <div
                  className="bg-light rounded-circle p-3 d-none d-sm-block"
                  style={{ color: "var(--primary-teal)" }}
                >
                  <FaUser size={20} />
                </div>
                <div>
                  <h6 className="fw-bold mb-0">{selectedMsg.name}</h6>
                  <small className="text-muted">
                    {new Date(selectedMsg.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </small>
                </div>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-12 col-sm-6">
                  <div className="p-2 px-3 rounded-3 bg-light border-start border-4 border-info">
                    <small className="d-block text-muted fw-bold" style={{ fontSize: "9px" }}>EMAIL</small>
                    <span className="small d-block text-truncate">{selectedMsg.email}</span>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="p-2 px-3 rounded-3 bg-light border-start border-4 border-info">
                    <small className="d-block text-muted fw-bold" style={{ fontSize: "9px" }}>PHONE</small>
                    <span className="small d-block">{selectedMsg.phone}</span>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div
                  className="p-3 rounded-4 border bg-white small"
                  style={{ minHeight: "80px", lineHeight: "1.6", whiteSpace: "pre-wrap" }}
                >
                  {selectedMsg.message}
                </div>
              </div>

              <div className="d-flex gap-2">
                <a
                  href={`mailto:${selectedMsg.email}`}
                  className="btn text-white px-4 py-2 rounded-pill shadow-sm fw-bold small"
                  style={{ backgroundColor: "var(--primary-teal)" }}
                >
                  <FaReply className="me-1" /> Reply via Email
                </a>
                <button
                  onClick={() => handleDelete(selectedMsg.id)}
                  className="btn btn-outline-danger px-4 py-2 rounded-pill shadow-sm fw-bold small"
                >
                  <FaTrash className="me-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-lg-7 order-1 order-lg-2 d-none d-lg-block">
            <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted opacity-50 border rounded-4 border-dashed py-5">
               <FaEnvelope size={50} className="mb-3" />
               <p>Select a message to view details</p>
            </div>
          </div>
        )}

        {/* Inbox List Area */}
        <div className={`col-lg-5 ${selectedMsg ? "order-2 order-lg-1" : "order-1"}`}>
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="list-group list-group-flush" style={{ maxHeight: "75vh", overflowY: "auto" }}>
              {filteredMessages.length === 0 ? (
                <div className="p-5 text-center text-muted">No messages found.</div>
              ) : (
                filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`list-group-item list-group-item-action p-3 border-0 border-bottom cursor-pointer transition-all ${selectedMsg?.id === msg.id ? "bg-light border-start border-4 border-primary" : ""}`}
                    style={{
                      borderLeft: msg.status === "unread" ? "4px solid var(--primary-teal)" : "4px solid #dee2e6",
                      backgroundColor: msg.status === "unread" ? "#fff" : "#f8f9fa",
                      cursor: "pointer"
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <div className="d-flex align-items-center gap-2 text-truncate">
                        {msg.status === "unread" ? (
                          <FaEnvelope className="text-teal" style={{ color: "var(--primary-teal)" }} size={12} />
                        ) : (
                          <FaEnvelopeOpen className="text-muted opacity-50" size={12} />
                        )}
                        <span className={`mb-0 small text-truncate ${msg.status === "unread" ? "fw-bold text-dark" : "text-secondary"}`}>
                          {msg.name}
                        </span>
                      </div>
                      <small className="text-muted flex-shrink-0" style={{ fontSize: "10px" }}>
                        {new Date(msg.createdAt).toLocaleDateString('en-GB')}
                      </small>
                    </div>
                    <p className="small text-truncate mb-0 ps-3 text-muted" style={{ fontSize: "12px" }}>
                      {msg.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageInbox;