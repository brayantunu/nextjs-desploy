"use client"
import React, { useState } from 'react';
import { useAuth } from '../../api/users/route'; // Importa el contexto de autenticación
import "./login.css"
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  // Obtén la función de login del contexto de autenticación
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Por favor, ingresa tu correo electrónico y contraseña');
      return;
    }

    setLoading(true);
    try {
      // Llama a la función de login del contexto de autenticación
      await login(formData);
      // Redirige a la página principal después del inicio de sesión exitoso
      window.location.href = '/UserNotes';
    } catch (error) {
      console.error('Error:', error.response ? error.response.data.error : error.message);
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
          <div id="welcome-line-2">Welcome,</div>
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
          <button id="submit-button" type="submit">
          Login
          </button>
        </div>
        <div id="forgot-pass">
          <a href="#">Forgot password?</a>
        </div>
        <div id="forgot-pass">
        <p>Dont have an account? <Link href="/UserNotes/register">Register</Link> </p>
        </div>
      </div>
    </form>
  </div>
  );
}
