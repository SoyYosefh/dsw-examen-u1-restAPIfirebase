const swaggerJsdoc = require('swagger-jsdoc');

// Definición de configuración de Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Proyectos y Usuarios',
            version: '1.0.0',
            description: 'API para gestionar proyectos y usuarios con autenticación por apikey.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local'
            },
        ],
    },
    apis: [
        './routes/userRoutes.js',
        './routes/authRoutes.js',
        './routes/tareasRoutes.js',
    ], // Rutas donde estarán los comentarios de Swagger
};

const swaggerSpecs = swaggerJsdoc(options);

module.exports = swaggerSpecs;
