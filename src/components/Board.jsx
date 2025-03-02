import React, { useState, useEffect } from "react";
import { getAnimals } from "../services/api";

const Board = ({ setMatches, setErrors, updateTotalPairs }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);

  /* The `useEffect` hook in the provided code snippet is responsible for initializing the game board
when the component mounts. Here's a breakdown of what it does: */
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
      updateTotalPairs(animalImages.length);
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
   * The function `handleCardClick` flips a card in a memory card game and checks for a match if two
   * cards are flipped.
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
    <>
      <div className="board grid grid-cols-10 gap-10 p-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? "flipped" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-face card-back shadow-lg"></div>
            <div className="card-face card-front shadow-lg">
              <img
                src={card.image}
                alt="Animal"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
      <div></div>
    </>
  );
};

export default Board;
