require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const notasRutas = require('./controlador/RutasNotas');

const app = express();

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((error) => console.error('Error al conectar a MongoDB Atlas:', error));

// Rutas
app.use('/api', notasRutas);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});