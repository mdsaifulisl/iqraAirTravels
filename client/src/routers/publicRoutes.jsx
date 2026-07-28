import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// Public Route Guard
import PublicRoute from "../components/auth/PublicRoute";

// Pages
import Home from "../pages/clients/home/Home";
import About from "../pages/clients/about/About";
import Destinations from "../pages/clients/destinations/Destinations";
import DestinationDetails from "../pages/clients/destinations/DestinationDetails";
import TourPage from "../pages/clients/tourPage/TourPage";
import TourDetails from "../pages/clients/tourPage/TourDetails";
import BlogPage from "../pages/clients/blogPage/BlogPage";
import BlogDetails from "../pages/clients/blogPage/BlogDetails";
import VisaService from "../pages/clients/visaService/VisaService";
import VisaDetails from "../pages/clients/visaService/VisaDetails";
import AirTickets from "../pages/clients/airTicketDeals/AirTickets";
import Contact from "../pages/clients/contact/Contact";
import Login from "../pages/login/Login";
import ErrorPage from "../pages/error/ErrorPage";
import Booking from "../pages/clients/booking/Booking";
const PublicRoutes = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hajj&umrah" element={<Destinations />} />
          <Route path="/hajj&umrah/:id" element={<DestinationDetails />} />
          <Route path="/tours" element={<TourPage />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/visa-service" element={<VisaService />} />
          <Route path="/visa-service/:id" element={<VisaDetails />} />
          <Route path="/air-tickets" element={<AirTickets />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default PublicRoutes;
