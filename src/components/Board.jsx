/* This code snippet is a React component called `Board` that represents a memory card game. Here's a
breakdown of what the code does: */
import React, { useState, useEffect } from "react";
import { getAnimals } from "../services/api";

const Board = ({ setMatches, setErrors }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);


/* The `useEffect` hook in the `Board` component is used to perform side effects in function
components. In this specific case: */
  useEffect(() => {
    const initializeGame = async () => {
      const animalImages = await getAnimals();
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


/**
 * The `shuffleArray` function shuffles the elements of an array randomly.
 * @returns The `shuffleArray` function is returning the input array after it has been shuffled
 * randomly.
 */
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };


/**
 * The function `handleCardClick` in a React component allows flipping cards and checking for matches
 * when two cards are flipped.
 */
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


/**
 * The function `checkForMatch` compares the images of two flipped cards and updates the number of
 * matches or errors accordingly.
 */
  const checkForMatch = (index) => {
    const [firstIndex] = flippedCards;
    if (cards[firstIndex].image === cards[index].image) {
      setMatches((prevMatches) => prevMatches + 1); 
    } else {
      setErrors((prevErrors) => prevErrors + 1); 
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
