const { Schema, model, default: mongoose } = require('mongoose');
const { schema } = require('./usuario');

const RolSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

module.exports = model('Role', RolSchema);