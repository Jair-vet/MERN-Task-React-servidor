const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        required: false,
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto',
    }
});

module.exports = mongoose.model('Tarea', Schema);