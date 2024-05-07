import React from "react";
import { Card, CardHeader, Button, ButtonGroup, Image } from "@nextui-org/react";

const NoteCard = ({ id, title, description, onDelete, onEdit }) => {
  const handleEditClick = () => {
    // Llama a la función onEdit con el ID de la nota cuando se hace clic en el botón de editar
    onEdit(id);
  };

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 flex-col items-start">
        <h2 className="text-tiny uppercase font-bold">{title}</h2>
        <small className="text-default-500">{description}</small>
      </CardHeader>
      <ButtonGroup className="justify-end mr-5">
        <Button onClick={handleEditClick}>
          <Image src="/edit.svg" width={30} height={30} alt="edit" />
        </Button>
        <Button onClick={() => onDelete(id)}>
          <Image src="/delete.svg" width={30} height={30} alt="delete" />
        </Button>
      </ButtonGroup>
    </Card>
  );
};

export default NoteCard;
