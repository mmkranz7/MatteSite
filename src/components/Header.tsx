import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/Header.css";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Don’t show on home page
  if (location.pathname === "/") return null;

  return (
    <div className="top-left-home">
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
};

export default Header;
