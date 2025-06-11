// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

// import { ThemeProvider } from "./ctx/ThemeContext";

import Header from "./comp/Header/Header";
import SkipPage from "./pages/SkipPage/SkipPage";

import "./App.css";

function App() {
  return (
    <div className="app">
      {/* <ThemeProvider> */}
      <Header />

      <SkipPage />
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
