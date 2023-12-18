const mongoose = require('mongoose');

const evaluacionSchema = new mongoose.Schema(
  {
    id_postulacion: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      validate: {
        validator: async function (value) {
          return true; // ¡Asegúrate de implementar la validación real!
        },
        message: 'La id_postulacion proporcionada no es válida.',
      },
    },
    comentario: {
      type: String,
      default: " ",
      validate: {
        validator: function (value) {
          return value.includes(' ');
        },
        message: 'El comentario debe contener al menos un espacio.',
      },
    },
    puntos: {
      type: Number,
      required: true,
      default: 0,
      validate: {
        validator: function (value) {
          return value >= 0 && value <= 100;
        },
        message: 'Los puntos deben estar entre 0 y 100.',
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Evaluacion = mongoose.model('Evaluacion', evaluacionSchema);

module.exports = Evaluacion;

