const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['Baja', 'Media', 'Alta'], default: 'Baja' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // 👈 Relación con el usuario
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;