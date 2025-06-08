import React, { useState, useEffect } from "react";
import headshot from "../assets/headshot.jpg";
import "../Styles/Acting.css";
import "../pages/PageWrapper";
import { getDistinctTopAndBottomTape } from "../utils/tapeOptions";
import PageWrapper from "../pages/PageWrapper";

const Acting: React.FC = () => {
  const [topTape, setTopTape] = useState<{
    src: string;
    rotation: string;
    top: string;
    left: string;
  } | null>(null);

  const [botTape, setBotTape] = useState<{
    src: string;
    rotation: string;
    bottom: string;
    right: string;
  } | null>(null);

  useEffect(() => {
    const { top, bottom } = getDistinctTopAndBottomTape();
    setTopTape(top);
    setBotTape(bottom);
  }, []);

  return (
    <PageWrapper>
      <div className="acting-page">
        <div className="acting-content">
          <div className="portrait-container">
            <div className="image-wrapper">
              <img
                src={headshot}
                alt="Matte Kranz Headshot"
                className="headshot"
              />
              {topTape && (
                <img
                  src={topTape.src}
                  alt="Tape overlay top"
                  className="tape-overlay"
                  style={{
                    position: "absolute",
                    transform: `rotate(${topTape.rotation})`,
                    top: topTape.top,
                    left: topTape.left,
                  }}
                />
              )}
              {botTape && (
                <img
                  src={botTape.src}
                  alt="Tape overlay bottom"
                  className="tape-overlay"
                  style={{
                    position: "absolute",
                    transform: `rotate(${botTape.rotation})`,
                    bottom: botTape.bottom,
                    right: botTape.right,
                  }}
                />
              )}
            </div>
          </div>
          <div className="bio">
            <p>
              <span className="highlight">Matte Kranz</span> is an actor,
              filmmaker, and artist.
            </p>
            <p>Insert formal bio here.</p>
            <p>
              Based in New York, Matte is pursuing his MFA in Acting at Columbia
              University.
            </p>
          </div>
          <div className="nav-buttons bottom-right-fixed">
            <button
              className="button"
              onClick={() =>
                window.open(
                  "https://actorsaccess.com/actor/preview/actor_details.cfm?tab=video",
                  "_blank"
                )
              }
            >
              View Reel
            </button>
            <button
              className="button"
              onClick={() => (window.location.href = "/gallery")}
            >
              View Gallery
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Acting;
