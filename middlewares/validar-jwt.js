const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validarJWT = async (req, res, next) => {

    const token = req.header('x-token'); //el token tiene el nombre personalizado x-token
    
    if( !token ){
        return res.status(401).json({
            'status': false,
            'msg': 'Debe enviar el token'
        });
    }

    try {
        const KEY = process.env.SECRET_KEY;
        const { uid } = jwt.verify(token, KEY);

        //leer el usuario que corresponde al uid
        const usuario = await User.findById(uid);
        console.log(usuario);

        if( !usuario ){
            return res.status(401).json({
                'status': false,
                'msg': 'Token no valido - usuario no existe en DB'
            });
        }

        //verificar si el uid tiene status == false
        if( !usuario.status ){
            return res.status(401).json({
                'status': false,
                'msg': 'Token no valido - usuario con estado: false'
            });
        }
      
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            'status': false,
            'msg': 'Token no válido'
        });
    }
    
}


module.exports = {
    validarJWT
}