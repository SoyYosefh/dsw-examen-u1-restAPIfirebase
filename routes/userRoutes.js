// projectRoutes.js:
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *         password:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *         apikey:
 *           type: string
 *           description: Apikey del usuario
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "Yosefh"
 *               password:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Usuario creado exitosamente."
 *                 user:
 *                   type: object
 *                   description: Información del usuario creado
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "Yosefh"
 *                     apikey:
 *                       type: string
 *                       example: "$2a$10$nLVJX2b6jRXq9fDSykA4bu5Q5bZbmSnv5WQMNsQNwgOFjQnsJysv6"
 *       400:
 *         description: Ya existe un usuario con ese nombre
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Ya existe un usuario con ese nombre."
 *       500:
 *         description: Error al crear el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Error al crear el usuario."
 *                 error:
 *                   type: string
 *                   description: Detalle del error (interno)
 */
router.post('/', userController.createUser);

module.exports = router;