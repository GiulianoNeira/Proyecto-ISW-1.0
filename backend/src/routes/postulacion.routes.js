const express = require("express");
const router = express.Router();
const postulacionesController = require("../controllers/postulacion.controller");

// Ruta para crear una nueva postulación
router.post("/", postulacionesController.crearPostulacion);

// Ruta para buscar una postulación por ID
router.get("/:id", postulacionesController.buscarPostulacionPorId);

// Ruta para eliminar una postulación por ID
router.delete("/:id", postulacionesController.eliminarPostulacionPorId);

// Ruta para actualizar una postulación, incluyendo la creación de un nuevo estado si es necesario
router.put("/:id", postulacionesController.actualizarPostulacion);

// Ruta para listar todas las postulaciones por el rut del representante
router.get("/rut/:rutRepresentante",
 postulacionesController.listarPostulacionesPorRutRepresentante);

// Ruta para buscar todas las postulaciones


module.exports = router;
