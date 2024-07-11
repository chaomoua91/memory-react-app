import { useState, useEffect } from "react";
import Header from "./components/Header";
import GameOver from "./components/GameOver";
import Score from "./components/Score";
import Card from "./components/Card";
import Congratulations from "./components/Congratulations";
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

  function handleRetry() {
    setGameOver(false);
    setCongratulations(false);
    setClickedName("");
    setScore(0);
    fetchData();
  }

  return (
    <>
      <Header />
      <Score score={score} bestScore={bestScore} />
      {gameOver && (
        <GameOver clickedName={clickedName} handleRetry={handleRetry} />
      )}
      {congratulations && <Congratulations handleRetry={handleRetry} />}

      <Card array={arr} onclick={handleCardChange}></Card>
    </>
  );
}
