import React, { useState } from "react";
import api from "../api"; // La API para enviar los datos al backend
import { useNavigate } from "react-router-dom"; // Para redirigir después de registrarse

const Register = () => {
  const [username, setUsername] = useState(""); // Estado para el nombre de usuario
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [email, setEmail] = useState(""); // Estado para el correo electrónico
  const navigate = useNavigate(); // Para redirigir después del registro

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevenir comportamiento predeterminado del formulario
    try {
      // Realizamos la solicitud de registro al backend
      const res = await api.post("http://localhost:5000/register", {
        username,
        email,
        password,
      });
      alert("Registro exitoso");
      navigate("/login"); // Redirigir al login después de registrarse
    } catch (error) {

      console.error("Detalles del error:", error);  // Ver detalles completos del error
    alert("Error al registrar: " + error.message); // Muestra un mensaje claro
      console.error("Error al registrar:", error);  // Ver todo el error en consola

    // Mostrar un mensaje claro basado en el error
    if (error.response) {
      alert("Error al registrar: " + error.response.data.message);
    } else if (error.request) {
      alert("Error en la solicitud: " + error.request);
    } else {
      alert("Error desconocido: " + error.message);
  } }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
