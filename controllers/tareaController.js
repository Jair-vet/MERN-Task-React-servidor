const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

// Crea una Nueva Tarea
exports.crearTarea = async (req, res) => {

     // Revisar si hay errores
     const errores = validationResult(req);
     if (!errores.isEmpty()) {
         return res.status(400).json({ errores: errores.array() });
     }

     
     try {

        // Extraer proyecto y comprobar si existe
        const { proyecto } = req.body;


        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }

        // Creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save(); // Guardar la tarea
        res.json({ tarea }); // imprimir la tarea creada


     } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
     }
}


// Obtinene las Tareas por Proyecto
exports.obtenerTareas = async (req, res) => {
    
        try {
            // Extraer proyecto y comprobar si existe
            const { proyecto } = req.query;
    
            const existeProyecto = await Proyecto.findById(proyecto);
            if (!existeProyecto) {
                return res.status(404).json({ msg: 'Proyecto no encontrado' });
            }
    
            // Revisar si el proyecto actual pertenece al usuario autenticado
            if (existeProyecto.creador.toString() !== req.usuario.id) {
                return res.status(401).json({ msg: 'No Autorizado' });
            }
    
            // Obtener las tareas por proyecto
            const tareas = await Tarea.find({ proyecto }).sort({creado: -1});
            res.json({ tareas });
    
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un Error')
        }
}

// Actualizar tarea
exports.actualizarTarea = async (req, res) => {
    try {
        // Extraer proyecto y comprobar si existe
        const { proyecto, nombre, estado } = req.body;

        // Si la Tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if (!tarea) {
            return res.status(404).json({ msg: 'Tarea no encontrada' });
        }

        // Extrae Proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
    
        // Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }

        // Crear un objeto con la nueva información
        const nuevaTarea = {};
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;


        // Guardar la tarea
        tarea = await Tarea.findByIdAndUpdate({_id: req.params.id},  nuevaTarea, {new: true});
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

// Eliminar tarea
exports.eliminarTarea = async (req, res) => {
    try {

        // Extraer proyecto y comprobar si existe
        const { proyecto } = req.query;

        // Si la Tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if (!tarea) {
            return res.status(404).json({ msg: 'Tarea no encontrada' });
        }

        // Extrae Proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
    
        // Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }

        //Eliminar
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({ msg: 'Tarea Eliminada' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}