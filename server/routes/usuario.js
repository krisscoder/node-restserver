const express = require('express'); //web server
const app = express();
const bcrypt = require('bcrypt'); //modulo para encrytar 
const _ = require('underscore'); //lo vamos a usar para filtrar valores devueltos
const Usuario = require('../models/usuario'); //mi modelo de usuario

app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;

    desde = Number(desde);
    limite = Number(limite);

    //busca registros y muestra solo 
    Usuario.find({ estado: 'true' }, 'nombre email role estado google img') //muentra los q tienen estado=true
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            //si hay un error
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            //si no hay error, cuenta total de registros y devuelve JSON
            Usuario.count({ estado: 'true' }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cantidad: conteo
                })
            })
        })
});

//crea usuario
app.post('/usuario', function(req, res) {
    let body = req.body; //recibe parametros de la peticion y arma el objeto Body

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    //graba en la base de datos y config objeto callback usuarioDB
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //si no hubo error
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

//actualiza un  usuario
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id; //recibe parametro "id" desde la llamada a la API
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); //filtra el body y deja solo estos campos

    //busca y actualiza registros y config objeto callback usuarioDB
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            okd: true,
            usuario: usuarioDB
        })
    })

});

//elimina un usuario
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => { //borra litearlmente el registro

    let cambiaEstado = {
        estado: false
    };
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true, runValidators: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado.'
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
});

module.exports = app;