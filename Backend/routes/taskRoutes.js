const express = require('express');
const Task = require('./models/Task');
const authMiddleware = require('../middleware/authMiddleware'); // 👈 Importar el middleware
const router = express.Router();

// 🔹 Crear tarea con usuario autenticado
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, priority } = req.body;
  try {
    const newTask = new Task({ 
      title, 
      description, 
      priority, 
      user: req.user.userId // 👈 Asociar la tarea al usuario autenticado
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
});

// 🔹 Obtener solo las tareas del usuario autenticado
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId }); // 👈 Solo traer las del usuario
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
});

// 🔹 Editar tarea (solo si es del usuario)
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, description, priority, status } = req.body;
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId }); // 👈 Verificar que sea del usuario
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada o no autorizada' });

    // Actualizar campos
    if (title) task.title = title;
    if (description) task.description = description;
    if (priority) task.priority = priority;
    if (status) task.status = status;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
});

// 🔹 Eliminar tarea (solo si es del usuario)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.userId }); // 👈 Solo eliminar si es suya
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada o no autorizada' });

    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
});

module.exports = router;
