/**
 * The `App` function in this React component manages the game state, player interactions, timer, and
 * rendering of components for a memory matching game.
 * @returns The `App` component is being returned, which contains the structure of the application
 * including the header, board, start modal, footer, and game over modal. The content displayed depends
 * on the state values such as `isStartModalOpen`, `gameOver`, and the game variables like
 * `playerName`, `matches`, `errors`, and `time`.
 */

import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import Header from "./components/Header";
import Modal from "./components/Modal";
import StartModal from "./components/StartModal";
import "./estilos/estilos.css";

const App = () => {
  const [playerName, setPlayerName] = useState("");
  const [matches, setMatches] = useState(0);
  const [errors, setErrors] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isStartModalOpen, setIsStartModalOpen] = useState(false); 
  const [time, setTime] = useState(0); 
  const [isTimerRunning, setIsTimerRunning] = useState(false); 
 
/* The `useEffect` hook you provided is responsible for checking if there is a saved player name in the
local storage. Here's a breakdown of what it does: */
  useEffect(() => {
    const savedName = localStorage.getItem("playerName");
    if (savedName) {
      setPlayerName(savedName); 
    } else {
      setIsStartModalOpen(true); 
    }
  }, []);


/* The `useEffect` hook you provided is responsible for checking if the number of `matches` in the game
has reached 10. Here's a breakdown of what it does: */
  useEffect(() => {
    if (matches === 10) {
      setGameOver(true);
      setIsTimerRunning(false); 
    }
  }, [matches]);


/* This `useEffect` hook is responsible for managing the timer in the game. Here's a breakdown of what
it does: */
   useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1); 
      }, 1000);
    }
    return () => clearInterval(interval); 
  }, [isTimerRunning]);


/**
 * The `restartGame` function resets game variables and opens the start modal.
 */
  const restartGame = () => {
    setMatches(0);
    setErrors(0);
    setGameOver(false);
    setTime(0); 
    setIsStartModalOpen(true); 
    setIsTimerRunning(false); 
  };


/**
 * The `handleStart` function sets the player's name, saves it to local storage, closes the start
 * modal, resets the timer, and starts the timer.
 * @param name - The `name` parameter is a string that represents the player's name.
 */
  const handleStart = (name) => {
    setPlayerName(name);
    localStorage.setItem("playerName", name); 
    setIsStartModalOpen(false); 
    setTime(0); 
    setIsTimerRunning(true); 
  };

  return (
    <div className="app">
      <div className="app-container">
        {isStartModalOpen && <StartModal onStart={handleStart} />}
        {!isStartModalOpen && (
          <>
            <Header
              playerName={playerName}
              matches={matches}
              errors={errors}
              time={time}
            />
            <Board setMatches={setMatches} setErrors={setErrors} />
            <footer className="text-center p-5">
              <p className="text-white fw-lighter">
                Hecho con 💖 por Adriana Rosas
              </p>
            </footer>
          </>
        )}
        {gameOver && (
          <Modal playerName={playerName} time={time} onClose={restartGame} />
        )}
      </div>
    </div>
  );
};

export default App;
