const mongoose = require('mongoose');
const { Category, Role, User, Product } = require('../models');

const esRolValido = async (role = '') => {
    const existeRol = await Role.findOne({role});

    if(!existeRol){
        throw new Error(`El rol ${role} no está registrado en la BD`);
    }
}

//verificar si el correo existe
const emailExiste = async (email = '')=> {
    const validarEmail = await User.findOne({email});
    if(validarEmail){
        throw new Error(`El email ${email} ya está registrado en la BD`);
    } 

}

const existeUsuarioPorID = async (id)=> {
    if (mongoose.Types.ObjectId.isValid(id)) {
        const existId = await User.findById(id);
     if (!existId) {
        throw new Error(`El id  ${id}  no existe en la BD`);
        }
    }else{
        throw new Error(`El id ${id} no es válido`);
    }

}

const existeCategoriaPorID = async (id)=> {
    if (mongoose.Types.ObjectId.isValid(id)) {
        const existId = await Category.findById(id);
     if (!existId) {
        throw new Error(`El id  ${id}  no existe en la BD`);
        }
    }else{
        throw new Error(`El id ${id} no es válido`);
    }

}

const existeProductoPorID = async (id)=> {
    if (mongoose.Types.ObjectId.isValid(id)) {
        const existId = await Product.findById(id);
     if (!existId) {
        throw new Error(`El id  ${id}  no existe en la BD`);
        }
    }else{
        throw new Error(`El id ${id} no es válido`);
    }

}

const validarSiStatusEsBoolean = async (status)=> {
    if(typeof status !== "boolean") {
        throw new Error(`El status ${status} no es válido, debe de ser un booleano (true, false)`);
    }
}

const coleccionesPermitidas = async (coleccion = '', colecciones = []) => {

    const existe = colecciones.includes(coleccion);

    if( !existe ){
        throw new Error(`La coleccion ${coleccion} no es permitada, Debe ser ${colecciones}`);
    }

    return true;
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorID,
    existeCategoriaPorID,
    existeProductoPorID,
    validarSiStatusEsBoolean,
    coleccionesPermitidas
}
