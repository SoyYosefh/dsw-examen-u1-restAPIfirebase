// tareasRoutes.js:
const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, tareasController.getAllTareas);
router.post('/', authenticateToken, tareasController.createTarea);
router.put('/:id', authenticateToken, tareasController.updateTarea);
router.patch('/:id/terminada', authenticateToken, tareasController.marcarTareaComoTerminada);
router.patch('/:id/no-terminada', authenticateToken, tareasController.marcarTareaComoNoTerminada);
router.delete('/:id', authenticateToken, tareasController.eliminarTarea);


module.exports = router;