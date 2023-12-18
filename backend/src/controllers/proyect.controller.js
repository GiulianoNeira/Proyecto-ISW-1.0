"use strict";
const mongoose = require('mongoose');
const Proyecto = require('../models/proyec.model.js');
const { proyectoBodySchema } = require('../schema/proyec.schema');

/** 
 * Obtiene todos los proyectos.
 */
exports.obtain = async (req, res, next) => {
  try {
    const proyectos = await Proyecto.find();
    res.json(proyectos);
  } catch (error) {
    next(error);
  }
};

/** 
 * Obtiene un proyecto por id.
 */
exports.obtainById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const proyecto = await Proyecto.findById(id, req.body);
    res.json(proyecto);
  } catch (error) {
    next(error);
  }
};

/** 
 * Crea un nuevo proyecto.
 */
exports.create = async (req, res, next) => {
  try {
    const { error, value } = proyectoBodySchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const newProyecto = new Proyecto(value);
    await newProyecto.save();

    res.status(201).json(newProyecto);  // 201 Created

  }catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).send({ message: error.message });
    }else {
      next(error);
    }
  }
};


/** 
 * Actualiza un proyecto existente.
 */
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ProyectoActualizado = await Proyecto.findByIdAndUpdate(id, req.body, { new: true });
    if (!ProyectoActualizado) {
      return res.status(404).send({ message: 'Proyecto no encontrado' });  // 404 Not Found
    }
    res.status(200).send({ message: 'Proyecto actualizado exitosamente' });
    
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
      const { id } = req.params;
      const proyectoEliminado = await Proyecto.findByIdAndDelete(id);
      if (!proyectoEliminado) {
          return res.status(404).send({ message: 'Proyecto no encontrado' });  // 404 Not Found
      }
      res.status(200).send({ message: 'Proyecto eliminado exitosamente' });  // 200 OK
  } catch (error) {
      next(error);
  }
};