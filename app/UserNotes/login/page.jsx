"use client"
import React, { useState } from 'react';
import  {useAuth}  from '../../api/users/route'; // Importa el contexto de autenticación

export default function Login() {
  const [formData, setFormData] = useState({
    email: 'hola@gmail.com',
    password: '123456789'
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
    <main className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
            Correo electrónico
          </label>
          <input
            autoFocus
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </main>
  );
}
