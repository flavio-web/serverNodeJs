
const validaCampos  = require('../middlewares/user');
const valida_JWT  = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-rol');
const validarArchivoUpdate = require('../middlewares/validar-archivo');

module.exports = {
    ...validaCampos,
    ...valida_JWT,
    ...validaRoles,
    ...validarArchivoUpdate
}