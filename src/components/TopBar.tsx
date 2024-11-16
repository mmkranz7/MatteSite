// TopBar.tsx
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../Styles/TopBar.css";

gsap.registerPlugin(ScrollTrigger);

const TopBar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Add button swing animation
    const navButtons = document.querySelectorAll(".nav-button");
    navButtons.forEach((button) => {
      const btn = button as HTMLElement;

      btn.addEventListener("mouseenter", () => {
        btn.style.animation = "none"; // Remove existing animation
        btn.offsetHeight; // Trigger reflow
        btn.style.animation = "swing 2s ease-in-out forwards"; // Reapply animation
      });
    });

    return () => {
      navButtons.forEach((button) => {
        const btn = button as HTMLElement;
        btn.removeEventListener("mouseenter", () => {});
      });
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className="top-bar">
      <div className="nav-buttons">
        <button className="nav-button">HOME</button>
        <button className="nav-button">DEV & DESIGN</button>
        <button className="nav-button">ACTING</button>
        <button className="nav-button">FILMMAKING</button>
      </div>
      <div className="dark-mode-toggle-container">
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default TopBar;
