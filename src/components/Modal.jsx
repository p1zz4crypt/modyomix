// components/Modal.jsx
import React from "react";
import "../estilos/estilos.css"

const Modal = ({ playerName, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className=" p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-600">Felicidades, {playerName}!</h2>
        <p className="mt-2 text-gray-700">Completaste el desafío </p>
        <button
          onClick={onClose}
          className="mt-4 text-white px-4 py-2 rounded"
          style={{color: "#0a1627"}}
        >
         🚀 Jugar otra vez
        </button>
      </div>
    </div>
  );
};

export default Modal;