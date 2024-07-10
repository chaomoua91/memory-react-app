import { useState, useEffect } from "react";
import Card from "./components/Card";
import "./App.css";

export default function App() {
  return (
    <>
      <header>
        <h1>Pokémon Memory Game!</h1>
        <div className="score-container">
          {/* <p>Score:{score}</p>
          <p>Best Score:{bestScore}</p> */}
        </div>
      </header>
    </>
  );
}
