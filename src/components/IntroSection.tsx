import React from "react";
import "../Styles/IntroSection.css";
import QuoteSection from "./QuoteSection";

const IntroSection: React.FC = () => {
  return (
    <section className="intro-section">
      <h1 className="intro-title">Mateusz Kranz</h1>
      <QuoteSection />
    </section>
  );
};

export default IntroSection;
