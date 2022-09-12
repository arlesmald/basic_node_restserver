const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/generarJWT')

const login = async (req, res = response) => {

    const {correo, password} = req.body;

    try {

        const usuario = await Usuario.findOne({ correo });

        //Verify if the user exists
        if(!usuario){
            return res.status(400).json({
                msg:"Correo / Password invalidos"
            });
        }

        //Verify if the user is active
        if(!usuario.estado){
            return res.status(400).json({
                msg:"Correo / Password invalidos"
            });
        }

        //Verify the password
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if( !validPassword ){
            return res.status(400).json({
                msg:"Correo / Password invalidos"
            });
        }

        const token = await generarJWT( usuario.id )

        res.json({
            usuario,
            token:token
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg:"Algo salio mal."
        })
    }

    

}

module.exports = {
    login
}