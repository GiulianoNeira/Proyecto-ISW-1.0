"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de evaluación.
 * @constant {Object}
 */
const evaluacionBodySchema = Joi.object({
  id_postulacion: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "La id_postulacion no puede estar vacía.",
      "any.required": "La id_postulacion es obligatoria.",
      "string.base": "La id_postulacion debe ser de tipo string.",
      "string.pattern.base": "La id_postulacion proporcionada no es válida.",
    }),
  comentario: Joi.string().default(" ").custom((value, helpers) => {
    if (!value.includes(" ")) {
      return helpers.message("El comentario debe contener al menos un espacio.");
    }
    return value;
  }),
  puntos: Joi.number()
    .required()
    .min(0)
    .max(100)
    .messages({
      "number.base": "Los puntos deben ser de tipo numérico.",
      "any.required": "Los puntos son obligatorios.",
      "number.min": "Los puntos deben ser mayores o iguales a 0.",
      "number.max": "Los puntos deben ser menores o iguales a 100.",
    }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de evaluación.
 * @constant {Object}
 */
const evaluacionIdSchema = Joi.object({
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

module.exports = { evaluacionBodySchema, evaluacionIdSchema };
