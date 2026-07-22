import React from "react";
import { Routes, Route } from "react-router-dom";

// Route Guards & Layout
import PrivateRoute from "../components/auth/PrivateRoute";
import AdminRoute from "../components/auth/AdminRoute";
import AdminLayout from "../components/layout/AdminLayout";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import AdminHeroSlider from "../pages/admin/adminheroslider/AdminHeroSliders";
import AddSlider from "../pages/admin/adminheroslider/AddSlider";
import AddFAQ from "../pages/admin/adminheroslider/AddFAQ";
import ManageTours from "../pages/admin/toure/ManageTours";
import AddTour from "../pages/admin/toure/AddTour";
import Visa from "../pages/admin/VisaManagement/VisaManagement";
import AddVisa from "../pages/admin/VisaManagement/AddVisa";
import ManageDestinations from "../pages/admin/admindestinations/ManageDestinations";
import AddDestination from "../pages/admin/admindestinations/AddDestination";
import ManageBlog from "../pages/admin/adminblog/ManageBlog";
import AddBlog from "../pages/admin/adminblog/AddBlog";
import AdminAirTickets from "../pages/admin/adminairtickiet/AdminAirTickets";
import AddAirTicket from "../pages/admin/adminairtickiet/AddAirTicket";
import ManageInbox from "../pages/admin/inbox/ManageInbox";
import AdminsAndMods from "../pages/admin/AdminsAndMods/AdminsAndMods";
import AddTeamMember from "../pages/admin/AdminsAndMods/AddTeamMember";
import AdminProfile from "../pages/admin/AdminsAndMods/AdminProfile";
import Settings from "../pages/admin/settings/Settings";
import ErrorPage from "../pages/error/ErrorPage";

const AdminRoutes = () => {
  return (
    <PrivateRoute>
      <Routes>
        <Route element={<AdminLayout />}>
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Hero Slider & FAQ */}
          <Route path="slider-fqn-and-about" element={<AdminHeroSlider />} />
          <Route path="add-slider" element={<AddSlider />} />
          <Route path="edit-slider/:id" element={<AddSlider />} />
          <Route path="add-faq" element={<AddFAQ />} />
          <Route path="edit-faq/:id" element={<AddFAQ />} />

          {/* Tours */}
          <Route path="tours" element={<ManageTours />} />
          <Route path="add-tour" element={<AddTour />} />
          <Route path="edit-tour/:id" element={<AddTour />} />

          {/* Visa */}
          <Route path="visas" element={<Visa />} />
          <Route path="add-visa" element={<AddVisa />} />
          <Route path="edit-visa/:id" element={<AddVisa />} />

          {/* Hajj & Umrah / Destinations */}
          <Route path="hajj&umrah" element={<ManageDestinations />} />
          <Route path="add-hajj-umrah" element={<AddDestination />} />
          <Route path="edit-hajj-umrah/:id" element={<AddDestination />} />

          {/* Blog */}
          <Route path="blog" element={<ManageBlog />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="edit-blog/:id" element={<AddBlog />} />

          {/* Air Tickets */}
          <Route path="tickets" element={<AdminAirTickets />} />
          <Route path="add-air-ticket" element={<AddAirTicket />} />
          <Route path="edit-air-ticket/:id" element={<AddAirTicket />} />

          {/* Inbox */}
          <Route path="inbox" element={<ManageInbox />} />

          {/* User Management & Profile */}
          <Route path="users" element={<AdminsAndMods />} />
          <Route
            path="add-admin-and-moderator"
            element={
              <AdminRoute>
                <AddTeamMember />
              </AdminRoute>
            }
          />
          <Route
            path="edit-admin-and-moderator/:id"
            element={
              <AdminRoute>
                <AddTeamMember />
              </AdminRoute>
            }
          />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="view-profile/:id" element={<AdminProfile />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />

          {/* Fallback Error Page inside Admin */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </PrivateRoute>
  );
};

export default AdminRoutes;