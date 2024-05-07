"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Divider,
  Button,
  Textarea,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import Flash from "@/components/Flash";
import { useAuth } from "@/app/api/users/route";

const ModalEdit = ({ isOpen, onClose, selectedNote }) => {
  const { authToken } = useAuth();
  const [noteData, setNoteData] = useState({ title: "", description: "" });
  const [flashMessage, setFlashMessage] = useState(null);

  useEffect(() => {
    if (selectedNote) {
      setNoteData({
        title: selectedNote.title,
        description: selectedNote.description,
      });
    }
  }, [selectedNote]);

  const handleNoteSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:4002/notes/edit/${selectedNote._id}`,
        noteData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setFlashMessage(response.data.message);
      onClose(); // Cierra el modal después de editar la nota
    } catch (error) {
      console.error("Error al editar la nota:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Edit Note</ModalHeader>
        <ModalBody>
          {flashMessage && <Flash message={flashMessage} />}
          <Divider />
          <main>
            <form onSubmit={handleNoteSubmit}>
              <div className="form-group">
                <Input
                  isReadOnly
                  type="text"
                  name="title"
                  label="title"
                  variant="bordered"
                  className="form-control w-full mb-6"
                  value={noteData.title}
                  onChange={(e) =>
                    setNoteData({
                      ...noteData,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Textarea
                  label="Description"
                  variant="bordered"
                  placeholder="Enter your description"
                  disableAnimation
                  disableAutosize
                  value={noteData.description}
                  onChange={(e) =>
                    setNoteData({
                      ...noteData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group grid place-items-center w-full">
                <Button color="primary" type="submit">
                  Save
                </Button>
              </div>
            </form>
          </main>
          <Divider />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalEdit;
