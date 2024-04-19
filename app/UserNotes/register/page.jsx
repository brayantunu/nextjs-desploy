"use client";
// Register.js
import React, { useState } from "react";
import { useAuth } from "../../api/users/route"; // Importar la función useAuth desde el contexto de autenticación
import "./register.css";
import Link from "next/link";
export default function Register() {
  const { register } = useAuth(); // Obtener la función de registro del contexto de autenticación

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "", // Agregar campo para el nombre de usuario
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.username) {
      alert(
        "Por favor, ingresa tu correo electrónico, contraseña y nombre de usuario"
      );
      return;
    }

    setLoading(true);
    try {
      await register(formData); // Utilizar la función de registro del contexto de autenticación
      console.log("Usuario registrado exitosamente");
      window.location.href = "http://localhost:3000/UserNotes";
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.error : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
      <div id="form-ui">
        <form onSubmit={handleSubmit} id="form">
          <div id="form-body">
            <div id="welcome-lines">
              <div id="welcome-line-1">¡Creatividad en Acción!</div>
              <div id="welcome-line-2">Welcome, {formData.username}</div>
            </div>
            <div id="input-area">
              <div className="form-inp">
                <input
                  autoFocus
                  id="email"
                  type="email"
                  placeholder="Correo electrónico"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-inp">
                <input
                  id="username"
                  type="text"
                  placeholder="Nombre de usuario"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-inp">
                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div id="submit-button-cvr">
              <button id="submit-button" type="submit" disabled={loading}>
                Registrarse
              </button>
            </div>
            <div id="forgot-pass">
            <p>Have an account? <Link href="/UserNotes/login">Log in</Link> </p>
            </div>
          </div>
        </form>
      </div>
  );
}
