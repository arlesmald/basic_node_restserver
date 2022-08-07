const { response } = require('express');

const usuariosGet =  (req, res = response) => {

    const { limit=10, page=1, nombre='No name', apikey } = req.query;

    res.json({
        ok: true,
        msg: 'get API - apikey: ' + apikey
    })
}

const usuariosPut =  (req, res = response) => {

    const { id } = req.params;

    res.json({
        ok: true,
        msg: 'put API - id: '+ id
    })
}

const usuariosPost =  (req, res = response) => {

    const { nombre, edad } = req.body

    res.json({
        ok: true,
        msg: `POST - Hola ${nombre}`
    })
}

const usuariosDelete =  (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete API'
    })
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}


