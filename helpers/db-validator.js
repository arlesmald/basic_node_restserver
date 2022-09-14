const Role = require('../models/rol');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

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

const existeCategoriaporID = async( id = '' ) => {
    const existeCategoria = await Categoria.findById( id );
    if(!existeCategoria){
        //Throw error es la forma de lanzar un error cuando se hace una validacion personalizada 
        throw new Error(`La categoria no existe.`)
    }
}

const existeProductoporID = async( id = '' ) => {
    const existeProducto = await Producto.findById( id );
    if(!existeProducto){
        //Throw error es la forma de lanzar un error cuando se hace una validacion personalizada 
        throw new Error(`La categoria no existe.`)
    }
}

module.exports = {
    esRolValido,
    existeUsuarioporID,
    existeCategoriaporID,
    existeProductoporID
}