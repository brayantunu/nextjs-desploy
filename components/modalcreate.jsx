import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Image from "next/image";
import "../styles/button_all.css"
import CreateNoteForm from "./CreateNoteForm";
export default function Modalcreate() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <button onClick={onOpen} className="card2 bg-lime-400 hover:bg-lime-600" >
        <Image
        className="add" src="/add.svg" width={40} height={40} alt="add"
      /> 
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}> 
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add New Notes</ModalHeader>
              <ModalBody>
              <CreateNoteForm />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
