const path = require('path');
const fs = require('fs');
const { subirArchivo } = require("../helpers/subir-archivo");
const { User, Product} = require("../models");



const cargarArchivo = async (req, res) => {

    try{
        //imagenes
        // const nombre = await subirArchivo( req.files, ['pdf'], 'textos' );
        const nombre = await subirArchivo( req.files );
        res.json({
            nombre
        });
    }catch(err){
        res.status(400).json({
            err
        });
    }
    

    
}


const actualizarArchivo = async (req, res) => {

    const { id, coleccion } = req.params;

     let modelo;

    switch(coleccion){
        case 'users':
            modelo = await User.findById(id);
            if( !modelo ){
                return res.status(404).json({
                    msg: 'User not found'
                });
            }

        break;
        case 'products':
            modelo = await Product.findById(id);
            if( !modelo ){
                return res.status(404).json({
                    msg: 'Product not found'
                });
            }
        break;
        default:
            return res.status(500).json({
                msg: 'Aun no se ha creado esta validacion'
            })
             
    }

    //limpiar imagenes previas
    if( modelo.image ){
        //borrar la imagen del servidor
        const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.image);

        if( fs.existsSync( pathImage ) ){
            fs.unlinkSync( pathImage );
        }
    }

   
    const nombre = await subirArchivo( req.files, undefined, coleccion);
    modelo.image = nombre;
    await modelo.save();


    res.json(modelo);
}

const mostrarImagen = async (req, res) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch(coleccion){
       case 'users':
           modelo = await User.findById(id);
           if( !modelo ){
               return res.status(404).json({
                   msg: 'User not found'
               });
           }

       break;
       case 'products':
           modelo = await Product.findById(id);
           if( !modelo ){
               return res.status(404).json({
                   msg: 'Product not found'
               });
           }
       break;
       default:
           return res.status(500).json({
               msg: 'Aun no se ha creado esta validacion'
           })      
    }

    if( modelo.image ){
        //borrar la imagen del servidor
        const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.image);

        if( fs.existsSync( pathImage ) ){
           return res.sendFile( pathImage);
        }
    }

    const pathImageNotFound = path.join(__dirname, '../assets', 'no-image.jpg');

    if( fs.existsSync( pathImageNotFound ) ){
        return res.sendFile( pathImageNotFound);
    }
}

module.exports = {
    cargarArchivo,
    actualizarArchivo,
    mostrarImagen
}