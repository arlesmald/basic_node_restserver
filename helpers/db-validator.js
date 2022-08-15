const Role = require('../models/rol');
const Usuario = require('../models/usuario')

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        //Throw error es la forma de lanzar un error cuando se hace una validacion personalizada 
        throw new Error(`El rol ${rol} no está registrado en la base de datos.`)
    }
}

const existeUsuarioporID = async( id ) => {
    const existeUsuario = await Usuario.findById( id );
    if(!existeUsuario){
        //Throw error es la forma de lanzar un error cuando se hace una validacion personalizada 
        throw new Error(`El usuario no existe.`)
    }
}

module.exports = {
    esRolValido,
    existeUsuarioporID
}