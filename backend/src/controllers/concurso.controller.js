// controllers/concurso.controller.js
"use strict";
const Concurso = require('../models/concurso.model');
const Fondo = require('../models/fondos.model');


/** 
 * Obtiene todos los concursos.
 */
exports.findAll = async (req, res, next) => {
  try {
    const concursos = await Concurso.find().populate('montoTotalFondo');

    res.json(concursos);
  } catch (error) {
    next(error);
  }
};

/** 
 * Crea un nuevo concurso.
 */
exports.findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const concurso = await Concurso.findById(id).populate('fondo');
    if (!concurso) {
      return res.status(404).send({ message: 'Concurso no encontrado' });  // 404 Not Found
    }
    res.json(concurso);
  } catch (error) {
    next(error);
  }
};// Controlador para crear un nuevo concurso
// Controlador para crear un nuevo concurso
exports.create = async (req, res, next) => {
  try {
      const { nombreConcurso, montoTotalFondo, montoARepartir } = req.body;

      // Verifica si el fondo existe
      const fondo = await Fondo.findById(montoTotalFondo);
      if (!fondo) {
          return res.status(400).send({ message: 'Fondo asociado no encontrado', montoTotalFondo });
      }

      // Crea un nuevo concurso
      const nuevoConcurso = new Concurso({ nombreConcurso, montoTotalFondo, montoARepartir });

      // Guarda el concurso y actualiza el fondo
      await nuevoConcurso.save();
      fondo.montoTotalFondo -= montoARepartir;
      await fondo.save();

      res.status(201).json(nuevoConcurso);
  } catch (error) {
      next(error);
  }
};

/** 
 * Actualiza un concurso existente.
 */
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    let concursoActualizado = await Concurso.findById(id);
    if (!concursoActualizado) {
      return res.status(404).send();  // 404 Not Found
    }

    // Actualiza el concurso con los nuevos datos
    for (let prop in req.body) {
      concursoActualizado[prop] = req.body[prop];
    }

    // Busca el Fondo asociado
    const fondo = await Fondo.findById(concursoActualizado.montoTotalFondo);

    if (!fondo) {
      throw new Error('Fondo no encontrado');
    }

    // Actualiza el montoTotal en el Fondo
    fondo.montoTotalFondo -= concursoActualizado.montoARepartir;

    // Guarda el Fondo actualizado
    await fondo.save();

    // Guarda el concurso actualizado
    concursoActualizado = await concursoActualizado.save();

    res.json(concursoActualizado);
  } catch (error) {
    next(error);
  }
};


exports.delete = async (req, res, next) => {
  try {
      const { id } = req.params;
      const concursoEliminado = await Concurso.findByIdAndDelete(id);
      if (!concursoEliminado) {
          return res.status(404).send({ message: 'Concurso no encontrado' });  // 404 Not Found
      }
      res.status(200).send({ message: 'Concurso eliminado exitosamente' });  // 200 OK
  } catch (error) {
      next(error);
  }
};