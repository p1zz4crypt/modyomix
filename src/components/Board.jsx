// components/Board.jsx
import React, { useState, useEffect } from "react";
import { fetchAnimals } from "../services/api";

const Board = ({ setMatches, setErrors }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);

  // Inicializar el juego
  useEffect(() => {
    const initializeGame = async () => {
      const animalImages = await fetchAnimals();
      const duplicatedAnimals = [...animalImages, ...animalImages];
      const shuffledAnimals = shuffleArray(duplicatedAnimals);
      setCards(
        shuffledAnimals.map((image, index) => ({
          id: index,
          image,
          flipped: false,
        }))
      );
    };
    initializeGame();
  }, []);

  // Función para mezclar las cartas
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Función para manejar el clic en una carta
  const handleCardClick = (index) => {
    if (flippedCards.length < 2 && !cards[index].flipped) {
      const newCards = [...cards];
      newCards[index].flipped = true;
      setCards(newCards);
      setFlippedCards([...flippedCards, index]);

      if (flippedCards.length === 1) {
        checkForMatch(index);
      }
    }
  };

  // Función para comparar las cartas volteadas
  const checkForMatch = (index) => {
    const [firstIndex] = flippedCards;
    if (cards[firstIndex].image === cards[index].image) {
      setMatches((prevMatches) => prevMatches + 1); // Actualizar aciertos
    } else {
      setErrors((prevErrors) => prevErrors + 1); // Actualizar errores
      setTimeout(() => {
        const newCards = [...cards];
        newCards[firstIndex].flipped = false;
        newCards[index].flipped = false;
        setCards(newCards);
      }, 1000);
    }
    setFlippedCards([]);
  };

  return (
    <div className="board grid grid-cols-4 gap-4 p-4">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className={`card bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer ${
            card.flipped ? "flipped" : ""
          }`}
          onClick={() => handleCardClick(index)}
        >
          {card.flipped ? (
            <img
              src={card.image}
              alt="Animal"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="card-back w-full h-full bg-blue-300 rounded-lg"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Board;
