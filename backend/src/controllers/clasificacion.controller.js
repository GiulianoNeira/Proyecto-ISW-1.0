const mongoose = require('mongoose');
const Clasificacion = require('../models/clasificacion.model');
const { clasificacionBodySchema, clasificacionIdSchema } = require("../schema/clasificacion.schema");

// Controlador para crear una nueva clasificación
exports.createClasificacion = async (req, res) => {
  try {
    const nuevaClasificacion = req.body;

    const validationResult = clasificacionBodySchema.validate(nuevaClasificacion);
    if (validationResult.error) {
      return res.status(400).json({ mensaje: validationResult.error.details[0].message });
    }

    const clasificacionCreada = await Clasificacion.create(nuevaClasificacion);

    res.status(201).json(clasificacionCreada);
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensaje: 'Error al crear la clasificación' });
  }
};

// Controlador para obtener todas las clasificaciones
exports.getClasificacion = async (req, res) => {
  try {
    const clasificaciones = await Clasificacion.find();
    res.status(200).json(clasificaciones);
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensaje: 'Error al obtener las clasificaciones' });
  }
};

// Buscar clasificación por ID
exports.getClasificacionById = async (req, res) => {
  try {
    const validationResult = clasificacionIdSchema.validate(req.params);
    if (validationResult.error) {
      return res.status(400).json({ mensaje: validationResult.error.details[0].message });
    }

    const id = req.params.id;
    const clasificacion = await Clasificacion.findById(id);
    
    if (!clasificacion) {
      return res.status(404).json({ mensaje: 'Clasificación no encontrada' });
    }

    res.status(200).json(clasificacion);
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensaje: 'Error al obtener la clasificación por ID' });
  }
};

// Actualizar clasificación por ID
exports.updateClasificacion = async (req, res) => {
  try {
    const validationResult = clasificacionIdSchema.validate(req.params);
    if (validationResult.error) {
      return res.status(400).json({ mensaje: validationResult.error.details[0].message });
    }

    const id = req.params.id;
    const actualizacion = req.body;

    const validationResultUpdate = clasificacionBodySchema.validate(actualizacion);
    if (validationResultUpdate.error) {
      return res.status(400).json({ mensaje: validationResultUpdate.error.details[0].message });
    }

    const clasificacionActualizada = await Clasificacion.findByIdAndUpdate(id, actualizacion, { new: true });
    
    if (!clasificacionActualizada) {
      return res.status(404).json({ mensaje: 'Clasificación no encontrada' });
    }

    res.status(200).json(clasificacionActualizada);
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensaje: 'Error al actualizar la clasificación por ID' });
  }
};

// Eliminar clasificación por ID
exports.deleteClasificacion = async (req, res) => {
  try {
    const validationResult = clasificacionIdSchema.validate(req.params);
    if (validationResult.error) {
      return res.status(400).json({ mensaje: validationResult.error.details[0].message });
    }

    const id = req.params.id;
    const clasificacionEliminada = await Clasificacion.findByIdAndRemove(id);
    
    if (!clasificacionEliminada) {
      return res.status(404).json({ mensaje: 'Clasificación no encontrada' });
    }

    res.status(200).json({ mensaje: 'Clasificación eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensaje: 'Error al eliminar la clasificación por ID' });
  }
};

module.exports = exports;
