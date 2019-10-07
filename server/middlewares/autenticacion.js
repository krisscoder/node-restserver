const jwt = require('jsonwebtoken');
//Verificar Token
let verificaToken = (req, res, next) => {
    //obtiene token desde header
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }
        //decoded son todos los datos (decodificados) q vienen en el payload del token
        req.usuario = decoded.usuario;
        next();
    })

}

module.exports = {
    verificaToken
}