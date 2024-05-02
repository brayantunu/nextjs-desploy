import React from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const NoteCard = ({ id, title, description,  onDelete, onEdit }) => {
  const handleEditClick = () => {
    // Llama a la función onEdit con el ID de la nota cuando se hace clic en el botón de editar
    onEdit(id);
  };

  return (
    <Card className="py-4 flex">
      <CardHeader className="pb-0 pt-2 flex-col items-start">
        <h2 className="text-tiny uppercase font-bold">{title}</h2>
        <small className="text-default-500">{description}</small>
      </CardHeader>
      <div className="flex justify-end">
          <Button onClick={handleEditClick}><EditIcon/></Button>
          <Button variant="error" onClick={() => onDelete(id)}><DeleteForeverIcon/></Button>
        </div>
    </Card>
  );
};

export default NoteCard;
