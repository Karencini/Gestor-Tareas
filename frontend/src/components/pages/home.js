import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Página de Inicio</h1>
      <p>Bienvenido a la aplicación. Elige una opción para comenzar:</p>

      <div>
        <Link to="/login">
          <button>Iniciar sesión</button>
        </Link>
        <Link to="/register">
          <button>Registrarse</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
