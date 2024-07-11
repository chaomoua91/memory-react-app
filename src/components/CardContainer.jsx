import React from "react";
import Card from "./Card"; // Assuming Card component is defined

const CardContainer = ({ arr, handleCardChange }) => (
  <Card array={arr} onClick={handleCardChange} />
);

export default CardContainer;
