"use strict";
const Postulaciones = require("../models/postulacion.model");
const { postulacionSchema } = require("../schema/postulacion.schema");
const { handleError } = require("../utils/errorHandler");

async function crearPostulacion(postulacionData) {
  try {
    const { error, value } = postulacionSchema.validate(postulacionData);

    if (error) {
      return [null, error.message];
    }

    const nuevaPostulacion = new Postulaciones(value);
    await nuevaPostulacion.save();

    return [nuevaPostulacion, null];
  } catch (error) {
    handleError(error, "postulacion.service -> crearPostulacion");
    return [null, "No se pudo crear la postulación"];
  }
}

async function buscarPostulacionPorId(id) {
  try {
    const postulacion = await Postulaciones.findById(id);

    if (!postulacion) {
      return [null, "Postulación no encontrada"];
    }

    return [postulacion, null];
  } catch (error) {
    handleError(error, "postulacion.service -> buscarPostulacionPorId");
    return [null, "No se pudo buscar la postulación"];
  }
}

async function listarPostulacionesPorRutRepresentante(rutRepresentante) {
  try {
    const postulaciones = await Postulaciones.find({ rutRepresentante });

    if (!postulaciones || postulaciones.length === 0) {
      return [null, "No se encontraron postulaciones"];
    }

    return [postulaciones, null];
  } catch (error) {
    handleError(error, "postulacion.service -> listarPostulacionesPorRutRepresentante");
    return [null, "No se pudieron listar las postulaciones"];
  }
}

async function buscarPostulaciones() {
  try {
    const postulaciones = await Postulaciones.find();

    if (postulaciones.length === 0) {
      return [null, "No se encontraron postulaciones"];
    }

    return [postulaciones, null];
  } catch (error) {
    handleError(error, "postulacion.service -> buscarPostulaciones");
    return [null, "Hubo un problema al listar las postulaciones"];
  }
}

async function eliminarPostulacionPorId(id) {
  try {
    const postulacion = await Postulaciones.findByIdAndDelete(id);
    if (!postulacion) {
      return [null, "Postulación no encontrada"];
    }
    return [postulacion, null];
  } catch (error) {
    handleError(error, "postulacion.service -> eliminarPostulacionPorId");
    return [null, "No se pudo eliminar la postulación"];
  }
}

async function actualizarPostulacion(id, actualizacion) {
  try {
    const postulacion = await Postulaciones.findByIdAndUpdate(id, { ...actualizacion }, 
        { new: true });

    if (!postulacion) {
      return [null, "Postulación no encontrada"];
    }

    return [postulacion, null];
  } catch (error) {
    handleError(error, "postulacion.service -> actualizarPostulacion");
    return [null, "No se pudo actualizar la postulación"];
  }
}

module.exports = {
  crearPostulacion,
  buscarPostulacionPorId,
  listarPostulacionesPorRutRepresentante,
  buscarPostulaciones,
  eliminarPostulacionPorId,
  actualizarPostulacion,
};
