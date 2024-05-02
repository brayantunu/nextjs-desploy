import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import "../styles/button_all.css";
import Modalcreate from "./modalcreate";

export default function Buttonall({ onDelete, onEdit }) {
  const [showButtons, setShowButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShadowClick = () => {
    setShowButtons(!showButtons);
  };

  const handleModalClose = () => {
    setShowModal(false); // Oculta el modal al llamar esta función
  };

  const handleDeleteClick = () => {
    // Activar el modo de selección al presionar el botón Delete
    onDelete();
    setShowButtons(false); // Ocultar loss botones después de preionar Delete
  };

  return (
    <>
      <div className="main flex-col items-end content-center relative">
        <button
          onClick={handleShadowClick}
          title="Add New"
          className="group cursor-pointer outline-none hover:rotate-90 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            className="stroke-blue-400 fill-none group-hover:fill-blue-800 group-active:stroke-blue-200 group-active:fill-blue-600 group-active:duration-0 duration-300"
          >
            <path
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              strokeWidth="1.5"
            ></path>
            <path d="M8 12H16" strokeWidth="1.5"></path>
            <path d="M12 16V8" strokeWidth="1.5"></path>
          </svg>
        </button>

        {showButtons && (
          <div className="up mx-auto animate-slideIn">
            <button
              onClick={() => onEdit()} // Llama a la función onEdit cuando se hace clic en el botón
              className="card1 bg-sky-500 hover:bg-sky-700"
            >
              <Image
                className="edit"
                src="/edit.svg"
                width={40}
                height={40}
                alt="edit"
              />
            </button>
            <Modalcreate showModal={showModal} onClose={handleModalClose} /> {/* Pasamos showModal y onClose al componente Modalcreate */}
            <button
               onClick={handleDeleteClick} // Cambio aquí
              className="card3 bg-red-400 hover:bg-red-600"
            >
              <Image
                src="/delete.svg"
                width={40}
                height={40}
                alt="delete"
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
