import React from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
const NoteCard = ({ title, description, imageSrc, onDelete, onEdit }) => {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{title}</p>
        <small className="text-default-500">{description}</small>
        <div className="">
          <Button onClick={onEdit}><EditIcon/></Button>
          <Button variant="error" onClick={onDelete}><DeleteForeverIcon/></Button>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={imageSrc}
          width={270}
        />
      </CardBody>
    </Card>
  );
};

export default NoteCard;
