import React from "react";
import theFlyImage from "../assets/thefly.jpg";
import boringDystopiaImage from "../assets/boringdystopia.jpg";
import PageWrapper from "../pages/PageWrapper"; // adjust path as needed
import "../Styles/FilmMaking.css";

const FilmMaking: React.FC = () => {
  return (
    <PageWrapper>
      <div className="filmmaking-page">
        <div className="filmmaking-content">
          <h1>Film Projects</h1>
          <div className="project">
            <a
              href="https://vimeo.com/590090749?share=copy#t=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={theFlyImage} alt="The Fly" className="project-image" />
            </a>
            <div className="project-info">
              <h2>The Fly</h2>
              <p>
                A man dealing with isolation thinks he has his life together
                until he begins dealing with a pest.
              </p>
            </div>
          </div>
          <div className="project">
            <a
              href="https://vimeo.com/user148270818/abd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={boringDystopiaImage}
                alt="A Boring Dystopia"
                className="project-image"
              />
            </a>
            <div className="project-info">
              <h2>A Boring Dystopia</h2>
              <p>
                A group of four people live very similar yet distinctly
                different lives when they are unexpectedly brought together by a
                traumatic event.
              </p>
            </div>
          </div>
          <div className="spec-script">
            <h2>Current Project: Sylvie</h2>
            <p>
              Currently, I am developing Sylvie, a feature-length script that
              tells the story of a grieving husband in a secluded homestead who
              channels his sorrow into building a sentient version of his late
              wife, defying her last wishes. As the AI begins to grow and evolve
              beyond mere memory, a new spark of life emerges, offering both
              creator and creation a fragile glimmer of hope. This script delves
              into themes of isolation and the search for connection in a
              rapidly changing world, capturing the fragility of human
              relationships and the enduring strength found in vulnerability.
              Sylvie explores the delicate interplay between loss, resilience,
              and the unyielding human desire to create meaning in the face of
              despair.
            </p>
          </div>
        </div>
        <div className="nav-buttons bottom-right-fixed">
          {" "}
          <button
            className="nav-button"
            onClick={() =>
              window.open(
                "https://vimeo.com/590090749?share=copy#t=0",
                "_blank"
              )
            }
          >
            Watch The Fly
          </button>
          <button
            className="nav-button"
            onClick={() =>
              window.open("https://vimeo.com/user148270818/abd", "_blank")
            }
          >
            Watch A Boring Dystopia
          </button>
          <button
            className="nav-button"
            onClick={() =>
              window.open(
                "https://link.to.sylvie.pitchdeck", // Replace with the correct link
                "_blank"
              )
            }
          >
            View Sylvie Pitch Deck
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default FilmMaking;
