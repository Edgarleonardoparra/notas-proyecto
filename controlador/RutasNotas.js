const express = require('express');
const router = express.Router();
const Nota = require('../modelos/Nota');
const Carpeta = require('../modelos/Carpeta');
const Usuario = require('../modelos/Usuario')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// Obtener todas las notas de un usuario
router.get('/:idUsuario/notas', async (req, res) => {
  const idUsuario = req.params.idUsuario;
  console.log(`Consultando notas para el idUsuario: ${idUsuario}`);

  try {
    // Instancia ObjectId correctamente con "new"
    const notas = await Nota.find({ idUsuario: new ObjectId(idUsuario) });
    console.log(`Notas encontradas: ${JSON.stringify(notas)}`);
    res.json(notas);
  } catch (error) {
      console.error('Error al obtener las notas:', error);
      res.status(500).json({ error: 'Error al obtener las notas' });
  }
});

// Obtener todas las notas sin importar el idUsuario
router.get('/notas', async (req, res) => {
  try {
    const notas = await Nota.find();
    console.log(`Notas encontradas: ${JSON.stringify(notas)}`);
    res.json(notas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener todas las notas' });
  }
});

router.get('/test', (req, res) => {
  res.json({ message: 'Ruta de prueba está funcionando!' });
});

// Crear una nueva nota
router.post('/:idUsuario/notas', async (req, res) => {
  const { idUsuario } = req.params;
  const { idCarpeta, titulo, contenido } = req.body;
  try {
    const nuevaNota = new Nota({
      idUsuario,
      idCarpeta,
      titulo,
      contenido
    });
    await nuevaNota.save();
    res.status(201).json(nuevaNota);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la nota' });
  }
});

module.exports = router;