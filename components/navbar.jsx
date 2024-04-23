"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { useState } from "react";
import DropdownTrigge from './DropdownTrigge';
import  {useAuth}  from '../app/api/users/route'; // Importa la función useAuth del contexto de autenticación


export default function Navbarr() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, username, avatar, logout } = useAuth(); // Obtiene el estado de autenticación y otras funciones del contexto de autenticación


  const menuItems = [
    { text: "Add Note", href: "/NotesApp" },
    { text: "Customers", href: "#" },
    { text: "Integrations", href: "#" },
  ];

  const renderMenuItems = () => {
    return menuItems.map((item, index) => (
      <NavbarItem key={index} isActive={index === 1}>
        <Link color="foreground" href={item.href}>
          {item.text}
        </Link>
      </NavbarItem>
    ));
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">NOTE</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {renderMenuItems()}
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

      <NavbarMenu>{renderMenuItems()}</NavbarMenu>
    </Navbar>
  );
}
