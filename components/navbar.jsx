// Add this line at the top of your component file
"use client";
import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import  {useAuth}  from '../app/api/users/route'; // Importa la función useAuth del contexto de autenticación
import DropdownTrigge from './DropdownTrigge';

export default function NavbarComponent() {
  const { isAuthenticated, username, avatar, logout } = useAuth(); // Obtiene el estado de autenticación y otras funciones del contexto de autenticación
  
  return (
    <Navbar className='bg-gradient '>
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
          <DropdownTrigge username={username} avatar={avatar} logout={logout} />         
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