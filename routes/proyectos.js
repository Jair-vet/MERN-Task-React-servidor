const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');


// Crea proyectos
// api/proyectos
router.post('/', 
    auth,
    [
        check('nombre', 'El Nombre del Proyecto es obligatorio').not().isEmpty(),
    ],
    proyectoController.crearProyecto
);

// Obtener todos los proyectos del usuario actual
router.get('/', 
    auth,
    proyectoController.obtenerProyectos
);

// Actualizar Proyecto
router.put('/:id',
    auth, // Usuario este logeado
    [
        check('nombre', 'El Nombre del Proyecto es obligatorio').not().isEmpty(),
    ],
    proyectoController.actualizarProyecto
);

// Eliminar un Proyecto 
router.delete('/:id', 
    auth,
    proyectoController.eliminarProyecto
);



module.exports = router;
