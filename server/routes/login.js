const express = require('express'); //web server
const bcrypt = require('bcrypt'); //modulo para encrytar 
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario'); //mi modelo de usuario
const app = express();

app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: '(Usuario) o contraseña incorrecto.'
                    }
                });
            }
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrecto.'
                }
            });

        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })

    })

})

module.exports = app;