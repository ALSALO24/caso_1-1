const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SolicitudSchema = Schema({
  nc: String,
  programa: String,
  institucion: String,
  encargado_pro: String,
  fechaini: String,
  status: {
    type: Boolean,
    default: "false"
  }
});

module.exports = mongoose.model('solicituds', SolicitudSchema);
