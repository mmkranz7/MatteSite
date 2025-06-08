import React, { useEffect, useState } from "react";
import "../Styles/QuoteSection.css";
import SpinningCircle from "./SpinningCircle";

const QuoteSection: React.FC = () => {
  const [isStyleChanged, setIsStyleChanged] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStyleChanged(true);
    }, 15000); // 20 seconds

    return () => clearTimeout(timer); // Clean up timeout on component unmount
  }, []);

  return (
    <div
      className={`quote-section ${
        isStyleChanged ? "quote-section-changed" : ""
      }`}
    >
      <p
        className={`quote-line-top ${
          isStyleChanged ? "quote-line-top-changed" : ""
        }`}
      >
        The computer is a theater,
      </p>
      <div className="spinning-circle-wrapper">
        <SpinningCircle />
      </div>
      <div className="bottom-line-wrapper">
        <p
          className={`quote-line-bottom ${
            isStyleChanged ? "quote-line-bottom-changed" : ""
          }`}
        >
          and the screen is the stage.
        </p>
        <p
          className={`quote-author ${
            isStyleChanged ? "quote-author-changed" : ""
          }`}
        >
          - Brenda Laurel
        </p>
      </div>
    </div>
  );
};

export default QuoteSection;
