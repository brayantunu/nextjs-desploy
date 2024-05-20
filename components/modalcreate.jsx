"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Textarea,
  Input,
} from "@nextui-org/react";
import Image from "next/image";
import "../styles/button_all.css";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../app/api/users/route";
export default function Modalcreate() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { authToken, isAuthenticated } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAuthenticated) {
        // Si el usuario no está autenticado, maneja el caso apropiado
        window.location.href = "/UserNotes/login";
        console.log(
          "Usuario no autenticado. Redirigir a la página de inicio de sesión o mostrar un mensaje de error."
        );
        return;
      }

      const response = await createNote();
      console.log(response.data);
      // Lógica adicional después de crear la nota, como redireccionar a otra página
      window.location.href = "/UserNotes";
    } catch (error) {
      console.error("Error al crear la nota:", error);
      // Mostrar un mensaje de error al usuario si es necesario
    }
  };

  const createNote = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4002/notes/new-note",
        { title, description },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <button onClick={onOpen} className="card2 bg-lime-400 hover:bg-lime-600">
        <Image
          className="add"
          src="/add.svg"
          width={40}
          height={40}
          alt="add"
        />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Notes
              </ModalHeader>
              <section>
                <ModalBody>
                  <h2 className="text-center">Crear Nota</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-5">
                      <Input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        label="Title"
                      />
                    </div>
                    <div className="w-full grid grid-cols-12 gap-4 mt-5">
                      <Textarea
                        variant="bordered"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        labelPlacement="outside"
                        placeholder="Enter your description"
                        className="col-span-12 md:col-span-20 "
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-[150px] m-auto bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
                    >
                      Crear N
                    </button>
                  </form>
                </ModalBody>
              </section>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
