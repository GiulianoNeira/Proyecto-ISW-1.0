"use strict";
const { respondSuccess, respondError } = require("../utils/resHandler");
const PostulacionService = require("../services/postulacion.service");
const { postulacionSchema } = require("../schema/postulacion.schema");
const moment = require("moment");

async function crearPostulacion(req, res) {
  try {
    const { error, value } = postulacionSchema.validate(req.body);

    if (error) {
      return respondError(req, res, 400, error.message);
    }

    const [nuevaPostulacion, errorCrear] = await PostulacionService.crearPostulacion(value);

    if (errorCrear) {
      return respondError(req, res, 400, errorCrear);
    }

    // Convierte la cadena de fecha a un objeto de fecha de JavaScript
    const fechaPostulacion = new Date(nuevaPostulacion.FechaPostulacion);

    // Formatea la fecha antes de enviarla como respuesta
    nuevaPostulacion.FechaPostulacion = moment(fechaPostulacion).format("YYYY-MM-DD");

    respondSuccess(req, res, 201, nuevaPostulacion);
  } catch (error) {
    respondError(req, res, 500, "No se pudo crear la postulación");
  }
}
async function buscarPostulacionPorId(req, res) {
  try {
    const { params } = req;
    const [postulacion, errorBuscar] = await PostulacionService.buscarPostulacionPorId(params.id);

    if (errorBuscar) {
      return respondError(req, res, 500, errorBuscar);
    }

    respondSuccess(req, res, 200, postulacion);
  } catch (error) {
    respondError(req, res, 500, "No se pudo buscar la postulación");
  }
}

async function listarPostulacionesPorRutRepresentante(req, res) {
  try {
    const { params } = req;
    const [postulaciones, errorListar] = 
    await PostulacionService.listarPostulacionesPorRutRepresentante(params.rutRepresentante);

    if (errorListar) {
      return respondError(req, res, 500, errorListar);
    }

    respondSuccess(req, res, 200, postulaciones);
  } catch (error) {
    respondError(req, res, 500, "No se pudieron listar las postulaciones");
  }
}

async function buscarPostulaciones(req, res) {
  try {
    const [postulaciones, errorBuscar] = await PostulacionService.buscarPostulaciones();

    if (errorBuscar) {
      return respondError(req, res, 500, errorBuscar);
    }

    respondSuccess(req, res, 200, postulaciones);
  } catch (error) {
    respondError(req, res, 500, "Hubo un problema al listar las postulaciones");
  }
}

async function eliminarPostulacionPorId(req, res) {
  try {
    const { params } = req;
    const [postulacion, errorEliminar] = 
    await PostulacionService.eliminarPostulacionPorId(params.id);

    if (errorEliminar) {
      return respondError(req, res, 500, errorEliminar);
    }

    respondSuccess(req, res, 200, postulacion);
  } catch (error) {
    respondError(req, res, 500, "No se pudo eliminar la postulación");
  }
}

async function crearPostulacion(req, res) {
  try {
    const { error, value } = postulacionSchema.validate(req.body);

    if (error) {
      return respondError(req, res, 400, error.message);
    }

    const [nuevaPostulacion, errorCrear] = await PostulacionService.crearPostulacion(value);

    if (errorCrear) {
      return respondError(req, res, 400, errorCrear);
    }

    respondSuccess(req, res, 201, nuevaPostulacion);
  } catch (error) {
    respondError(req, res, 500, "No se pudo crear la postulación");
  }
}

async function actualizarPostulacion(req, res) {
  try {
    const { params, body } = req;
    const { error, value } = postulacionSchema.validate(body);

    if (error) {
      return respondError(req, res, 400, error.message);
    }

    const [postulacion, errorActualizar] = 
    await PostulacionService.actualizarPostulacion(params.id, value);

    if (errorActualizar) {
      return respondError(req, res, 500, errorActualizar);
    }

    respondSuccess(req, res, 200, postulacion);
  } catch (error) {
    respondError(req, res, 500, "No se pudo actualizar la postulación");
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
