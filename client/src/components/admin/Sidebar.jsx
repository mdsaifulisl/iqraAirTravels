import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  FaThLarge, 
  FaPlane, 
  FaPassport,  
  FaTicketAlt, 
  FaMapMarkedAlt, 
  FaPenNib, 
  FaInbox, 
  FaCog, 
  FaSignOutAlt, 
  FaTimes,
  FaHome,
  FaUsersCog,
  FaImages // Slider/Hero Section এর জন্য নতুন আইকন
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();
  // const { user } = useAuth();
  const { logout } = useAuth();


  const handleLogout = () => {
    logout();
    navigate("/login");
  };



  return (
    <div className="d-flex flex-column p-3 text-white h-100 shadow-lg overflow-auto">
      <div className="d-flex align-items-center justify-content-between mb-4 ps-2">
        <span className="fs-4 fw-bold" style={{ color: "var(--secondary-coral)" }}>Travel Admin</span>
        <button className="btn text-white d-lg-none p-0" onClick={closeSidebar}>
          <FaTimes size={20} />
        </button>
      </div>

      {/* Visit Website Button */}
      <div className="mb-3">
        <NavLink 
          to="/" 
          className="btn btn-light w-100 d-flex align-items-center justify-content-center gap-2 py-2 rounded-3 shadow-sm border-0"
          style={{ color: "var(--primary-teal)", fontWeight: "bold", fontSize: "14px" }}
        >
          <FaHome /> Visit Website
        </NavLink>
      </div>

      <hr className="opacity-10 mt-0" />
      
      <ul className="nav nav-pills flex-column mb-auto gap-1">
        {/* Dashboard */}
        <li>
          <NavLink 
            to="/admin" 
            end 
            onClick={closeSidebar}
            className={({ isActive }) => `nav-link text-white d-flex align-items-center gap-3 py-2 border-0 ${isActive ? 'bg-teal shadow-sm' : 'hover-bg-light'}`}
            style={({ isActive }) => isActive ? { backgroundColor: "var(--primary-teal)" } : {}}
          >
            <FaThLarge /> <span className="small fw-bold">Dashboard</span>
          </NavLink>
        </li>

        {/* Hero Slider Management - নতুন যোগ করা হয়েছে */}
        <li>
          <NavLink 
            to="/admin/slider-fqn-and-about" 
            onClick={closeSidebar}
            className={({ isActive }) => `nav-link text-white d-flex align-items-center gap-3 py-2 border-0 ${isActive ? 'bg-teal shadow-sm' : 'hover-bg-light'}`}
            style={({ isActive }) => isActive ? { backgroundColor: "var(--primary-teal)" } : {}}
          >
            <FaImages /> <span className="small fw-bold">Hero Slider</span>
          </NavLink>
        </li>

        {/* Manage Tours */}
        <li>
          <NavLink 
            to="/admin/tours" 
            onClick={closeSidebar}
            className={({ isActive }) => `nav-link text-white d-flex align-items-center gap-3 py-2 border-0 ${isActive ? 'bg-teal shadow-sm' : 'hover-bg-light'}`}
            style={({ isActive }) => isActive ? { backgroundColor: "var(--primary-teal)" } : {}}
          >
            <FaPlane /> <span className="small fw-bold">Manage Tours</span>
          </NavLink>
        </li>

        {/* Air Tickets */}
        <li>
          <NavLink 
            to="/admin/tickets" 
            onClick={closeSidebar}
            className={({ isActive }) => `nav-link text-white d-flex align-items-center gap-3 py-2 border-0 ${isActive ? 'bg-teal shadow-sm' : 'hover-bg-light'}`}
            style={({ isActive }) => isActive ? { backgroundColor: "var(--primary-teal)" } : {}}
          >
            <FaTicketAlt /> <span className="small fw-bold">Air Tickets</span>
          </NavLink>
        </li>

        {/* Manage Visa */}
        <li>
          <NavLink 
            to="/admin/visas" 
            onClick={closeSidebar}
            className={({ isActive }) => `nav-link text-white d-flex align-items-center gap-3 py-2 border-0 ${isActive ? 'bg-teal shadow-sm' : 'hover-bg-light'}`}
            style={({ isActive }) => isActive ? { backgroundColor: "var(--primary-teal)" } : {}}
          >
            <FaPassport /> <span className="small fw-bold">Manage Visa</span>
          </NavLink>
        </li>

        {/* Manage Destinations */}
        <li>
          <NavLink 
            to="/admin/destinations" 
            onClick={closeSidebar}
            className={({ isActive }) => `nav-link text-white d-flex align-items-center gap-3 py-2 border-0 ${isActive ? 'bg-teal shadow-sm' : 'hover-bg-light'}`}
            style={({ isActive }) => isActive ? { backgroundColor: "var(--primary-teal)" } : {}}
          >
            <FaMapMarkedAlt /> <span className="small fw-bold">Manage Destinations</span>
          </NavLink>
        </li>

        {/* Manage Blog */}
        <li>
          <NavLink 
            to="/admin/blog" 
            onClick={closeSidebar}
            className={({ isActive }) => `nav-link text-white d-flex align-items-center gap-3 py-2 border-0 ${isActive ? 'bg-teal shadow-sm' : 'hover-bg-light'}`}
            style={({ isActive }) => isActive ? { backgroundColor: "var(--primary-teal)" } : {}}
          >
            <FaPenNib /> <span className="small fw-bold">Manage Blog</span>
          </NavLink>
        </li>

        {/* Manage Inbox */}
        <li>
          <NavLink 
            to="/admin/inbox" 
            onClick={closeSidebar}
            className={({ isActive }) => `nav-link text-white d-flex align-items-center gap-3 py-2 border-0 ${isActive ? 'bg-teal shadow-sm' : 'hover-bg-light'}`}
            style={({ isActive }) => isActive ? { backgroundColor: "var(--primary-teal)" } : {}}
          >
            <FaInbox /> <span className="small fw-bold">Manage Inbox</span>
          </NavLink>
        </li>
      </ul>
      
      <hr className="opacity-10" />

      {/* Admin & Moderator Section */}
      <div className="mb-1">
        <NavLink 
          to="/admin/users" 
          onClick={closeSidebar}
          className={({ isActive }) => `nav-link text-white d-flex align-items-center gap-3 border-0 p-2 ${isActive ? 'bg-teal shadow-sm rounded-2' : 'hover-bg-light opacity-75'}`}
          style={({ isActive }) => isActive ? { backgroundColor: "var(--primary-teal)" } : {}}
        >
          <FaUsersCog /> <span className="small fw-bold">Admins & Mods</span>
        </NavLink>
      </div>

      {/* Settings Section */}
      <div className="mb-2">
        <NavLink 
          to="/admin/settings" 
          onClick={closeSidebar}
          className={({ isActive }) => `nav-link text-white d-flex align-items-center gap-3 p-2 border-0 ${isActive ? 'bg-teal shadow-sm rounded-2' : 'hover-bg-light opacity-75'}`}
          style={({ isActive }) => isActive ? { backgroundColor: "var(--primary-teal)" } : {}}
        >
          <FaCog /> <span className="small fw-bold">Settings</span>
        </NavLink>
      </div>

      <button onClick={ handleLogout } className="btn btn-outline-danger d-flex align-items-center gap-2 border-0 py-2">
        <FaSignOutAlt /> <span className="small fw-bold">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;