/**
 * The `Modal` component in JavaScript React displays a congratulatory message to the player with their
 * name and completion time in minutes and seconds, along with a button to play again.
 * @returns The `Modal` component is being returned, which displays a congratulatory message to the
 * player with their name and the time it took to complete a challenge in minutes and seconds format.
 * It also includes a button to play again.
 */

import React from "react";
import "../estilos/estilos.css"

const Modal = ({ playerName, time, onClose }) => {
/**
 * The `formatTime` function takes a time value in seconds and returns it in the format of
 * minutes:seconds.
 * @returns The `formatTime` function returns a formatted time string in the format "minutes:seconds".
 * If the seconds are less than 10, it adds a leading zero before the seconds.
 */
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="position-fixed bg-dark bg-gradient top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
    <div className="p-5 bg-white rounded shadow text-center">
      <h2 className="fs-1 fw-bold">¡Bien hecho, {playerName} 🎉!</h2>
      <p className="mt-2">Completaste el desafío en: ⏱️ {formatTime(time)} minutos.</p>
      <button className="mt-3 btn" onClick={onClose}>¡Otra vez!</button>
    </div>
  </div>
  );
};

export default Modal;