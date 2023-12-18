const Joi = require("joi");

// Esquema de validación para crear o actualizar una postulación
const RutRegex = /^(\d{7,8}(\-[\dkK])?|\d{6,7}[\dkK])$/;
const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const TelefonoRegex = /^\d{9}$/;

const postulacionSchema = Joi.object({
 
  nombreRepresentante: Joi.string().required().messages({
    "string.empty": "El nombre del Representante no puede estar vacío.",
    "any.required": "El nombre del Representante es obligatorio.",
    "string.base": "El nombre del Representante debe ser de tipo string.",
  }),
  ApellidoRepresentante: Joi.string().required().messages({
    "string.empty": "El apellido del Representante no puede estar vacío.",
    "any.required": "El apellido del Representante es obligatorio.",
    "string.base": "El apellido del Representante debe ser de tipo string.",
  }),
  rutRepresentante: Joi.string()
    .required()
    .regex(RutRegex)
    .messages({
      "string.empty": "El rut del Representante no puede estar vacío.",
      "any.required": "El rut del Representante es obligatorio.",
      "string.base": "El rut del Representante debe ser de tipo string.",
      "string.pattern.base": "El rut del Representante debe tener un formato válido.",
    }),
  telefonoRepresentante: Joi.string()
    .required()
    .regex(TelefonoRegex)
    .messages({
      "string.empty": "El teléfono del Representante no puede estar vacío.",
      "any.required": "El teléfono del Representante es obligatorio.",
      "string.base": "El teléfono del Representante debe ser de tipo string.",
      "string.pattern.base": "El teléfono del Representante debe tener un formato válido.",
    }),
  emailRepresentante: Joi.string()
    .email()
    .required()
    .regex(EmailRegex)
    .messages({
      "string.empty": "El email del Representante no puede estar vacío.",
      "any.required": "El email del Representante es obligatorio.",
      "string.base": "El email del Representante debe ser de tipo string.",
      "string.email": "El email del Representante debe tener un formato válido.",
    }),
  nombreInstitucion: Joi.string().required().messages({
    "string.empty": "El nombre de la Institución no puede estar vacío.",
    "any.required": "El nombre de la Institución es obligatorio.",
    "string.base": "El nombre de la Institución debe ser de tipo string.",
  }),
  rutInstitucion: Joi.string()
    .required()
    .regex(RutRegex)
    .messages({
      "string.empty": "El rut de la Institución no puede estar vacío.",
      "any.required": "El rut de la Institución es obligatorio.",
      "string.base": "El rut de la Institución debe ser de tipo string.",
      "string.pattern.base": "El rut de la Institución debe tener un formato válido.",
    }),
  emailInstitucion: Joi.string()
    .email()
    .required()
    .regex(EmailRegex)
    .messages({
      "string.empty": "El email de la Institución no puede estar vacío.",
      "any.required": "El email de la Institución es obligatorio.",
      "string.base": "El email de la Institución debe ser de tipo string.",
      "string.email": "El email de la Institución debe tener un formato válido.",
    }),
  direccionInstitucion: Joi.string().required().messages({
    "string.empty": "La dirección de la Institución no puede estar vacía.",
    "any.required": "La dirección de la Institución es obligatoria.",
    "string.base": "La dirección de la Institución debe ser de tipo string.",
  }),
  region: Joi.string().required().messages({
    "string.empty": "La región no puede estar vacía.",
    "any.required": "La región es obligatoria.",
    "string.base": "La región debe ser de tipo string.",
  }),
  ciudad: Joi.string().required().messages({
    "string.empty": "La ciudad no puede estar vacía.",
    "any.required": "La ciudad es obligatoria.",
    "string.base": "La ciudad debe ser de tipo string.",
  }),
  estados: Joi.string().valid("enviada").optional().messages({
    "any.only": "El estado solo puede ser enviada.",
    "any.required": "El estado es obligatorio.",
  }),

});


module.exports = {
  postulacionSchema,
};
