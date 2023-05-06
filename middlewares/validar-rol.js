

const esAdminRole = (req, res, next) =>{
    if( !req.usuario ){
        return res.status(500).json({
            'status': false,
            'msg': 'Se require verificar el rol sin validar el token'
        });
    }

    const { role, name } = req.usuario;

    if( role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            'status': false,
            'msg': `${name} no es administrador - No puede hacer esto`
        });
    }

    next();
}

const tieneRole = ( ...roles ) => {
    return (req, res, next) => { 
        if( !req.usuario ){
            return res.status(500).json({
                'status': false,
                'msg': 'Se require verificar el rol sin validar el token'
            });
        }

        if( !roles.includes(req.usuario.role) ){
            return res.status(401).json({
                'status': false,
                'msg': `El servicio require uno de estos roles ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}