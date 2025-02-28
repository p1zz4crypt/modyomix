/**
 * The `Header` component in the provided code snippet displays player information, match statistics,
 * time, and shows a motivational emoji message based on errors.
 * @returns The `Header` component is being returned in the provided code snippet. It displays player
 * information such as name, matches, errors, and time. It also includes a feature that shows a
 * motivational emoji message when the number of errors is a multiple of 5. The component structure
 * includes HTML elements styled with Bootstrap classes and CSS for layout and design.
 */
import React, { useState, useEffect } from "react";
import "../estilos/estilos.css";

const Header = ({ playerName, matches, errors, time }) => {
  const [showEmoji, setShowEmoji] = useState(false);


/**
 * The `formatTime` function takes a time in seconds and returns it in the format "minutes:seconds".
 * @returns The `formatTime` function returns a formatted time string in the format "minutes:seconds".
 * If the seconds are less than 10, it adds a leading zero before the seconds.
 */
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };


/* The `useEffect` hook in the provided code snippet is responsible for showing and hiding an emoji
message based on the number of errors. Here's a breakdown of what it does: */
  useEffect(() => {
    if (errors > 0 && errors % 5 === 0) {
      setShowEmoji(true); 
      const timeout = setTimeout(() => {
        setShowEmoji(false); 
      }, 2000); 
      return () => clearTimeout(timeout);
    }
  }, [errors]);

  return (
    <header className="p-4 text-center d-flex justify-content-around align-items-center">
      <div className="mt-2">
        <p>
          👾<b>Player:</b> {playerName}
        </p>
        <p>
          💘<b>Matches: </b>
          {matches} | 💔<b>Unmatches:</b> {errors}
        </p>
        <div className="mt-2">
          <p>
            ⏱️<b>Time:</b> {formatTime(time)}
          </p>
          {/* Siempre renderiza el elemento, pero controla su visibilidad con la clase */}
          <p className={`emoji-transition ${showEmoji ? "show" : ""}`}>
            🤩 ¡Tú puedes, {playerName}!
          </p>
        </div>
      </div>
      <h1 className="font-bold">
        Modyo<b>Mix</b>
      </h1>
    </header>
  );
};

export default Header;