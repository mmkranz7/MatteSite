import React, { useState, useEffect } from "react";
import "../Styles/DefaultPage.css";
import PageWrapper from "../pages/PageWrapper"; // adjust path as needed
import { Link } from "react-router-dom";
import { getDistinctTopAndBottomTape } from "../utils/tapeOptions";
import portrait from "../assets/portrait02.jpg"; // ensure this path is correct

const Home: React.FC = () => {
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
      <div className="home">
        <header className="nameplate">
          <img
            src="src/assets/Paper07.png"
            alt=""
            style={{
              position: "absolute",
              top: "-12px",
              left: "0",
              width: "100%",
              height: "calc(100% + 24px)", // covers spill above and below
              objectFit: "cover",
              zIndex: 0,
              pointerEvents: "none",
              userSelect: "none",
              opacity: 0.85,
              borderRadius: "6px",
            }}
          />
          <span className="text-content">
            Mateusz <span className="nickname">'Matte'</span> Kranz
          </span>
        </header>
        <main className="portrait-row">
          <div className="portrait-container">
            <img
              src={portrait} // make sure it's in the public folder or update the path
              alt="Mateusz Kranz portrait"
              className="portrait"
            />
            {topTape && (
              <img
                src={topTape.src}
                alt="Tape overlay top"
                className="tape-overlay"
                style={{
                  transform: `rotate(${topTape.rotation})`,
                  top: topTape.top,
                  left: topTape.left,
                  position: "absolute",
                }}
              />
            )}
            {botTape && (
              <img
                src={botTape.src}
                alt="Tape overlay bottom"
                className="tape-overlay"
                style={{
                  transform: `rotate(${botTape.rotation})`,
                  bottom: botTape.bottom,
                  right: botTape.right,
                  position: "absolute",
                }}
              />
            )}
          </div>
          <div className="nav-buttons">
            <Link
              to="/work"
              style={{ position: "relative", display: "inline-block" }}
            >
              <img
                src="src/assets/Paper01.png"
                alt=""
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                  opacity: 0.85,
                  borderRadius: "6px", // optional to match button style
                }}
              />
              <button style={{ position: "relative", zIndex: 1 }}>
                my work
              </button>
            </Link>
            <Link
              to="/photography"
              style={{ position: "relative", display: "inline-block" }}
            >
              <img
                src="src/assets/Paper02.png"
                alt=""
                style={{
                  position: "absolute",
                  top: -5,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                  opacity: 0.85,
                  borderRadius: "6px",
                }}
              />
              <button style={{ position: "relative", zIndex: 1 }}>
                photography
              </button>
            </Link>
            <Link
              to="/writing"
              style={{ position: "relative", display: "inline-block" }}
            >
              <img
                src="src/assets/Paper03.png"
                alt=""
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                  opacity: 0.85,
                  borderRadius: "6px",
                }}
              />
              <button style={{ position: "relative", zIndex: 1 }}>
                thoughts
              </button>
            </Link>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
};

export default Home;
