const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('Authorization');

    if ( !token ){
        return res.status(401).json({
            msg:"No hay token en la petición"
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Obtener el usuario que está usando el token
        const usuario = await Usuario.findById(uid);

        if( !usuario ) {
            return res.status(401).json({
                msg:"Token no válido"
            });
        }

        //Verificar que el usuario no esté deshabilitado
        if( !usuario.estado ) {
            return res.status(401).json({
                msg:"Token no válido"
            });
        }

        req.usuario = usuario;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg:"Token no valido"
        })
        
    }
}

module.exports = {
    validarJWT
}