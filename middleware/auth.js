const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    
    // Leer el token del header
    const token = req.header('x-auth-token'); // en cada reques se tiene que enviar
    

    // Revisar si no hay token
    if(!token) {
        return res.status(401).json({ msg: 'No hay token, Permiso No Valido' });
    }

    // validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();

    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });

    }
}