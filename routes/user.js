const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/users.controller');
const router = Router();

//Aqui la ruta no es necesaria porque ya fue configurada en la clase como api/usuarios
router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);





module.exports = router;