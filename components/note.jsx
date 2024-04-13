"use client";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@nextui-org/react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import Delete from "./Delete";

export default function Note({ _id, title, descripcion }) {
  const router = useRouter();

  const handleDeleteNote = async () => {
    try {
      await axios.delete(`http://localhost:4002/notes/delete/${_id}`);
      console.log("Nota eliminada exitosamente");
      window.location.reload(); // Recargar la página después de eliminar la nota
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
    }
    363;
  };

  const handleEditNote = () => {
    router.push(`http://localhost:4002/notes/edit/${_id}`);
  };

  return (
    <Card className="max-w-xs mx-auto w-80 ">
      <CardMedia sx={{ height: 140 }} image="vercel.svg" title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {descripcion}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between">
        <Button variant="contained" color="success" onClick={handleEditNote}>
          <EditIcon />
        </Button>
        <Delete onClick={handleDeleteNote} />
      </CardActions>
    </Card>
  );
}
// sx={{ maxWidth: 345 }}