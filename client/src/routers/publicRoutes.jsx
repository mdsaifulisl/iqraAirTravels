import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// Public Route Guard
import PublicRoute from "../components/auth/PublicRoute";

// Pages
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Destinations from "../pages/destinations/Destinations";
import DestinationDetails from "../pages/destinationDetails/DestinationDetails";
import TourPage from "../pages/tourPage/TourPage";
import TourDetails from "../pages/tourDetails/TourDetails";
import BlogPage from "../pages/blogPage/BlogPage";
import BlogDetails from "../pages/blogDetails/BlogDetails";
import VisaService from "../pages/visaService/VisaService";
import VisaDetails from "../pages/visaDetails/VisaDetails";
import AirTickets from "../pages/airTicketDeals/AirTickets";
import Contact from "../pages/contact/Contact";
import Login from "../pages/login/Login";
import ErrorPage from "../pages/error/ErrorPage";

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