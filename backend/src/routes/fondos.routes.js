// fondos.routes.js

"use strict";

const express = require("express");
const fondosController = require("../controllers/fondos.controller");
const authenticationMiddleware = require('../middlewares/authentication.middleware');
const { isAdmin, isUser } = require('../middlewares/authorization.middleware');

const router = express.Router();

router.get('/',authenticationMiddleware, fondosController.findAll);  // Ruta para obtener todos los fondos
router.post('/',authenticationMiddleware, isAdmin, fondosController.create);  // Ruta para crear un nuevo fondo
router.put('/:id',authenticationMiddleware, isAdmin, fondosController.update);  // Ruta para actualizar un fondo existente
router.delete('/:id',authenticationMiddleware, isAdmin, fondosController.delete);  // Ruta para eliminar un fondo existente

module.exports = router;
