import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/Transitions.css";
import "../Styles/Header.css"; // Add this if you haven't already

// Import torn paper image properly:
import paper04 from "../assets/Paper04.png";

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setIsLoaded(true), 50);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <div className={`page-transition ${isLoaded ? "fade-in" : "invisible"}`}>
      {location.pathname !== "/" && (
        <div className="top-left-home">
          <button onClick={() => navigate("/")}>Home</button>
          <img
            src={paper04}
            alt="torn paper decoration"
            className="torn-paper"
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default PageWrapper;
