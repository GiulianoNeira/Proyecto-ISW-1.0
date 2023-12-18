"use strict";
const Joi = require("joi");

/**
 * Esquema de validación para proyectos.
 * @constant {Object}
 */
const proyectoBodySchema = Joi.object({Tema: Joi.string().required().pattern(/^(?!\s+$)(?![0-9\s]+$)(?=.*[a-z\d])[a-zA-Z\d\s]+$/).min(5).messages({
    "string.empty": "El nombre del tema no puede estar vacío.",
    "any.required": "El nombre del tema es obligatorio.",
    "string.base": "El nombre del tema debe ser de tipo string.",
    "string.pattern.base": "Ingrese un tema valido.",
    "string.min": "El nombre del tema debe tener al menos 5 caracteres.",
  }),
  Descripcion: Joi.string().required().pattern(/^(?!\s+$)(?![0-9\s]+$)(?=.*[a-z\d])[a-zA-Z\d\s]+$/).min(5).messages({
    "string.empty": "La descripcion no puede estar vacia.",
    "any.required": "La descripcion es obligatoria.",
    "string.base": "La descripcion debe ser de tipo string.",
    "string.pattern.base": "Ingrese una descripcion valida.",
    "string.min": "La descripcion debe contener al menos 5 caracteres.",
  }),
  Monto: Joi.number().required().min(1).messages({
    "number.base": "El monto debe ser de tipo numérico.",
    "any.required": "El monto es obligatorio.",
    "number.min": "El monto debe ser mayor que cero.",
  }),
  Bases: Joi.string().required().messages({
    "string.empty": "Las bases del proyecto no pueden estar vacias.",
    "any.required": "Las bases del proyecto son obligatorias.",
    "string.base": "Las bases del proyecto deben ser de tipo string.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { proyectoBodySchema };