import React from "react";
import "../Styles/QuoteSection.css";
import SpinningCircle from "./SpinningCircle";

const QuoteSection: React.FC = () => {
  return (
    <div className="quote-section">
      <p className="quote-line-top">The computer is a theater,</p>
      <div className="spinning-circle-wrapper">
        <SpinningCircle />
      </div>
      <div className="bottom-line-wrapper">
        <p className="quote-line-bottom">and the screen is the stage.</p>
        <p className="quote-author">- Brenda Laurel</p>
      </div>
    </div>
  );
};

export default QuoteSection;
