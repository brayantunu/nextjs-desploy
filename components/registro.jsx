'use client'
import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import axios from 'axios';
import { MailIcon } from '../public/mail.jsx';
import { LockIcon } from '../public/lock.jsx';

export default function Register() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      // Envía los datos del formulario al servidor
      const response = await axios.post('http://localhost:3001/users/signUp', formData);
      // Maneja la respuesta del servidor
      console.log(response.data);
       // Aquí puedes mostrar un mensaje de éxito o redireccionar al usuario a otra página
       setTimeout(() => {
        window.location.href = "/"; // Redirige al usuario a la página principal
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">Register</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Register</ModalHeader>
              <ModalBody>
              <Input
                    autoFocus
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="name"
                    placeholder="Enter your name"
                    variant="bordered"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Register
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
