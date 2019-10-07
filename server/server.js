require('./config/config');
const express = require('express')
const app = express();
const mongoose = require('mongoose')

const bodyParser = require('body-parser'); //para recibir parametros por POST
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//carga rutas
app.use(require('./routes/index'))

mongoose.connect(process.eventNames.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto ', process.env.PORT);
})