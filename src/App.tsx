import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Acting from "./pages/Acting";
import Photography from "./pages/Photography";
import Writing from "./pages/Writing";
import Filmmaking from "./pages/FilmMaking";
import UIDevDesign from "./pages/DevDesign";
import Work from "./pages/Work";
import "./Styles/index.css";

const App: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acting" element={<Acting />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/work" element={<Work />} />
        <Route path="/filmmaking" element={<Filmmaking />} />
        <Route path="/ui-dev-design" element={<UIDevDesign />} />
      </Routes>
    </div>
  );
};

export default App;
