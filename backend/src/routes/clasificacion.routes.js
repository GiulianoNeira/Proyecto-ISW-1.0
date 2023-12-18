"use strict";

const express = require("express");
const clasificacionController = require("../controllers/clasificacion.controller"); // Asegúrate de que el controlador tenga el nombre correcto

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

router.get('/',  authorizationMiddleware.isEvaluador, clasificacionController.getClasificacion);  // Ruta para obtener todos los estados
router.post('/',  authorizationMiddleware.isEvaluador, clasificacionController.createClasificacion);  // Ruta para crear un nuevo estado
router.put('/:id',  authorizationMiddleware.isEvaluador, clasificacionController.updateClasificacion);  // Ruta para actualizar un estado existente
router.delete('/:id',  authorizationMiddleware.isEvaluador, clasificacionController.deleteClasificacion);  // Ruta para eliminar un estado existente
router.get('/id',  authorizationMiddleware.isEvaluador,  authorizationMiddleware.isUser, clasificacionController.getClasificacionById);

module.exports = router;
