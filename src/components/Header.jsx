// components/Header.jsx
import React from "react";
import "../estilos/estilos.css"

const Header = ({ playerName, matches, errors }) => {
  return (
    <header className=" p-4 text-center">
      <div className="mt-2">
        <p>👾<b>Player:</b> {playerName}</p>
        <p>💘<b>Matches: </b>{matches} | 💔<b>Unmatches:</b> {errors}</p>
      </div>
      <h1 className="text-2xl font-bold">Modyo<b>Mix</b></h1>
    </header>
  );
};

export default Header;