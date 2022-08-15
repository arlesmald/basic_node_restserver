const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/users.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, existeUsuarioporID } = require('../helpers/db-validator');
const router = Router();

//Aqui la ruta no es necesaria porque ya fue configurada en la clase como api/usuarios
router.get('/', usuariosGet);

router.put('/:id', 
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom( existeUsuarioporID ),
    check('rol').custom( esRolValido ),
    validarCampos
    ,usuariosPut);

//**El segundo argumento signifian el middleware y en caso de que se vayan a ejecutar varios middlewares entonces se mandan como arreglo */
router.post('/', [
    check('correo','El correo no es válido').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'EL password debe tener al menos 6 caracteres').isLength({min: 6}),
    check('rol').custom( esRolValido ),
    //check('rol', 'El rol es inválido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
] ,usuariosPost);

router.delete('/:id', [
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom( existeUsuarioporID ),
    validarCampos
] ,usuariosDelete);





module.exports = router;