const Nota = require('../modelos/Nota');
const { ObjectId } = require('mongoose').Types;

// Obtener todas las notas de un usuario
exports.obtenerNotasUsuario = async (req, res) => {
    try {
        const notas = await Nota.find(); // Asumiendo que tienes un modelo 'Nota' configurado con Mongoose
        res.json(notas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las notas' });
    }
};

// Crear una nueva nota
exports.crearNota = async (req, res) => {
  const { idUsuario } = req.params;
  const { titulo, contenido, idCarpeta } = req.body;

  try {
    const nuevaNota = new Nota({
      idUsuario: ObjectId(idUsuario),
      titulo,
      contenido,
      idCarpeta: ObjectId(idCarpeta)
    });
    await nuevaNota.save();
    res.status(201).json(nuevaNota);
  } catch (error) {
    console.error('Error al crear la nota:', error);
    res.status(500).json({ error: 'Error al crear la nota' });
  }
};

// Actualizar una nota existente
exports.actualizarNota = async (req, res) => {
  const { idUsuario, idNota } = req.params;
  const { titulo, contenido, idCarpeta } = req.body;

  try {
    const notaActualizada = await Nota.findOneAndUpdate(
      { _id: ObjectId(idNota), idUsuario: ObjectId(idUsuario) },
      { titulo, contenido, idCarpeta: ObjectId(idCarpeta), fechaActualizacion: Date.now() },
      { new: true }
    );

    if (!notaActualizada) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }

    res.json(notaActualizada);
  } catch (error) {
    console.error('Error al actualizar la nota:', error);
    res.status(500).json({ error: 'Error al actualizar la nota' });
  }
};

// Eliminar una nota
exports.eliminarNota = async (req, res) => {
  const { idUsuario, idNota } = req.params;

  try {
    const notaEliminada = await Nota.findOneAndDelete({ _id: ObjectId(idNota), idUsuario: ObjectId(idUsuario) });

    if (!notaEliminada) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }

    res.json({ message: 'Nota eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la nota:', error);
    res.status(500).json({ error: 'Error al eliminar la nota' });
  }
};