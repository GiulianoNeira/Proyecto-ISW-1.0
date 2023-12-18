"use strict";

const express = require("express");
const proyecController = require("../controllers/proyect.controller.js");
const authenticationMiddleware = require('../middlewares/authentication.middleware');
const { isAdmin } = require('../middlewares/authorization.middleware');


const router = express.Router();

router.get("/", proyecController.obtain);
router.get("/:id", proyecController.obtainById);
router.post("/crear", proyecController.create);
router.put("/:id", authenticationMiddleware, isAdmin, proyecController.update);
router.delete("/:id", authenticationMiddleware, isAdmin, proyecController.delete);

module.exports = router;
