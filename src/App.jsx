import { useState, useEffect } from "react";
import Card from "./components/Card";
import "./App.css";

export default function App() {
  const [arr, setArr] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [congratulations, setCongratulations] = useState(false);
  const [clickedName, setClickedName] = useState("");

  async function fetchData() {
    try {
      // Fetch the total number of Pokémon
      let totalResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/`
      );
      let totalData = await totalResponse.json();
      let totalPokemon = totalData.count;

      // Generate 12 random unique indices
      let randomIndices = [];
      while (randomIndices.length < 12) {
        let randomIndex = Math.floor(Math.random() * totalPokemon) + 1;
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }

      // Fetch details for the 12 random Pokémon
      let promises = randomIndices.map((index) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${index}`).then((response) =>
          response.json()
        )
      );
      let results = await Promise.all(promises);

      // Process the results
      let processedResults = results.map((el) => ({
        name: el.name,
        isClicked: false,
        timesClicked: 0,
      }));

      setArr(processedResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let random = Math.floor(Math.random() * (i + 1));
      [array[i], array[random]] = [array[random], array[i]];
    }
  }

  function settingScores(array, name) {
    array.forEach((element) => {
      if (element.name === name) {
        element.timesClicked += 1;
        if (element.timesClicked > 1) {
          setClickedName(name);
          setBestScore(Math.max(score, bestScore));
          setScore(0);
          setTimeout(() => {
            setGameOver(true);
          }, 500);
        } else {
          setScore(score + 1);
          if (score + 1 === array.length) {
            setBestScore(score + 1);
            setCongratulations(true);
          }
        }
      }
    });
  }

  function handleCardChange(name) {
    settingScores(arr, name);
    if (!gameOver && !congratulations) {
      shuffleArray(arr);
      setArr(
        arr.map((element) => {
          if (element.name === name) {
            return { ...element, isClicked: true };
          } else {
            return element;
          }
        })
      );
    }
  }
  console.log(handleCardChange);

  function handleRetry() {
    setGameOver(false);
    setCongratulations(false);
    setClickedName("");
    setScore(0);
    fetchData();
  }

  return (
    <>
      <header>
        <h1>Pokémon Memory Game!</h1>
        <div className="score-container">
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </header>
      {gameOver ? (
        <div className="game-over-container fade-in">
          <p className="game-over-text">
            Game Over! You clicked {clickedName} twice!
          </p>
          <button className="retry-button" onClick={handleRetry}>
            Retry
          </button>
        </div>
      ) : congratulations ? (
        <div className="congratulations-container fade-in">
          <p className="congratulations-text">
            Congratulations! You matched all the cards!
          </p>
          <button className="retry-button" onClick={handleRetry}>
            Play Again
          </button>
        </div>
      ) : (
        <Card array={arr} onclick={handleCardChange}></Card>
      )}
    </>
  );
}
