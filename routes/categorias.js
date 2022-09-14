const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias.controller');
const { existeCategoriaporID, existeUsuarioporID } = require('../helpers/db-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

// Obtener categorias - publico
router.get('/', obtenerCategorias)

// Categoria por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaporID),
     validarCampos
    ], obtenerCategoria)

//Crear categoria - privado - persona con token
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

//Actualizar categoria - privado
router.put('/:id',[
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaporID ),
    check('nombre', 'Debe enviar el nombre').not().isEmpty(),
    validarCampos
], actualizarCategoria)

//Borrar categora - privado
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaporID ),
    validarCampos
], borrarCategoria)

module.exports = router;