
const mongoose = require('mongoose');

const ganadorSchema = new mongoose.Schema({
  idConcurso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Concurso', // Modelo para el esquema de Concurso
    required: true,
  },
  idClasificacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clasificacion', // Modelo para el esquema de Clasificacion
    required: true,
  },
  montoAsignado: {
    type: Number,
    required: true,
  },
}, {
  versionKey: false,
});

const Ganador = mongoose.model('Ganador', ganadorSchema);

module.exports = Ganador;
