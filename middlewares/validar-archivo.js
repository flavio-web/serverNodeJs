
const validarArchivoUpdate = (req, res, next) => {  

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(401).json({
            'status': false,
            'msg': `Debe enviar un archivo a subir`
        });
    }
    next();
}

module.exports = {
    validarArchivoUpdate
}