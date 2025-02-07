// Importaciones necesarias
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear la app de Express
const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:3000',  // Solo permite solicitudes de localhost:3000
  methods: 'GET,POST,PUT,DELETE',  // Métodos permitidos
};
app.use(cors(corsOptions));  // Usar el middleware de CORS con la configuración

// Middleware para parsear JSON en el cuerpo de las peticiones
app.use(express.json());

// Conectar con MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.log('Error al conectar con MongoDB: ', err));

// Rutas
app.use('/api/users', require('./routes/userRoutes'));  // Ruta para las rutas de usuario
app.use('/api/tasks', require('./routes/taskRoutes'));  // Ruta para las tareas

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
