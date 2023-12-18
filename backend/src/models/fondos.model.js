const { fondoBodySchema, fondoIdSchema } = require('../schema/fondos.schema.js');
const mongoose = require('mongoose');
const Joi = require('joi');

const fondoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  montoTotal: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
});
const Fondo = mongoose.model('Fondo', fondoSchema);



module.exports = Fondo;