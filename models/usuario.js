const { Schema, model, default: mongoose } = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'The name is required']
    },
    correo: {
        type: String,
        required:[true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required:[true, 'A password is required']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'] //**Para aceptar que solo sea de esos 2 tipos */
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default:false   
    }

});

//Aqui se sobreescribe el metodo toJSON
usuarioSchema.methods.toJSON = function() {
    const {__v, password, _id ,...usuario} = this.toObject();
    usuario.uid = _id
    return usuario;
}

module.exports = model('Usuario', usuarioSchema);