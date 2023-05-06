const {Schema, model} = require('mongoose');

const RoleSchema = Schema({
    role:{
        type: String,
        required: [true, 'El rol es obligatorio'],
        unique: [true, 'El rol ya existe']
    }
});

module.exports = model('Role', RoleSchema);