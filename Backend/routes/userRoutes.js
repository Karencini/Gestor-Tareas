const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');  // Ajusta la ruta según la ubicación de tu archivo User.js

const router = express.Router();  // Definición de router

router.post('/register', async (req, res) => {
  console.log(req.body); // Ver los datos recibidos

  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username: name, email, password: hashedPassword });

    // Verifica si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    await newUser.save();
    res.json({ message: 'Usuario registrado' });
  } catch (error) {
    console.error(error); // Ver el error en la consola
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  console.log("Datos recibidos en login:", req.body);
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    console.log("Usuario encontrado:", user); // Ver si el usuario existe en la DB
    
    if (!user) {
      console.log("Error: Usuario no encontrado");
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Contraseña correcta:", isMatch);

    if (!isMatch) {
      console.log("Error: Contraseña incorrecta");
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.log("Error en el login:", error);
    res.status(500).json({ message: 'Error al hacer login' });
  }
});


// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find();  // Recuperar todos los usuarios
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
});

// Editar usuario por ID
router.put('/:id', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Actualizar los campos solo si están definidos
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al editar el usuario' });
  }
});

// Eliminar usuario por ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
});

module.exports = router;  // Exportar router
