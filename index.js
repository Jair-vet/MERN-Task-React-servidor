const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// Crear el Servidor
const app = express();

// Conexión a la DB
conectarDB();

// habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({ extended: true }));


// Puerto de la App
const port = process.env.port || 4000;

// Importar Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));


// Arrancar la App
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor Arrancado en el puerto ${port}`);
});
