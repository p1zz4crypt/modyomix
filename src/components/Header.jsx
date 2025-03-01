import React, { useState, useEffect } from "react";
import "../estilos/estilos.css";

const Header = ({ playerName, matches, errors, time, onFinish }) => {
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
        <p className="text-capitalize">
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
          <p className={`emoji-transition ${showEmoji ? "show" : ""}`}>
            🤩 ¡Tú puedes, {playerName}!
          </p>
          <div className="d-flex">
          <button className="btn" onClick={onFinish}>Salir</button>
          </div>
        </div>
      </div>
      <h1 className="font-bold">
        Modyo<b>Mix</b>
      </h1>
    </header>
  );
};

export default Header;