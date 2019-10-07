//puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//vencimiento del token
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//SEED de autenticacion
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//base de datos
let urlDB;

if (process.env.NODE_ENV == 'dev') {
    //es dev (loca)
    urlDB = 'mongodb://localhost:27017/cafe';

} else {
    //es produccion
    urlDB = process.env.MONGO_URI;
}

process.eventNames.URLDB = urlDB;