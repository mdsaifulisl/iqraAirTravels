// Hooks
import { Routes, Route } from "react-router-dom";

// style
import "./assets/style/shared.css";
import "./assets/style/pages.css";

// Components (Public) - Unprotected
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTopSetter from "./components/layout/ScrollToTopSetter";

// Pages (Public) - Unprotected
import ErrorPage from "./pages/error/ErrorPage";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import TourPage from "./pages/tourPage/TourPage";
import TourDetails from "./pages/tourDetails/TourDetails";
import BlogDetails from "./pages/blogDetails/BlogDetails";
import VisaService from "./pages/visaService/VisaService";
import VisaDetails from "./pages/visaDetails/VisaDetails";
import Destinations from "./pages/destinations/Destinations";
import DestinationDetails from "./pages/destinationDetails/DestinationDetails";
import BlogPage from "./pages/blogPage/BlogPage";
import AirTickets from "./pages/airTicketDeals/AirTickets";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";

// Layout & Pages (Admin) - Protected
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ManageTours from "./pages/admin/toure/ManageTours";
import AddTour from "./pages/admin/toure/AddTour";

import Visa from "./pages/admin/VisaManagement/VisaManagement";
import AddVisa from "./pages/admin/VisaManagement/AddVisa";
import ManageDestinations from "./pages/admin/admindestinations/ManageDestinations";
import AddDestination from "./pages/admin/admindestinations/AddDestination";
import ManageBlog from "./pages/admin/adminblog/ManageBlog";
import AddBlog from "./pages/admin/adminblog/AddBlog";

import AdminAirTickets from "./pages/admin/adminairtickiet/AdminAirTickets";
import AddAirTicket from "./pages/admin/adminairtickiet/AddAirTicket";

import ManageInbox from "./pages/admin/inbox/ManageInbox";
import Settings from "./pages/admin/settings/Settings";

// Admins and Moderators
import AdminsAndMods from "./pages/admin/AdminsAndMods/AdminsAndMods";
import AddTeamMember from "./pages/admin/AdminsAndMods/AddTeamMember";
import AdminProfile from "./pages/admin/AdminsAndMods/AdminProfile";

// Admin Hero Slider
import AdminHeroSlider from "./pages/admin/adminheroslider/AdminHeroSliders";
import AddSlider from "./pages/admin/adminheroslider/AddSlider";
import AddFAQ from "./pages/admin/adminheroslider/AddFAQ";

// private routes
// import Privacy from "./pages/privacy/Privacy";
// import Terms from "./pages/terms/Terms";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import AdminRoute from "./components/auth/AdminRoute";

function App() {
  return (
    <>
      <ScrollToTopSetter />

      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/destinations" element={<Destinations />} />
                  <Route
                    path="/destinations/:id"
                    element={<DestinationDetails />}
                  />
                  <Route path="/tours" element={<TourPage />} />
                  <Route path="/tours/:id" element={<TourDetails />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:id" element={<BlogDetails />} />
                  <Route path="/visa-service" element={<VisaService />} />
                  <Route path="/visa-service/:id" element={<VisaDetails />} />
                  <Route path="/air-tickets" element={<AirTickets />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={ <PublicRoute> <Login /> </PublicRoute>} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />

        {/* Admin Layout  (Header/Footer not included) */}
        <Route path="/admin" element={ <PrivateRoute> <AdminLayout /> </PrivateRoute> }>
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Admins & Mods */}
          <Route path="/admin/slider-fqn-and-about" element={< AdminHeroSlider />} />
          <Route path="add-slider" element={<AddSlider />} />
          <Route path="edit-slider/:id" element={<AddSlider />} />

          <Route path="add-faq" element={<AddFAQ />} />
          <Route path="edit-faq/:id" element={<AddFAQ />} />

          {/* Tours */}
          <Route path="/admin/tours" element={<ManageTours />} />
          <Route path="add-tour" element={<AddTour />} />
          <Route path="edit-tour/:id" element={<AddTour />} />


          {/* visa */}
          <Route path="/admin/visas" element={<Visa />} />
          <Route path="add-visa" element={<AddVisa />} />
          <Route path="edit-visa/:id" element={<AddVisa />} />


          {/* Destinations */}
          <Route path="/admin/destinations" element={<ManageDestinations />} />
          <Route path="add-destination" element={<AddDestination />} />
          <Route path="edit-destination/:id" element={<AddDestination />} />


          {/* Blog */}
          <Route path="/admin/blog" element={<ManageBlog />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="edit-blog/:id" element={<AddBlog />} />


          {/* Air Tickets */}
          <Route path="/admin/tickets" element={<AdminAirTickets />} />
          <Route path="add-air-ticket" element={<AddAirTicket />} />
          <Route path="edit-air-ticket/:id" element={<AddAirTicket />} />


          {/* Inbox */}
          <Route path="/admin/inbox" element={<ManageInbox />} />


          {/* Admins and Mods */}
          <Route path="/admin/users" element={<AdminsAndMods />} />
          <Route path="add-admin-and-moderator" element={ <AdminRoute> <AddTeamMember /> </AdminRoute>} />
          <Route
            path="edit-admin-and-moderator/:id"
            element={<AdminRoute> <AddTeamMember /> </AdminRoute>}
          />
          <Route path="/admin/profile" element={<AdminProfile />} />{" "}
          {/* My Profile */}
          <Route
            path="/admin/view-profile/:id"
            element={<AdminProfile />}
          />{" "}


          {/* View Others */}
          {/* Settings */}
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
