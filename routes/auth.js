const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, existeUsuarioporID } = require('../helpers/db-validator');
const router = Router();

//Aqui la ruta no es necesaria porque ya fue configurada en la clase como api/usuarios
router.post('/login', [
    check('correo', "El correo es obligatorio").isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
] ,login);

module.exports = router;