/**
 * The `App` component in this React application manages player input, game state, and rendering the
 * game board.
 * @returns The `App` component is being returned. Inside the `App` component, there is a `div` with
 * the className "app" containing the `Board` component and the `gameOver` state variable.
 */
/**
 * The App component in this React application manages player input, game state, and rendering the game
 * board.
 * @returns The `App` component is being returned. Inside the `App` component, there is a `div` with
 * the className "app" containing the `Board` component and the `gameOver` state variable.
 */
import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import Header from "./components/Header";
import Modal from "./components/Modal";
import "./estilos/estilos.css";

const App = () => {
  const [playerName, setPlayerName] = useState("");
  const [matches, setMatches] = useState(0);
  const [errors, setErrors] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const name = prompt("Cuál es tu nombre?:");
    setPlayerName(name);
  }, []);

  useEffect(() => {
    if (matches === 10) {
      setGameOver(true);
    }
  }, [matches]);

  const restartGame = () => {
    setMatches(0);
    setErrors(0);
    setGameOver(false);
  };

  return (
    <div className="app">
      <Header playerName={playerName} matches={matches} errors={errors} />

      <Board  setMatches={setMatches} setErrors={setErrors}/>


      {gameOver && <Modal playerName={playerName} onClose={restartGame} />}
    </div>
  );
};

export default App;
