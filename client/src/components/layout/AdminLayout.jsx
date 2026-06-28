import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../admin/Sidebar";
import AdminNavbar from "../admin/AdminNavbar";
import "../../assets/style/admin.css"; 

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="d-flex" style={{ minHeight: "100vh", overflowX: "hidden" }}>
      {/* Sidebar Section */}
      <div
        className={`sidebar-wrapper bg-dark text-white shadow transition-all ${isSidebarOpen ? "show-sidebar" : "hide-sidebar"}`}
        style={{
          width: "260px",
          position: "fixed",
          height: "100vh",
          zIndex: 1050,
          left: 0,
          transition: "0.3s ease",
        }}
      >
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="position-fixed w-100 h-100 bg-black opacity-50 d-lg-none"
          style={{ zIndex: 1040, top: 0, left: 0 }}
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Content Area */}
      <div
        className="flex-grow-1 bg-light admin-main-content transition-all"
        style={{ minWidth: 0, minHeight: "100vh" }}
      >
        <AdminNavbar toggleSidebar={toggleSidebar} />
        <div className="p-3 p-md-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
