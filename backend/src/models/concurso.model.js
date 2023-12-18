const mongoose = require('mongoose');
const Fondo = require('./fondos.model');

const concursoSchema = new mongoose.Schema({
  nombreConcurso: {
    type: String,
    required: true,
  },
  montoTotalFondo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fondo', // modelo para el esquema de Fondo
    required: true,
  },
  montoARepartir: {
    type: Number,
    required: true,
  },
}, {
  versionKey: false,
});


// Middleware pre-save para absorber el monto de un fondo según su ID
concursoSchema.pre('save', async function(next) {
  try {
    const fondo = await Fondo.findById(this.montoTotalFondo);
    if (!fondo) throw new Error('Fondo no encontrado');

    this.montoTotalFondo = fondo._id;

    fondo.montoTotal -= this.montoARepartir;
    await fondo.save();

    // Crea un nuevo Ganador asociado al Concurso y Clasificacion
    const nuevoGanador = new Ganador({
      idConcurso: this._id,
      idClasificacion: this.idClasificacion, // Ajusta esto según tus necesidades
      montoAsignado: this.montoARepartir,
    });

    // Resta automáticamente el monto asignado del monto a repartir del Concurso
    this.montoARepartir -= this.montoARepartir;

    await nuevoGanador.save();
    next();
  } catch (error) {
    next(error);
  }
});

const Concurso = mongoose.model('Concurso', concursoSchema);

module.exports = Concurso;