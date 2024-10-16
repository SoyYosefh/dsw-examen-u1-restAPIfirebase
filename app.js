// app.js

const express = require('express');
const bodyParser = require('body-parser');
const tareasRoutes = require('./routes/tareasRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/tareas', tareasRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.use((req, res) => {
    res.status(404).json({ code: 404, message: "Pagina no encontrada." });
});

module.exports = app;