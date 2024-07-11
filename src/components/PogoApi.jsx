import React, { useState, useEffect } from "react";

const PogoApi = ({ setArr }) => {
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
  }, []); // Fetch data on component mount

  return null;
};

export default PogoApi;
