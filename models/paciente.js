// app/models/paciente.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PacienteSchema = new Schema({
	nombre: String,
	nickname: String,
	edad: Number,
	sexo: String,
	ingreso: Date,
	estatus: {
		type: String,
		default: 'Novato'
	},
	padecimiento: String,
	tiempoDeTerEnDias: Number
});

module.exports = mongoose.model('Paciente', PacienteSchema);