const mongoose = require('mongoose');

const notaSchema = new mongoose.Schema({
  idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  idCarpeta: { type: mongoose.Schema.Types.ObjectId, ref: 'Carpeta', required: true },
  titulo: { type: String, required: true },
  contenido: { type: String },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Nota', notaSchema);