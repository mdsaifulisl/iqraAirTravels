import React from "react";
import { Link } from "react-router-dom";
import { FaSuitcase, FaPassport, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { useTours } from "../../hooks/useTours";
import useVisas from "../../hooks/useVisas";
import useBlogs from "../../hooks/useBlogs";
import useContacts from "../../hooks/useContacts";

const Dashboard = () => {
  const { tours } = useTours();
  const { visas } = useVisas();
  const { blogs } = useBlogs();
  const { messages } = useContacts();

  // SQL status অনুযায়ী আনরিড মেসেজ ফিল্টার
  const unreadMessages = messages.filter(m => m.status === 'unread').length;

  const stats = [
    { id: 1, label: "Total Tours", value: tours.length, icon: <FaSuitcase />, color: "bg-primary" },
    { id: 2, label: "Visa Queries", value: visas.length, icon: <FaPassport />, color: "bg-info" },
    { id: 3, label: "Active Blogs", value: blogs.length, icon: <FaCheckCircle />, color: "bg-success" },
    { id: 4, label: "New Messages", value: unreadMessages, icon: <FaHourglassHalf />, color: "bg-warning" },
  ];

  return (
    <div className="animate__animated animate__fadeIn">
      <h3 className="fw-bold mb-4">Welcome Back, Admin!</h3>
      
      {/* স্ট্যাটাস কার্ড গ্রিড */}
      <div className="row g-4 mb-5">
        {stats.map((item) => (
          <div className="col-md-6 col-xl-3" key={item.id}>
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
              <div className="d-flex align-items-center gap-3">
                <div className={`${item.color} text-white p-3 rounded-4 fs-4 d-flex align-items-center`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-muted mb-0 small fw-bold">{item.label}</p>
                  <h3 className="fw-bold mb-0">{item.value}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Contact Messages Table */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-header bg-white py-3 border-0 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0 text-teal">Recent Messages</h5>
          <span className="badge bg-soft-teal text-teal rounded-pill px-3">
            {unreadMessages} Unread
          </span>
        </div>
        
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light text-muted">
              <tr>
                <th className="ps-4 border-0 small text-uppercase">Sender</th>
                <th className="border-0 small text-uppercase">Message Preview</th>
                <th className="border-0 small text-uppercase">Date</th>
                <th className="border-0 small text-uppercase">Status</th>
                <th className="border-0 small text-uppercase text-end pe-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {messages && messages.length > 0 ? (
                // সর্বশেষ ৫টি মেসেজ দেখানোর লজিক
                [...messages]
                  .slice(0, 5) 
                  .map((msg) => (
                    <tr key={msg.id}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center gap-2">
                          <div className="bg-soft-primary text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{width: '35px', height: '35px', fontSize: '12px'}}>
                            {msg.name ? msg.name.substring(0, 2).toUpperCase() : '??'}
                          </div>
                          <div>
                            <div className="fw-bold mb-0" style={{fontSize: '14px'}}>{msg.name}</div>
                            <div className="text-muted small" style={{fontSize: '11px'}}>{msg.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-truncate" style={{maxWidth: '200px', fontSize: '14px'}}>
                          {msg.message || "No message content"}
                        </div>
                      </td>
                      <td className="small text-muted">
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('en-GB') : "Today"}
                      </td>
                      <td>
                        <span className={`badge rounded-pill px-3 py-2 
                          ${msg.status === 'unread' ? 'bg-soft-warning text-warning' : 
                            msg.status === 'replied' ? 'bg-soft-info text-info' : 'bg-soft-success text-success'}`}>
                          {msg.status === 'unread' ? 'New' : msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <Link to={`/admin/inbox`} className="btn btn-sm btn-light rounded-pill px-3 border shadow-sm">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    <div className="mb-2 fs-3">📩</div>
                    No messages received yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;