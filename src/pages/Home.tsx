import React, { useState, useEffect } from "react";
import "../Styles/DefaultPage.css";
import PageWrapper from "../pages/PageWrapper"; // adjust path as needed
import { Link } from "react-router-dom";
import { getDistinctTopAndBottomTape } from "../utils/tapeOptions";
import portrait from "../assets/Portrait.jpg"; // ensure this path is correct

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
          Mateusz <span className="nickname">'Matte'</span> Kranz
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
            <Link to="/work">
              <button>my work</button>
            </Link>
            <Link to="/photography">
              <button>photography</button>
            </Link>
            <Link to="/writing">
              <button>thoughts</button>
            </Link>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
};

export default Home;
