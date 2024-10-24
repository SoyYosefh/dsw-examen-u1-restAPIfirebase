// tareasRoutes.js:
const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');
const authenticateToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - startDate
 *         - endDate
 *         - estatus
 *       properties:
 *         title:
 *           type: string
 *           description: El título de la tarea
 *         description:
 *           type: string
 *           description: La descripción de la tarea
 *         startDate:
 *           type: string
 *           format: date
 *           description: Fecha de inicio de la tarea
 *         endDate:
 *           type: string
 *           format: date
 *           description: Fecha de finalización de la tarea
 *         status:
 *           type: string
 *           description: Estatus de la tarea
 */


/**
 * @swagger
 * /tareas:
 *   get:
 *     summary: Obtiene todas las tareas de un usuario
 *     tags: [Tareas]
 *     parameters:
 *       - in: body
 *         name: apikey
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             apikey:
 *               type: string
 *               example: "$2a$10$nLVJX2b6jRXq9fDSykA4bu5Q5bZbmSnv5WQMNsQNwgOFjQnsJysv6"
 *     responses:
 *       200:
 *         description: Tareas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Tarea 1"
 *                   description:
 *                     type: string
 *                     example: "Descripción de la tarea 1"
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-01-01"
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-06-01"
 *                   status:
 *                     type: string
 *                     example: "Terminado"
 *       404:
 *         description: No se encontraron tareas para este usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "No se encontraron tareas para este usuario."
 *       500:
 *         description: Error al obtener las tareas
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
 *                   example: "Error al obtener las tareas"
 */
router.get('/', authenticateToken, tareasController.getAllTareas);

/**
 * @swagger
 * /tareas:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               apikey:
 *                 type: string
 *                 example: "$2a$10$nLVJX2b6jRXq9fDSykA4bu5Q5bZbmSnv5WQMNsQNwgOFjQnsJysv6"
 *               name:
 *                 type: string
 *                 example: "Nueva tarea"
 *               description:
 *                 type: string
 *                 example: "Descripción de la nueva tarea"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-06-01"
 *               status:
 *                 type: string
 *                 example: "Pendiente"
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
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
 *                   example: 'Tarea creada exitosamente.'
 *                 tarea:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1"
 *                     name:
 *                       type: string
 *                       example: "Nueva tarea"
 *                     description:
 *                       type: string
 *                       example: "Descripción de la nueva tarea"
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       example: "2024-01-01"
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       example: "2024-06-01"
 *                     status:
 *                       type: string
 *                       example: "Pendiente"
 *       400:
 *         description: Error de validación
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
 *                   example: 'El nombre de la tarea es obligatorio y debe ser una cadena no vacía.'
 *       500:
 *         description: Error interno del servidor
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
 *                   example: 'Error al crear la tarea.'
 */
router.post('/', authenticateToken, tareasController.createTarea);

/**
 * @swagger
 * /tareas/{id}:
 *   put:
 *     summary: Actualiza una tarea existente
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a actualizar
 *         schema:
 *           type: string
 *           example: "1"
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             apikey:
 *               type: string
 *               example: "$2a$10$nLVJX2b6jRXq9fDSykA4bu5Q5bZbmSnv5WQMNsQNwgOFjQnsJysv6"
 *             name:
 *               type: string
 *               example: "Tarea actualizada"
 *             description:
 *               type: string
 *               example: "Descripción actualizada de la tarea"
 *             startDate:
 *               type: string
 *               format: date
 *               example: "2024-01-01"
 *             endDate:
 *               type: string
 *               format: date
 *               example: "2024-06-01"
 *             status:
 *               type: string
 *               example: "En progreso"
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 'Tarea actualizada correctamente.'
 *       403:
 *         description: No tienes permiso para actualizar esta tarea
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'No tienes permiso para actualizar esta tarea.'
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'Tarea no encontrada.'
 */
router.put('/:id', authenticateToken, tareasController.updateTarea);

/**
 * @swagger
 * /tareas/{id}/terminar:
 *   patch:
 *     summary: Marca una tarea como terminada
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "1"
 *         description: ID de la tarea a marcar como terminada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               apikey:
 *                 type: string
 *                 example: "$2a$10$nLVJX2b6jRXq9fDSykA4bu5Q5bZbmSnv5WQMNsQNwgOFjQnsJysv6"
 *     responses:
 *       200:
 *         description: Tarea marcada como terminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Tarea marcada como terminada."
 *       403:
 *         description: El usuario no tiene permiso para actualizar la tarea
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No tienes permiso para actualizar esta tarea."
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Tarea no encontrada."
 */
router.patch('/:id/terminada', authenticateToken, tareasController.marcarTareaComoTerminada);

/**
 * @swagger
 * /tareas/{id}/no-terminar:
 *   patch:
 *     summary: Marca una tarea como no terminada
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "1"
 *         description: ID de la tarea a marcar como no terminada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               apikey:
 *                 type: string
 *                 example: "$2a$10$nLVJX2b6jRXq9fDSykA4bu5Q5bZbmSnv5WQMNsQNwgOFjQnsJysv6"
 *     responses:
 *       200:
 *         description: Tarea marcada como no terminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Tarea marcada como no terminada."
 *       403:
 *         description: El usuario no tiene permiso para actualizar la tarea
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No tienes permiso para actualizar esta tarea."
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Tarea no encontrada."
 */
router.patch('/:id/no-terminada', authenticateToken, tareasController.marcarTareaComoNoTerminada);

/**
 * @swagger
 * /tareas/{id}:
 *   delete:
 *     summary: Elimina una tarea por su ID
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "1"
 *         description: ID de la tarea a eliminar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               apikey:
 *                 type: string
 *                 example: "$2a$10$nLVJX2b6jRXq9fDSykA4bu5Q5bZbmSnv5WQMNsQNwgOFjQnsJysv6"
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Tarea eliminada correctamente."
 *       403:
 *         description: El usuario no tiene permiso para eliminar la tarea
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No tienes permiso para eliminar esta tarea."
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Tarea no encontrada."
 */
router.delete('/:id', authenticateToken, tareasController.eliminarTarea);


module.exports = router;