"use strict";
const mongoose = require('mongoose');
const { fondoBodySchema } = require('../schema/fondos.schema'); // Importa el esquema de validación

const Fondo = require('../models/fondos.model');

exports.findAll = async (req, res, next) => {
    try {
        const fondos = await Fondo.find();
        res.json(fondos);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        // Validar el cuerpo de la solicitud con el esquema
        const { error, value } = fondoBodySchema.validate(req.body);

        if (error) {
            // Si hay un error de validación, enviar un mensaje de error personalizado
            return res.status(400).send({ message: error.message });
        }

        // Crear un nuevo fondo utilizando los datos validados
        const nuevoFondo = new Fondo(value);
        await nuevoFondo.save();

        res.status(201).send(nuevoFondo);  // 201 Created
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            // Si es un error de validación de Mongoose, enviar un mensaje de error personalizado
            res.status(400).send({ message: error.message });
        } else {
            // Si es otro tipo de error, pasarlo al siguiente middleware de manejo de errores
            next(error);
        }
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const fondoActualizado = await Fondo.findByIdAndUpdate(id, req.body, { new: true });
        if (!fondoActualizado) {
            return res.status(404).send();  // 404 Not Found
        }
        res.json(fondoActualizado);
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const fondo = await Fondo.findByIdAndDelete(id);

        if (!fondo) {
            return res.status(404).send({ message: 'Fondo no encontrado' });
        }

        res.send({ message: 'Fondo eliminado exitosamente', data: fondo });
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error al eliminar el fondo' });
    }
};