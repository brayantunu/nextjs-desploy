"use client";
import { useState } from "react";
import axios from "axios";
import Flash from "@/components/Flash";
import { useAuth } from '../AuthContext'; // Importa el hook useAuth

import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Image,
  Input,
  Textarea,
} from "@nextui-org/react";

export default function NotesApp() {
  const [flashMessage, setFlashMessage] = useState(null);
  const { authToken } = useAuth(); // Obtén el token de acceso del contexto useAuth

  const handleNoteSubmit = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;

    try {
      // Verifica si el usuario está autenticado utilizando el token de acceso del contexto
      if (!authToken) {
        // Si el usuario no está autenticado, redirígelo a la página de inicio de sesión
        window.location.href = "http://localhost:3000/UserNotes/login";
        return;
      }

      await axios.post(
        "http://localhost:4002/notes/new-note",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Utiliza el token de acceso del contexto
          },
        }
      );

      // Después de que la nota se haya creado con éxito, establece el mensaje flash y redirige al usuario a la página principal
      setFlashMessage("¡Nota creada exitosamente!");
      setTimeout(() => {
        window.location.href = "http://localhost:3000/UserNotes"; // Redirige al usuario a la página principal
      }, 2000); // Redirige después de 2 segundos (opcional)
    } catch (error) {
      console.error("Error al crear la nota:", error);
      // Puedes agregar aquí la lógica para mostrar un mensaje de error si lo deseas
    }
  };

  return (
    <main className="h-full fixed w-full">
      {flashMessage && <Flash message={flashMessage} />}
      <Card className="flex max-w-[400px] mx-auto my-96">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">Add New Notes</p>
            <p className="text-small text-default-500">Plan your studies</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <form onSubmit={handleNoteSubmit}>
            <div className="form-group ">
              <Input
                type="text"
                name="title"
                label="Title"
                className="form-control w-full mb-6"
              />
            </div>
            <div className="form-group">
              <Textarea
                name="description"
                label="Description"
                variant="bordered"
                placeholder="Enter your description"
                disableAnimation
                disableAutosize
                className="form-control w-full"
                classNames={{
                  // base: "max-w-xs",
                  input: "resize-y min-h-[100px]",
                }}
              />
            </div>
            <div className="form-group grid place-items-center w-full">
              <button type="submit" className="btn btn-primary mx-auto">
                Crear
              </button>
            </div>
          </form>
        </CardBody>
        <Divider />
      </Card>
    </main>
  );
}
