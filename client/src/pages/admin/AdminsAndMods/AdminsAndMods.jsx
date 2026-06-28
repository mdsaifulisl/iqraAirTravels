import React, { useState } from "react";
import {
  FaUserPlus,
  FaUserShield,
  FaTrash,
  FaEdit,
  FaSearch,
  FaCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUsers } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const AdminsAndMods = () => {
  const { users, handleDeleteUser } = useUsers(); 
  const { user: loggedInUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // সার্চ ফিল্টারিং লজিক
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );



  const delateUser = async (userId) => {
    if ( userId === loggedInUser.id ) {
      await handleDeleteUser(userId);
      logout();
    } else {
      await handleDeleteUser(userId);
    }

  };

  return (
    <div className="animate__animated animate__fadeIn pb-5">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: "var(--primary-teal)" }}>
            Admins & Moderators
          </h3>
          <p className="text-muted small">
            Manage system access levels and team members
          </p>
        </div>
        {loggedInUser.role === "Super Admin" && (
        <Link
          to="/admin/add-admin-and-moderator"
          className="btn text-white px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2"
          style={{ backgroundColor: "var(--primary-teal)" }}
        >
          <FaUserPlus /> Add Member
        </Link>
        )}
      </div>

      <div className="row g-4">
        {/* Statistics Card */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-white" style={{ backgroundColor: "var(--primary-teal)" }}>
            <div className="d-flex align-items-center gap-3">
              <div className="bg-white bg-opacity-25 p-3 rounded-circle">
                <FaUserShield size={24} />
              </div>
              <div>
                <h4 className="fw-bold mb-0 text-white">{users.length}</h4>
                <span className="small opacity-75">Total Members</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="col-12">
          <div className="card border-0 shadow-sm rounded-4 p-2">
            <div className="input-group bg-light rounded-3 px-3 align-items-center">
              <FaSearch className="text-muted" />
              <input
                type="text"
                className="form-control bg-transparent border-0 shadow-none py-2"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Updated Table UI */}
        <div className="col-12">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="px-4 py-3 border-0 small fw-bold text-muted">MEMBER</th>
                    <th className="py-3 border-0 small fw-bold text-muted">ROLE</th>
                    <th className="py-3 border-0 small fw-bold text-muted">STATUS</th>
                    {/* <th className="py-3 border-0 small fw-bold text-muted">LAST LOGIN</th> */}
                    {loggedInUser.role === "Super Admin" && (
                      <th className="px-4 py-3 border-0 small fw-bold text-muted text-end">ACTIONS</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} style={{ transition: "0.3s" }}>
                      <td className="px-4 py-3 border-0">
                        <Link to={`/admin/view-profile/${user.id}`} className="text-decoration-none d-flex align-items-center gap-3">
                          <img
                            src={user.image || "https://ui-avatars.com/api/?name=" + user.name}
                            alt=""
                            className="rounded-circle shadow-sm border"
                            width="40" height="40" style={{ objectFit: 'cover' }}
                          />
                          <div>
                            <div className="fw-bold small text-dark">{user.name}</div>
                            <div className="text-muted" style={{ fontSize: "11px" }}>{user.email}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="border-0">
                        <span className="badge bg-light text-dark border fw-semibold py-2 px-3 rounded-pill text-capitalize" style={{ fontSize: "10px" }}>
                          {user.role}
                        </span>
                      </td>
                      <td className="border-0">
                        <span className={`d-flex align-items-center gap-1 small fw-bold ${user.status === "Active" ? "text-success" : "text-danger"}`}>
                          <FaCircle size={7} /> {user.status}
                        </span>
                      </td>
                      {/* <td className="border-0 text-muted small">
                        {user.lastLogin || "Never"}
                      </td> */}
                      {loggedInUser.role === "Super Admin" && (
                        <td className="px-4 py-3 border-0 text-end">
                          <div className="d-flex justify-content-end gap-2">
                            <Link
                              to={`/admin/edit-admin-and-moderator/${user.id}`}
                              className="btn btn-sm btn-outline-light border shadow-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
                              style={{ width: "32px", height: "32px" }}
                            >
                              <FaEdit style={{ color: "var(--primary-teal)" }} />
                            </Link>
                            <button 
                              onClick={() => delateUser(user.id)}
                              className="btn btn-sm btn-outline-light border shadow-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
                              style={{ width: "32px", height: "32px" }}
                            >
                              <FaTrash className="text-danger" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <div className="p-5 text-center text-muted">No members found matching your search.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminsAndMods;