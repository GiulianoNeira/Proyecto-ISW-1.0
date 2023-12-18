"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Instancia del enrutador */
const router = express.Router();

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");
// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

/** Enrutador de Concurso */
const concursoRoutes = require("./concurso.routes.js");
// Define las rutas para Concurso /api/concurso
router.use("/concurso", concursoRoutes);

/** Enrutador de Fondo */
const fondoRoutes = require("./fondos.routes.js");
// Define las rutas para Fondo /api/fondo
router.use("/fondos", fondoRoutes);

// Importa y utiliza las rutas de los diferentes módulos de tu aplicación
const postulacionRoutes = require("./postulacion.routes");
// Agrega las rutas de los diferentes módulos aquí
router.use("/postulacion", postulacionRoutes);

const clasificacionRoutes = require("./clasificacion.routes.js"); // Agrega esta línea
router.use("/clasificacion", clasificacionRoutes); // Agrega esta línea

const evaluacionRoutes = require("./evaluacion.routes.js"); // Agrega esta línea
router.use("/evaluacion", authenticationMiddleware, evaluacionRoutes); // Agrega esta línea

// Importa y utiliza las rutas de los diferentes módulos de tu aplicación
const proyecRoutes = require("./proyec.routes");
// Agrega las rutas de los diferentes módulos aquí
router.use("/proyec", proyecRoutes);

module.exports = router;


