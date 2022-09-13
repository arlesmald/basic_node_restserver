const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async ( req, res = response ) => {

    const { id_token } =  req.body;

    try {

        const {name: nombre, picture: img, email:correo} = await googleVerify( id_token );

        // console.log(correo);
        // return;
         
        let usuario = await Usuario.findOne({ correo });  

        if ( usuario == null ) {

            const data = {
                nombre,
                correo,
                password:'Google',
                img,
                rol:'USER_ROLE',
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        if( !usuario.estado ){
            return res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado'
            })
        }

        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {

        res.status(400).json({
            ok:false,
            msg:error
        })
    }


}

module.exports = {
    login,
    googleSignIn
}