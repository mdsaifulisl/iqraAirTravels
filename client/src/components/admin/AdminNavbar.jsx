import React from "react";
import { Helmet } from "react-helmet-async";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import useSetting from "../../hooks/useSetting";

const AdminNavbar = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const { settings } = useSetting();

  // ইউজার ডাটা না আসা পর্যন্ত বা ইউজার না থাকলে একটি সেফ চেক
  const userName = user?.name || "Admin";
  const userRole = user?.role || "Staff";
  const userImage = user?.image; // যদি ডাটাবেসে ইমেজ থাকে

  return ( 
    <>
      <Helmet>
        <title>{settings?.siteName || "Expert Travel"}</title>
        {settings?.siteFavicon && (
          <link rel="icon" type="image/png" href={settings?.siteFavicon || "/vite.svg"} />
        )}
      </Helmet>

      <nav className="navbar navbar-light bg-white shadow-sm px-3 py-2 sticky-top">
        <div className="container-fluid">
          {/* মোবাইলে সাইডবার টগল করার বাটন */}
          <button
            className="btn border-0 d-lg-none me-2 p-0"
            onClick={toggleSidebar}
          >
            <FaBars size={22} style={{ color: "var(--primary-teal)" }} />
          </button>

          <h5
            className="mb-0 fw-bold d-none d-sm-block"
            style={{ color: "var(--primary-teal)" }}
          >
            Admin Dashboard
          </h5>

          <div className="ms-auto d-flex align-items-center gap-3">
            {/* ইউজার টেক্সট ইনফো */}
            <div className="text-end d-none d-md-block">
              <p className="mb-0 small fw-bold text-dark lh-1">{userName}</p>
              <small className="text-muted" style={{ fontSize: "11px" }}>
                {userRole}
              </small>
            </div>

            {/* ইউজার প্রোফাইল ইমেজ বা আইকন */}
            <div className="profile-wrapper">
              {userImage ? (
                <img
                  src={userImage}
                  alt="profile"
                  className="rounded-circle shadow-sm border border-2 border-light"
                  style={{ width: "35px", height: "35px", objectFit: "cover" }}
                />
              ) : (
                <FaUserCircle
                  size={32}
                  style={{ color: "var(--primary-teal)", cursor: "pointer" }}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
