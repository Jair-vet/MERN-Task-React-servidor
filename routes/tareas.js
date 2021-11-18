const express = require('express');
const router = express.Router();
const  tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

// Crea tareas
// api/tareas
router.post('/',
    auth,
    [
        check('nombre', 'El Nombre de la Tarea es obligatorio').not().isEmpty(),
        check('proyecto', 'El Proyecto es obligatorio').not().isEmpty(),
    ],
    tareaController.crearTarea
);

// Obtener todas las tareas por proyecto
router.get('/',
    auth,
    tareaController.obtenerTareas
);

// Actualizar tarea
router.put('/:id', 
    auth,
    tareaController.actualizarTarea
);

// Eliminar tarea
router.delete('/:id', 
    auth,
    tareaController.eliminarTarea
)

module.exports = router;