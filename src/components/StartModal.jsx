/**
 * The `StartModal` component in the provided code snippet displays a modal for starting a game,
 * allowing the user to enter their name and begin playing with a rotating set of words.
 */
import React, { useState, useEffect } from "react";
import "../estilos/estilos.css";

const StartModal = ({ onStart }) => {
  const [name, setName] = useState("");
  const [currentWord, setCurrentWord] = useState("Match😍");
  const [wordIndex, setWordIndex] = useState(0);

  const words = ["Mix😵‍💫", "Memory🤔", "Match😍"];

  /* The `useEffect` hook in the provided code snippet is setting up a timer interval that updates the
`currentWord` state every 2 seconds with a new word from the `words` array. Here's a breakdown of
what it's doing: */
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % words.length;
        setCurrentWord(words[newIndex]);
        return newIndex;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [words.length]);

  /**
   * The `handleStart` function checks if the `name` variable is not empty or only whitespace before
   * calling the `onStart` function with the `name` parameter.
   */
  const handleStart = () => {
    if (name.trim()) {
      onStart(name);
    }
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center">
      <div className=" p-6 rounded-lg text-center init">
        <div className="init modal--cont">
          <div className="modal--cont_img">
            <img
              src="https://www.azurian.com/sites/default/files/partners/modyo.png"
              alt="logo"
            />
          </div>
          <div className="modal--wrapper">
            <h1>Modyo</h1>
            <h1 className="font-bold flip">{currentWord}</h1>
          </div>
          <p className="fs-5 text">
            Voltea las cartas, encuentra los pares de animales y diviértete.{" "}
            <br /> ¡Cuidado con los errores, te harán perder el ritmo!
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa tu nombre"
            className="mt-4 p-2 text-capitalize bg-transparent border border-0 border-bottom text-white"
          />
          <button className="btn mt-4" onClick={handleStart}>
            Jugar
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartModal;
