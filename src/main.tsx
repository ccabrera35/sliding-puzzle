import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { GameProvider } from "./context/GameContext.tsx";
import ThemeContextProvider from "./context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
