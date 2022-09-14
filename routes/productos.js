const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProducto, crearProducto, actualizarProducto, borrarProducto, obtenerProductos } = require('../controllers/productos.controller');
const { existeProductoporID } = require('../helpers/db-validator');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const router = Router();

// Obtener productos - publico
router.get('/', obtenerProductos)

// Producto por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoporID),
     validarCampos
    ], obtenerProducto)

//Crear producto - privado - persona con token
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'Categoria requerida').isMongoId(),
    validarCampos
], crearProducto)

//Actualizar producto - privado
router.put('/:id',[
    validarJWT,
    check('id').custom( existeProductoporID ),
    check('categoria', 'No es id de Mongo valido').isMongoId(),
    validarCampos
], actualizarProducto)

//Borrar producto - privado
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoporID ),
    validarCampos
], borrarProducto)

module.exports = router;
