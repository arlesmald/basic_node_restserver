
const validaCampos = require('./validar-campos');
const validajwt = require('./validar-jwt');
const validaRoles = require('./validar-roles');

module.exports = {
    ...validaCampos,
    ...validajwt,
    ...validaRoles
}