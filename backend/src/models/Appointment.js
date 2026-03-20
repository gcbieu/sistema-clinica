const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    data: { type: String, required: true },
    hora: { type: String, required: true },
    cep: { type: String, required: true },
    rua: { type: String },
    cidade: { type: String },
    previsaoClima: { type: String, default: "Ensolarado" },
    criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);