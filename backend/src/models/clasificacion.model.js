const mongoose = require("mongoose");

const clasificacionSchema = new mongoose.Schema(
  {
    id_evaluacion: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      validate: {
        validator: async function (value) {
          // Validar que la id_evaluacion existe en tu base de datos
          // Puedes utilizar lógica asíncrona o consultas a la base de datos aquí
          // Retorna true si es válida y false si no lo es
          return true; // ¡Asegúrate de implementar la validación real!
        },
        message: 'La id_evaluacion proporcionada no es válida.',
      },
    },
    id_postulacion: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      validate: {
        validator: async function (value) {
          // Validar que la id_postulacion existe en tu base de datos
          // Puedes utilizar lógica asíncrona o consultas a la base de datos aquí
          // Retorna true si es válida y false si no lo es
          return true; // ¡Asegúrate de implementar la validación real!
        },
        message: 'La id_postulacion proporcionada no es válida.',
      },
    },
    estado: {
      type: String,
      required: true,
      default: "En revisión",
      enum: ["En revisión", "Aprobado", "Rechazado"], // Valores permitidos para estado
      validate: {
        validator: async function (value) {
          // Validar que la id_postulacion existe en tu base de datos
          // Puedes utilizar lógica asíncrona o consultas a la base de datos aquí
          // Retorna true si es válida y false si no lo es
          return true; // ¡Asegúrate de implementar la validación real!
        },
        message: 'El estado proporcionada no es válido.',
      },
    },
    ultima_modificacion: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const Clasificacion = mongoose.model("Clasificacion", clasificacionSchema);

module.exports = Clasificacion;
