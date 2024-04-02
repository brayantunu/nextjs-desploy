'use client'
import { useState } from 'react';
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { MailIcon } from '../public/mail.jsx';
import { LockIcon } from '../public/lock.jsx';

export default function Login() {
  
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía los datos del formulario al servidor para iniciar sesión
      const response = await axios.post('http://localhost:3001/users/signin', formData);
      // Guarda el token en el almacenamiento local (localStorage)
      localStorage.setItem('token', response.data.token);
      // Maneja la respuesta del servidor
      console.log(response.data); // Aquí puedes manejar la respuesta según lo necesites
      setTimeout(() => {
        window.location.href = "http://localhost:3000/"; // Redirige al usuario a la página principal
      }, 2000); //
    } catch (error) {
      console.error('Error:', error); 
      // Maneja los errores y muestra un mensaje al usuario si es necesario
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">Login</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
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
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                      classNames={{
                        label: "text-small",
                      }}
                    >
                      Remember me
                    </Checkbox>
                    <Link color="primary" href="#" size="sm">
                      Forgot password?
                    </Link>
                  </div>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit">
                      Sign in
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
