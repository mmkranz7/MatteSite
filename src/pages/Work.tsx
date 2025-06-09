import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import headshot from "../assets/headshot.jpg";
import theFlyImage from "../assets/thefly.jpg";
import boringDystopiaImage from "../assets/boringdystopia.jpg";
import tornPaperTitle from "../assets/Paper03.png";
import tornPaperFilm from "../assets/Paper04.png";
import tornPaperCurrent from "../assets/Paper04.png";
import PageWrapper from "../pages/PageWrapper";
import { getDistinctTopAndBottomTape } from "../utils/tapeOptions";
import "../Styles/Work.css";

const Work: React.FC = () => {
  const navigate = useNavigate();
  const [topTape, setTopTape] = useState<any>(null);
  const [botTape, setBotTape] = useState<any>(null);

  useEffect(() => {
    const { top, bottom } = getDistinctTopAndBottomTape();
    setTopTape(top);
    setBotTape(bottom);
  }, []);

  return (
    <PageWrapper>
      <div className="work-page">
        {/* Headshot with tape */}
        <div className="headshot-wrapper">
          <div className="image-inner">
            <img src={headshot} alt="Headshot" className="headshot" />
            {topTape && (
              <img
                src={topTape.src}
                alt="Top tape"
                className="tape-overlay"
                style={{
                  transform: `rotate(${topTape.rotation})`,
                  top: topTape.top || "-20px",
                  left: topTape.left || "10px",
                }}
              />
            )}
            {botTape && (
              <img
                src={botTape.src}
                alt="Bottom tape"
                className="tape-overlay"
                style={{
                  transform: `rotate(${botTape.rotation})`,
                  bottom: botTape.bottom || "-20px",
                  right: botTape.right || "10px",
                }}
              />
            )}
          </div>
        </div>

        {/* NAME + BLURB */}
        <div className="torn-paper-section">
          <img
            src={tornPaperTitle}
            alt=""
            className="torn-paper-bg"
            aria-hidden="true"
          />
          <h1 className="work-title">Matte Kranz</h1>
          <p className="blurb">filmmaker, actor, and artist</p>
        </div>

        {/* FILM SECTION */}
        <div className="torn-paper-section">
          <img
            src={tornPaperFilm}
            alt=""
            className="torn-paper-bg"
            aria-hidden="true"
          />
          <section className="film-section">
            <h2>Self Created Projects</h2>
            <ul className="film-list">
              <li>
                <strong>The Fly</strong> — A man thinks he has his life together
                until isolation and a pest unravel his world.
              </li>
              <li>
                <strong>A Boring Dystopia</strong> — Four lives subtly collide
                in a sterile future marred by a shared trauma.
              </li>
            </ul>
            <div className="project-gallery">
              <a
                href="https://vimeo.com/590090749?share=copy#t=0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={theFlyImage}
                  alt="The Fly"
                  className="project-thumb"
                />
              </a>
              <a
                href="https://vimeo.com/user148270818/abd"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={boringDystopiaImage}
                  alt="A Boring Dystopia"
                  className="project-thumb"
                />
              </a>
            </div>
          </section>
        </div>

        {/* CURRENT PROJECT */}
        <div className="torn-paper-section">
          <img
            src={tornPaperCurrent}
            alt=""
            className="torn-paper-bg"
            aria-hidden="true"
          />
          <section className="current-project">
            <h2>Currently:</h2>
            <p>multiple film projects in development, to be announced.</p>
          </section>
        </div>
        <div className="imdb-button-wrapper">
          <a
            href="https://pro.imdb.com/name/nm7739239?s=66cbab42-4f8d-2506-c7c9-7ceff10e70aa&site_preference=normal"
            target="_blank"
            rel="noopener noreferrer"
            className="imdb-button"
          >
            View IMDb Profile
          </a>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Work;
