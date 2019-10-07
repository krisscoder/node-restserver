//define modelo
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
let Schema = mongoose.Schema;
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role válido.'
}

//campos de coleccion (tabla)
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario.']
    },
    password: {
        type: String,
        required: [true, 'El password es necesario.']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//eliminamos el passwords del objeto JSON que va devolver luego de crear el usuario o login
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
        message: '{PATH} debe ser único.'
    })
    //exporta el modelo para usarse externamente
module.exports = mongoose.model('Usuario', usuarioSchema)