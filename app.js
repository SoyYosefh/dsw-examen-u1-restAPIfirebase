// app.js

const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerConfig'); // Importa tu configuración de Swagger
const tareasRoutes = require('./routes/tareasRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
const port = 3000;

app.use(bodyParser.json());
// Configura Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs)); // Ruta para la documentación de Swagger

app.use('/tareas', tareasRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.use((req, res) => {
    res.status(404).json({ code: 404, message: "Pagina no encontrada." });
});

module.exports = app; // Exporta solo la aplicación Express sin levantar el servidor
