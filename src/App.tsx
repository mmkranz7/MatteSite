// App.tsx
import React from "react";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <div className="app">
      <TopBar />
      <Home />
    </div>
  );
};

export default App;
