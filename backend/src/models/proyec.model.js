const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const proyecSchema = new Schema(
    {
    Tema: String,
    Descripcion: String,
    Monto: Number,
    Bases: String,
    }, 
    { collection: 'proyectos',  versionKey: false, timestamps: true,});

module.exports = model('Proyec', proyecSchema);