const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async(req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    // Extraer email y password
    const { email, password } = req.body;


    // Crear un nuevo User
    try {
        // Revisar que el usuario sea unico
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({msg: 'El usuario ya existe'});
        }

        // Crea el nuevo usuaio en la base de datos
        usuario = new Usuario(req.body);

        // Hashear el password
        const salt = await bcryptjs.genSalt(10); // Nos genera un Hash unico
        usuario.password = await bcryptjs.hash(password, salt);


        // Guarda el usuario en la base de datos
        await usuario.save();

        // Crear el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        // Firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 36000
        }, (error, token) => {
            if (error) throw error;

            // Mensaje de confirmación
            res.json({ token });
        });

        // Mensaje de confirmación
        // res.json({msg: 'Usuario Creado Correctamente'});

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
    

}