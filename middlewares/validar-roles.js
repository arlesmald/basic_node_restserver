const { response } = require("express")

const esAdminRole= (req, res = response, next) => {

    if( !req.usuario ) {
        return res.status(500).json({
            msg:'Se quiere verificar el role sin validar el token primero.'
        })
    }

    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg:`${nombre} no es administrador`
        })
    }

    next();
}


//* Aqui el spread creara un arreglo con los argumentos recibidos
const tieneRol = ( ...roles ) => {

    return ( req, res=response, next ) => {
        if( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
        // console.log(resto);
        next()
    }

}

module.exports = {
    esAdminRole, 
    tieneRol
}