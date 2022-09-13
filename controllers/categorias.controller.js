const { response } = require("express");
const { Categoria } = require('../models')

const obtenerCategorias = async(req, res = response) => {

    const { limit=5, desde=0 ,page=1, nombre='No name', apikey } = req.query;
    const condicion = { estado: true };

    const [categorias, total] = await Promise.all([
        Categoria.find(condicion).populate("usuario","nombre").skip(desde).limit(limit),
        Categoria.countDocuments(condicion)
    ]);

    res.json({
        total,
        categorias
    })

}

const obtenerCategoria = async(req, res = response) => {

    const {id} = req.params;

    const categoria = await Categoria.findById( id ).populate("usuario","nombre");

    res.json({
        categoria
    })

}

const crearCategoria = async(req, res = response) => {
    
    const nombre = req.body.nombre.toUpperCase(); 
    
    const categoriaDB = await Categoria.findOne({nombre});

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB} ya existe.`
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }
    
    const categoria = new Categoria( data );
    await categoria.save();

    res.status(201).json(categoria);
}


const actualizarCategoria = async(req, res = response) => {

    const { id } = req.params;
    const nombre = req.body.nombre.toUpperCase();

    const existeCategoria = await Categoria.findOne( {nombre} );

    if( existeCategoria ){
        return res.status(400).json({
            msg:`Ya existe una categoria llamada ${nombre}`
        })
    }

    const categoria = await Categoria.findByIdAndUpdate(id, {nombre})

    res.json({
        ok: true,
        categoria
    });

}

const borrarCategoria = async(req, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate( id, {estado:false} );
    // const usuarioAutenticado = req.usuario;

    res.json({
        categoria
    })
}

module.exports = {
    obtenerCategorias
    ,obtenerCategoria
    ,crearCategoria
    ,actualizarCategoria
    ,borrarCategoria
}