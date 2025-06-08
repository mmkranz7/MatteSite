import React, { useState, useEffect } from "react";
import "../Styles/IntroSection.css";
import QuoteSection from "./QuoteSection";

const IntroSection: React.FC = () => {
  const [fontSize, setFontSize] = useState<string>("12vw");

  const updateFontSize = () => {
    const viewportWidth = window.innerWidth;
    const newFontSize = viewportWidth < 768 ? "10vw" : "min(12vw, 192px)";
    setFontSize(newFontSize);
  };

  useEffect(() => {
    updateFontSize();
    window.addEventListener("resize", updateFontSize);
    return () => window.removeEventListener("resize", updateFontSize);
  }, []);

  return (
    <section className="intro-section">
      <div className="intro-title-wrapper">
        <span
          className="intro-title"
          style={{ fontSize }} // Dynamically adjust font size
        >
          MATEUSZ "MATTE" KRANZ
        </span>
      </div>
      <QuoteSection />
    </section>
  );
};

export default IntroSection;
