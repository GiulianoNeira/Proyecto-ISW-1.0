// controllers/ganador.controller.js
const Ganador = require('../models/ganador.model');
const Concurso = require('../models/concurso.model');
const Clasificacion = require('../models/clasificacion.model');

exports.findAll = async (req, res, next) => {
  try {
    const ganador = await Ganador.find();
    res.json(ganador);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    // Obtén el Concurso asociado al Ganador
    const concurso = await Concurso.findById(req.body.idConcurso);
    if (!concurso) {
      return res.status(404).send({ message: 'Concurso no encontrado' });
    }

    // Obtén la Clasificación asociada al Ganador
    const clasificacion = await Clasificacion.findById(req.body.idClasificacion);
    if (!clasificacion || clasificacion.estado !== 'Aprobado') {
      return res.status(400).send({ message: 'Clasificación no aprobada' });
    }

    // Verifica si el monto asignado no supera el monto a repartir del Concurso
    if (req.body.montoAsignado > concurso.montoARepartir) {
      return res.status(400).send({ message: 'El monto asignado supera el monto a repartir del concurso' });
    }

    // Crea un nuevo Ganador
    const nuevoGanador = new Ganador(req.body);
    await nuevoGanador.save();

    // Actualiza el monto a repartir del Concurso
    concurso.montoARepartir -= nuevoGanador.montoAsignado;
    await concurso.save();

    res.status(201).send(nuevoGanador);  // 201 Created
  } catch (error) {
    next(error);
  }
};


exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ganadorActualizado = await Ganador.findByIdAndUpdate(id, req.body, { new: true });
    if (!ganadorActualizado) {
      return res.status(404).send();  // 404 Not Found
    }

    res.json(ganadorActualizado);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const ganador = await Ganador.findByIdAndDelete(id);

    if (!ganador) {
      return res.status(404).send({ message: 'Ganador no encontrado' });
    }

    res.send({ message: 'Ganador eliminado exitosamente', data: ganador });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error al eliminar el ganador' });
  }
};
