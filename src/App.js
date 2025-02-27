
/**
 * The App component in this React application manages player input, game state, and rendering the game
 * board.
 * @returns The `App` component is being returned. Inside the `App` component, there is a `div` with
 * the className "app" containing the `Board` component and the `gameOver` state variable.
 */
import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import "./"

const App = () => {
  const [playerName, setPlayerName] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [matches, setMatches] = useState(0);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    const name = prompt("Enter your name:");
    setPlayerName(name);
  }, []);

/**
 * The App component in this React application manages the state for player name, number of matches,
 * errors, and game over status, and renders the Board component.
 * @returns The `App` component is being returned, which contains the JSX code for rendering the
 * application. It includes a `Board` component with props `setMatches` and `setErrors`.
 */

import React, { useState, useEffect } from "react";
import Board from "./components/Board";

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

  return (
    <div className="app">
      <Board setMatches={setMatches} setErrors={setErrors} />
      {gameOver}
    </div>
  );
};;

export default App;
