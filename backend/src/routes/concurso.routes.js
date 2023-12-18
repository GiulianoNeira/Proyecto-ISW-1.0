"use strict";

const express = require("express");
const concursoController = require("../controllers/concurso.controller"); // Asegúrate de que el controlador tenga el nombre correcto

// Middlewares de autorización
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

// Middleware de autenticación
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Ruta para obtener todos los concursos. Todos los usuarios pueden acceder.
router.get('/', concursoController.findAll);

// Ruta para obtener un concurso por su ID. Todos los usuarios pueden acceder.
router.get('/:id', concursoController.findOne);

// Ruta para crear un nuevo concurso. Solo accesible para administradores.
router.post('/', authorizationMiddleware.isAdmin, concursoController.create);

// Ruta para actualizar un concurso existente. Solo accesible para administradores.
router.put('/:id', authorizationMiddleware.isAdmin, concursoController.update);

// Ruta para eliminar un concurso existente. Solo accesible para administradores.
router.delete('/:id', authorizationMiddleware.isAdmin, concursoController.delete);

module.exports = router;
