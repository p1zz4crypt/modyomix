/**
 * The App component in this React application manages the game state, player information, timer, and
 * rendering of components like Board, Header, Modal, and StartModal.
 * @returns The `App` component is being returned, which contains the structure of the application
 * including the `StartModal`, `Header`, `Board`, and `Modal` components. The content displayed depends
 * on the state values such as `isStartModalOpen`, `gameOver`, and the game progress (matches, errors,
 * time).
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
  const [totalPairs, setTotalPairs] = useState(0);

/* The `useEffect` hook in the provided code snippet is responsible for running a side effect when the
component mounts for the first time. Here's a breakdown of what it does: */
  useEffect(() => {
    const savedName = localStorage.getItem("playerName");
    if (savedName) {
      setPlayerName(savedName);
      setIsTimerRunning(true); 
    } else {
      setIsStartModalOpen(true);
    }
  }, []);

/* The `useEffect` hook you provided is responsible for running a side effect when the dependencies
`matches` and `totalPairs` change. Here's a breakdown of what it does: */
  useEffect(() => {
    if (matches === totalPairs && totalPairs > 0) {
      console.log("Juego terminado");
      setGameOver(true);
      setIsTimerRunning(false); 
    }
  }, [matches, totalPairs]);

/* The `useEffect` hook you provided is responsible for managing the timer functionality in the React
application. Here's a breakdown of what it does: */
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

/**
 * The `handleFinish` function resets various game-related states and opens the start modal.
 */
  const handleFinish = () => {
    localStorage.removeItem("playerName");
    setPlayerName("");
    setIsStartModalOpen(true);
    setMatches(0);
    setErrors(0);
    setTime(0);
    setIsTimerRunning(false);
    setGameOver(false);
  };

/**
 * The function `updateTotalPairs` updates the total number of pairs.
 * @param total - The `total` parameter in the `updateTotalPairs` function represents the total number
 * of pairs that you want to update.
 */
  const updateTotalPairs = (total) => {
    setTotalPairs(total);
  };

  return (
    <div className="app">
      {isStartModalOpen && <StartModal onStart={handleStart} />}

      {!isStartModalOpen && (
        <>
        
          <Header
            playerName={playerName}
            matches={matches}
            errors={errors}
            time={time}
            onFinish={handleFinish}
          />
          <Board
            setMatches={setMatches}
            setErrors={setErrors}
            updateTotalPairs={updateTotalPairs}
          />
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
  );
};

export default App;
