import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./publicRoutes";
import AdminRoutes from "./adminRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Protected Admin Routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* Public Routes */}
      <Route path="/*" element={<PublicRoutes />} />
    </Routes>
  );
};

export default AppRoutes;