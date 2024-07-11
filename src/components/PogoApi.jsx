import React, { useState, useEffect } from "react";

const PogoApi = ({ setArr }) => {
  useEffect(() => {
    async function fetchData() {
      try {
        const totalResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/`
        );
        const totalData = await totalResponse.json();
        const totalPokemon = totalData.count;

        const randomIndices = [];
        while (randomIndices.length < 12) {
          const randomIndex = Math.floor(Math.random() * totalPokemon) + 1;
          if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
          }
        }

        const promises = randomIndices.map((index) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${index}`).then((response) =>
            response.json()
          )
        );
        const results = await Promise.all(promises);

        const processedResults = results.map((el) => ({
          name: el.name,
          isClicked: false,
          timesClicked: 0,
        }));

        setArr(processedResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [setArr]);

  return null;
};
export default PogoApi;
