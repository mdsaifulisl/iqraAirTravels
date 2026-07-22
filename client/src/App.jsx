
import React from "react";
import AppRoutes from "./routers/AppRoutes";
import ScrollToTopSetter from "./components/layout/ScrollToTopSetter";

// Stylesheet Imports
import "./assets/style/shared.css";
import "./assets/style/pages.css";

function App() {
  return (
    <>
      <ScrollToTopSetter />
      <AppRoutes />
    </>
  );
}

export default App;