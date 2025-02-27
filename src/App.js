
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

  return (
    <div className="app">
      <Board setMatches={setMatches} setErrors={setErrors} />
      {gameOver}
    </div>
  );
};

export default App;
