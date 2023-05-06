const { validationResult } = require('express-validator');

const validarCamposUser = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validarCamposUser
}