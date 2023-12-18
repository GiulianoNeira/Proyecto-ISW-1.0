const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de concurso.
 * @constant {Object}
 */
const concursoBodySchema = Joi.object({
  montoTotalFondo: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id del fondo no puede estar vacío.",
      "any.required": "El id del fondo es obligatorio.",
      "string.base": "El id del fondo debe ser de tipo string.",
      "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
  montoARepartir: Joi.number()
    .required()
    .min(1)
    .messages({
      "number.base": "El monto a repartir debe ser de tipo numérico.",
      "any.required": "El monto a repartir es obligatorio.",
      "number.min": "El monto a repartir debe ser mayor que cero.",
    }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { concursoBodySchema };


