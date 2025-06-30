"use client";

import React, { useState } from "react";
import "./Login.css"; // Asegúrate de tener estilos aquí, o usa Tailwind si prefieres

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de autenticación
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="items-center justify-items-center login-container">
      <main className="flex flex-col gap-[5px] row-start-2 items-center justify-items-center py-8">
        <h1 className="login-header">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition login"
            type="submit"
          >
            Ingresar
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
