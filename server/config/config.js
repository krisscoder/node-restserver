//puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

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