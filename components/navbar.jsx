"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  Button,
  Link,
} from "@nextui-org/react";
import { useState } from "react";
import DropdownTrigge from './DropdownTrigge';
import  {useAuth}  from '../app/api/users/route'; // Importa la función useAuth del contexto de autenticación


export default function Navbarr() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, username, avatar, logout } = useAuth(); // Obtiene el estado de autenticación y otras funciones del contexto de autenticación
  const handleLogout = () => {
    // Llama a la función de logout cuando el usuario hace clic en "Log Out"
    logout();
    window.location.href = "/";
  };

  const menuItems = [
    { text: "Add Note", href: "/NotesApp" },
    { text: "Login", href: "/UserNotes/login" },
    { text: "Register", href: "/UserNotes/register" },
    { text: "Log Out", onClick: handleLogout }

  ];

  const renderMenuItems = () => {
    return menuItems.map((item, index) => (
      <NavbarItem key={index} isActive={index === 1}>
        <Link color="foreground" href={item.href} onClick={item.onClick} >
          {item.text}
        </Link>
      </NavbarItem>
    ));
  };

  return (
    <Navbar className="bg-gradient" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">NOTE</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className=" hidden sm:flex ">
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
        <NavbarMenu>{renderMenuItems()}</NavbarMenu>

    </Navbar>
  );
}
