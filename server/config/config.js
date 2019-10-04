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
    urlDB = 'mongodb+srv://florlangosta:T6z4j2JGVaRqynLp@cluster0-cptgb.mongodb.net/cafe';
}
urlDB = 'mongodb+srv://florlangosta:T6z4j2JGVaRqynLp@cluster0-cptgb.mongodb.net/cafe';
process.eventNames.URLDB = urlDB;