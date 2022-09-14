const { response } = require("express");
const { Producto } = require('../models');

const obtenerProductos = async(req, res = response) => {

    const { limit=5, desde=0 ,page=1, nombre='No name', apikey } = req.query;
    const condicion = { estado: true };

    const [productos, total] = await Promise.all([
        Producto.find(condicion).populate("usuario","nombre").populate("categoria","nombre").skip(desde).limit(limit),
        Producto.countDocuments(condicion)
    ]);

    res.json({
        total,
        productos
    })
}

const obtenerProducto = async(req, res = response) => {

    const {id} = req.params;

    const producto = await Producto.findById( id ).populate("usuario","nombre").populate("categoria","nombre");

    res.json({
        producto
    })

}

const crearProducto = async(req, res = response) => {
    
    const {estado=true, usuario, precio=0, categoria, descripcion='', } = req.body;
    const nombre = req.body.nombre.toUpperCase();

    
    const productoDB = await Producto.findOne({nombre});

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe.`
        })
    }

    const data = {
        nombre,
        estado,
        usuario: req.usuario._id,
        precio,
        categoria,
        descripcion,
    };

    
    const producto = new Producto( data );
    await producto.save();

    res.status(201).json(producto);

}

const actualizarProducto = async(req, res = response) => {

    const { id } = req.params;
    const {estado, usuario, ...data} = req.body;

    if( data.nombre ){

        data.nombre = data.nombre.toUpperCase();
    }
    
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data , { new: true })

    res.json({
        ok: true,
        producto
    });

}

const borrarProducto = async(req, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate( id, {estado:false}, { new: true } );

    res.json({
        producto
    })

}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}


