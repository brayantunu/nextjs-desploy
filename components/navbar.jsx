'use client'
import { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import Login from "./login";
import Register from "./registro";
import axios from 'axios';

export default function Navbarr() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para indicar si el usuario está autenticado
  const [userName, setUserName] = useState(''); // Estado para almacenar el nombre del usuario

  // Función para verificar la autenticación solo cuando se monta el componente
  useEffect(() => {
    // Recuperar el token del almacenamiento local
    const token = localStorage.getItem('token');
    
    // Si hay un token presente, verificar la autenticación
    if (token) {
      checkAuthentication(token);
    }
  }, []);

  // Función para verificar la autenticación del usuario
  const checkAuthentication = async (token) => {
    try {
      // Realizar una solicitud al backend para verificar la autenticación del usuario
      const response = await axios.get('http://localhost:3001/User/Me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        // Si la solicitud es exitosa, el usuario está autenticado
        setIsAuthenticated(true);
        // Establecer el nombre del usuario en el estado
        setUserName(response.data.name);
      }
    } catch (error) {
      // Si hay un error al verificar la autenticación, el usuario no está autenticado
      setIsAuthenticated(false);
    }
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Lógica para cerrar sesión y actualizar el estado de autenticación
    setIsAuthenticated(false);
    // Eliminar el token del almacenamiento local al cerrar sesión
    localStorage.removeItem('token');
  };

  return (
    <Navbar>
      <NavbarBrand>
        <Link color="foreground" href="/">
          Notes
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/NotesApp">
            Notes App Nodejs and Mongodb
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {isAuthenticated ? (
          <>
            <NavbarItem>
              <span className="text-gray-600 mr-4">{userName}</span>
            </NavbarItem>
            <NavbarItem>
              <Button color="error" onClick={handleLogout}>
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <> 
            <NavbarItem>
              <Login />
            </NavbarItem>
            <NavbarItem>
              <Register />
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
