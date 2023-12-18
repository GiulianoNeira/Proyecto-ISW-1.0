"use strict";
const mongoose = require("mongoose");
const postulacionesSchema = new mongoose.Schema({
 
  nombreRepresentante: {
    type: String,
    required: true,
  },
  ApellidoRepresentante: {
    type: String,
    required: true,
  },
  rutRepresentante: {
    type: String,
    required: true,
  },
  telefonoRepresentante: {
    type: String,
    required: true,
  },
  emailRepresentante: {
    type: String,
    required: true,
  },
  nombreInstitucion: {
    type: String,
    required: true,
  },
  rutInstitucion: {
    type: String,
    required: true,
  },
  emailInstitucion: { 
    type: String,
    required: true,
  },
  direccionInstitucion: {
    type: String,
    required: true,
  },

  region: {
    type: String,
    required: true,
   },
  ciudad: { 
    type: String,
    required: true,
  },
  FechaPostulacion: {
    type: Date,
    default: Date.now,
  },
  estados: {
    type: String,
    enum: ["borrador", "enviada"], 
    default: "borrador", 
  },
},

{
  versionKey: false,
});

const Postulaciones = mongoose.model("Postulaciones", postulacionesSchema);
module.exports = Postulaciones;
