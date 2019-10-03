require('./config/config');
const express = require('express')
const app = express();

const bodyParser = require('body-parser'); //para recibir parametros por POST
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/usuario', function(req, res) {
    res.json('get usuario')
});

app.post('/usuario', function(req, res) {
    let body = req.body; //recibe parametros de la peticion y arma el objeto Body

    //condicional para mostrar error en la respuesta si algo no sale como era esperado
    if (body.nombre === undefined) { //si no existe el nombre....
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario.'
        });
    } else {
        res.json({
            persona: body
        })
    }

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto ', process.env.PORT);
})