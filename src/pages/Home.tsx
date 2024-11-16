import React from "react";
import TopBar from "../components/TopBar";
import IntroSection from "../components/IntroSection";
import "../Styles/DefaultPage.css";

const Home: React.FC = () => {
  return (
    <div className="home-screen">
      <TopBar />
      <IntroSection />
    </div>
  );
};

export default Home;
