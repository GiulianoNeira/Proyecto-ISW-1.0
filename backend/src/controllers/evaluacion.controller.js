const mongoose = require('mongoose');
const Evaluacion = require('../models/evaluacion.model');
const { evaluacionBodySchema, evaluacionIdSchema } = require("../schema/evaluacion.schema"); // Ajusta la ruta si es necesario

exports.createEvaluacion = async (req, res, next) => {
  try {
    await validateRequest(evaluacionBodySchema, req.body);

    const { id_postulacion, comentario, puntos } = req.body;

    const nuevaEvaluacion = new Evaluacion({
      id_postulacion,
      comentario,
      puntos,
    });

    const evaluacionCreada = await nuevaEvaluacion.save();

    res.status(201).json(evaluacionCreada);
  } catch (error) {
    next(error);
  }
};

exports.getEvaluacion = async (req, res, next) => {
  try {
    const evaluaciones = await Evaluacion.find();
    res.json(evaluaciones);
  } catch (error) {
    next(error);
  }
};

exports.updateEvaluacion = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validar el cuerpo de la solicitud
    await validateRequest(evaluacionBodySchema, req.body);

    const evaluacionActualizada = await Evaluacion.findByIdAndUpdate(id, req.body, { new: true });
    if (!evaluacionActualizada) {
      return res.status(404).send();  // 404 Not Found
    }
    res.json(evaluacionActualizada);
  } catch (error) {
    next(error);
  }
};

exports.getEvaluacionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validar el ID de la solicitud
    await validateRequest(evaluacionIdSchema, { id });

    const evaluacion = await Evaluacion.findById(id);

    if (!evaluacion) {
      return res.status(404).send({ message: 'No se encontró la evaluación especificada' });
    }

    res.json(evaluacion);
  } catch (error) {
    next(error);
  }
};

exports.deleteEvaluacion = async (req, res) => {
  const { id } = req.params;

  // Validar el ID de la solicitud
  await validateRequest(evaluacionIdSchema, { id });

  try {
    const evaluacion = await Evaluacion.findByIdAndDelete(id);
    if (!evaluacion) {
      return res.status(404).send({ message: 'Evaluación no encontrada' });
    }
    res.send({ message: 'Evaluación eliminada exitosamente', data: evaluacion });
  } catch (error) {
    res.status(400).send({ message: error.message || 'Error al eliminar la evaluación' });
  }
};

module.exports = exports;

