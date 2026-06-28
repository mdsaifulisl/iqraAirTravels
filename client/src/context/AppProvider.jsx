/* eslint-disable no-unused-vars */
import React from "react";
import { HelmetProvider } from 'react-helmet-async';
import { TourProvider } from "./TourContext";
import { DestinationProvider } from "./DestinationContext";
import { VisaProvider } from "./VisaContext";
import { AirTicketProvider } from "./AirTicketContext";
import { BlogProvider } from "./BlogContext";
import { ContactProvider } from "./ContactContext";
import { SliderProvider } from "./SliderContext";
import { FAQProvider } from "./FAQContext";
import { AboutProvider } from "./AboutContext";
import { SettingProvider } from "./SettingContext";
import { UserProvider } from "./UserContext";
import { AuthProvider } from "./AuthContext";

const AppProvider = ({ children }) => {
  // All providers in an array for easy management and nesting
  const providers = [
    HelmetProvider,
    VisaProvider,
    TourProvider,
    DestinationProvider,
    AirTicketProvider,
    BlogProvider,
    ContactProvider,
    SliderProvider,
    FAQProvider,
    AboutProvider,
    SettingProvider,
    UserProvider, 
    AuthProvider
  ];

  // ReduceRight to nest providers around children
  return (
    <>
      {providers.reduceRight((acc, Provider) => {
        return <Provider>{acc}</Provider>;
      }, children)}
    </>
  );
};

export default AppProvider;