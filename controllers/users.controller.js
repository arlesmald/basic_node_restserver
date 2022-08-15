const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req, res = response) => {

    const { limit=5, desde=0 ,page=1, nombre='No name', apikey } = req.query;
    const condicion = { estado: true };

    // const usuarios = await Usuario.find(condicion).skip(desde).limit(limit);

    // const total = await Usuario.countDocuments(condicion);

    const [usuarios, total] = await Promise.all([
        Usuario.find(condicion).skip(desde).limit(limit),
        Usuario.countDocuments(condicion)
    ]);

    res.json({
        total,
        usuarios
    })
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;

     //Aqui solamente se extraen las propiedades que no queremos que vayan en el objeto
    const {_id, password, google, correo ,...resto } = req.body;

    if( password ) {

        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        ok: true,
        msg: 'put API - id: '+ id,
        usuario
    })
}

const usuariosPost =  async (req, res = response) => {


    const { nombre, correo, password, rol } = req.body

    //**Aunque que se reciban propiedades que no fueron declaradas en el modelo de mongoose, estas seran ignoradas */
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail){
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        });
    }

    //Encriptar el password
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);


    await usuario.save();

    res.json({
        ok: true,
        usuario
    })
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    //**Borrar fisicamente */
    //const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, {estado:false} );

    res.json({
        usuario
    })
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}


