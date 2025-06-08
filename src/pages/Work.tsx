import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Work.css";
import PageWrapper from "../pages/PageWrapper"; // adjust path as needed

const Work: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="work-hub">
        <h1 className="work-title">My Work</h1>
        <div className="work-tiles">
          <div className="work-tile acting" onClick={() => navigate("/acting")}>
            <div className="tile-content">
              <h2>Acting</h2>
            </div>
          </div>

          <div
            className="work-tile film"
            onClick={() => navigate("/filmmaking")}
          >
            <div className="tile-content">
              <h2>Film + Writing</h2>
            </div>
          </div>

          <div
            className="work-tile design"
            onClick={() => navigate("/ui-dev-design")}
          >
            <div className="tile-content">
              <h2>UI Design + Dev</h2>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Work;
