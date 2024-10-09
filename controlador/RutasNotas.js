const express = require('express');
const router = express.Router();
const notasController = require('../controlador/notasController');

// Obtener todas las notas de un usuario
router.get('/notas', notasController.obtenerNotasUsuario);

// Crear una nueva nota
router.post('/:idUsuario/notas', notasController.crearNota);

// Actualizar una nota existente
router.put('/:idUsuario/notas/:idNota', notasController.actualizarNota);

// Eliminar una nota
router.delete('/:idUsuario/notas/:idNota', notasController.eliminarNota);

module.exports = router;