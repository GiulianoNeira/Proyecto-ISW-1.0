"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de clasificación (POST).
 * @constant {Object}
 */
const clasificacionBodySchema = Joi.object({
  id_evaluacion: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "La id_evaluacion no puede estar vacía.",
      "any.required": "La id_evaluacion es obligatoria.",
      "string.base": "La id_evaluacion debe ser de tipo string.",
      "string.pattern.base": "La id_evaluacion proporcionada no es válida.",
    }),
  id_postulacion: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "La id_postulacion no puede estar vacía.",
      "any.required": "La id_postulacion es obligatoria.",
      "string.base": "La id_postulacion debe ser de tipo string.",
      "string.pattern.base": "La id_postulacion proporcionada no es válida.",
    }),
  estado: Joi.string()
    .valid("En revisión", "Aprobado", "Rechazado")
    .required()
    .messages({
      "string.empty": "El estado no puede estar vacío.",
      "any.required": "El estado es obligatorio.",
      "string.base": "El estado debe ser de tipo string.",
      "any.only": "El estado proporcionado no es válido.",
    }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de clasificación (PUT/PATCH).
 * @constant {Object}
 */
const clasificacionIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id no puede estar vacío.",
      "any.required": "El id es obligatorio.",
      "string.base": "El id debe ser de tipo string.",
      "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
});

module.exports = { clasificacionBodySchema, clasificacionIdSchema };
