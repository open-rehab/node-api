var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Paciente = mongoose.model('Paciente');

var terapiaSchema = new Schema({
	practica: String,
	tiempo: Number,
	ejeY: { type: Number, default: []},
	ejeZ: Number,
	musculo: Number,
	fecha: Date,
	paciente: {
		type: Schema.ObjectId,
		ref: "Paciente"
	}
});

module.exports = mongoose.model("Terapia", terapiaSchema);