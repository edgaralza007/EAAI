import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import EAACapitalLanding from "./EAACapitalLanding.jsx";
import Portfolio from "./Portfolio.jsx";
import About from "./About.jsx";
import CaseStudyDetail from "./CaseStudyDetail.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EAACapitalLanding />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<CaseStudyDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
