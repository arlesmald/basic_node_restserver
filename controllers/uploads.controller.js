const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");


const cargarArchivo = async(req, res = response) => {

    try {
        
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }
    
}

module.exports = { 
    cargarArchivo
}