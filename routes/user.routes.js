
const { Router } = require('express');
const { check } = require('express-validator');
const { 
    validarCamposUser,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares/index');

const { esRolValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');
const { userGet, userPost, userPut, userDelete, userPatch } = require('../controllers/users.controller');





const router = Router();

router.get('/', userGet);

router.post('/', [
    check('email', 'El email es obligatorio.').isEmail(),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña es obligatorio y debe de tener más de 6 dígitos.').isLength({min: 6}),
    //check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( esRolValido ),
    check('email').custom( emailExiste ),
    validarCamposUser
], userPost);

router.put('/:id', [
    //check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('role').custom( esRolValido ),
    validarCamposUser
    
], userPut);

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id').custom(existeUsuarioPorID),
    validarCamposUser
], userDelete);

router.patch('/', userPatch);

module.exports = router;