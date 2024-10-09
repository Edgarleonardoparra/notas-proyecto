const mongoose = require('mongoose');

const carpetaSchema = new mongoose.Schema({
  idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  nombreCarpeta: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Carpeta', carpetaSchema);