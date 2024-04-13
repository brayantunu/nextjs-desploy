"use client"
import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { useAuth } from '../app/AuthContext'; // Importa la función useAuth del contexto de autenticación

export default function NavbarComponent() {
  const { isAuthenticated, userName, logout } = useAuth(); // Obtiene el estado de autenticación y otras funciones del contexto de autenticación

  return (
    <Navbar>
      <NavbarBrand>
        <Link color="foreground" href="/UserNotes">
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
              <Button color="error" onClick={logout}>
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <> 
            <NavbarItem>
              <Link color="foreground" href="/UserNotes/login">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/UserNotes/register">
                Register
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
