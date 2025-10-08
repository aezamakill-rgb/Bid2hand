import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Auction from "./pages/Auction.jsx";
import Game from "./pages/Game.jsx";
import About from "./pages/About.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="auction" element={<Auction />} />
        <Route path="game" element={<Game />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
