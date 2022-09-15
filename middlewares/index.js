
const validaCampos = require('./validar-campos');
const validajwt = require('./validar-jwt');
const validaRoles = require('./validar-roles');
const validaArchivo = require('./validar-archivo');

module.exports = {
    ...validaCampos,
    ...validajwt,
    ...validaRoles,
    ...validaArchivo
}