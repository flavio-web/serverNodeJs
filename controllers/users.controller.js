const User = require('../models/user');
const bcrypt = require('bcryptjs');
const bcryptjs = require('bcryptjs');


const userGet = async (req, res) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {status: true};

    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .limit(Number(limite))
        .skip(Number(desde))
    ]);

    res.json({
        'status': true,
        'message': 'Metodo GET',
        'result': usuarios,
        total
    });
}

const userPost = async (req, res) => {
    const {name, email, password, role} = req.body;
    const usuario = new User( {name, email, password, role} );

    //Encriptar password
    const salt = bcrypt.genSaltSync(); //el 10 es por defecto
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar bd
    usuario.save();

    res.status(201).json({
        'status': true,
        usuario
    });
}

const userPut = async (req, res) => {

    const { id } = req.params;
    const {_id, password, google, email, ...resto } = req.body;

    //verificar que el ID EXISTA
    if(password){
        //Encriptar password
        const salt = bcrypt.genSaltSync(); //el 10 es por defecto
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await User.findByIdAndUpdate(id, resto);

    res.json({
        'status': true,
        'message': 'Metodo PUT',
        'result': usuario
    });
}

const userDelete = async (req, res) => {

    const { id } = req.params;

    const usuarioAutenticado = req.usuario;

    //borrar fisicamente
    //const usuario = await User.findByIdAndDelete( id )

    //actualizar solo el estado del usuario
    const usuario =  await User.findByIdAndUpdate(id,{status: false} );
    
    res.json({
        'status': true,
        'message': 'Metodo DELETE',
        'result': usuario,
        usuarioAutenticado
    });
}

const userPatch = (req, res) => {
    res.json({
        'status': true,
        'message': 'Metodo PATCH'
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}