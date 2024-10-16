// tareaController.js

const tareaModel = require('../models/tareasModel');

async function getAllTareas(req, res) {

    const apikey = req.body.apikey;
    try {

        const tareas = await tareaModel.getAllTareas(apikey);  // Llama al modelo para obtener las tareas filtradas por usuario
        // console.log("Tareas:", tareas);
        if (tareas && tareas.length > 0) {
            res.status(200).json(tareas);
        } else {
            res.status(404).json({ code: 404, message: "No se encontraron tareas para este usuario." });
        }

    } catch (error) {
        console.error("Error al obtener las tareas:", error);
        res.status(500).json({ code: 500, message: "Error al obtener las tareas" });
    }

}

async function updateTarea(req, res) {
    const { apikey } = req.body; // Obtiene el apikey del cuerpo de la solicitud
    const { id } = req.params; // Obtiene el id de la tarea de los parámetros de la URL
    const nuevaData = req.body; // Obtiene los nuevos datos del cuerpo de la solicitud

    const tarea = await tareaModel.getTareaById(id);

    if (tarea) {
        // Verificar que el usuario que intenta actualizar es el mismo que creó la tarea
        if (tarea.usuario === apikey) {
            const updatedData = {
                name: nuevaData.name,
                description: nuevaData.description,
                startDate: nuevaData.startDate,
                endDate: nuevaData.endDate,
                status: nuevaData.status
            };

            await tareaModel.updateTarea(id, updatedData);
            return res.status(200).json({ success: true, message: 'Tarea actualizada correctamente.' });
        } else {
            return res.status(403).json({ success: false, message: 'No tienes permiso para actualizar esta tarea.' });
        }
    } else {
        return res.status(404).json({ success: false, message: 'Tarea no encontrada.' });
    }
}

async function createTarea(req, res) {
    const newTarea = await tareaModel.createTarea(req.body);
    res.status(201).json(newTarea);
}

async function marcarTareaComoTerminada(req, res) {
    const { apikey } = req.body; // Obtiene el apikey del cuerpo de la solicitud
    const { id } = req.params; // Obtiene el id de la tarea de los parámetros de la URL

    const tarea = await tareaModel.getTareaById(id);

    if (tarea) {
        // Verificar que el usuario que intenta actualizar es el mismo que creó la tarea
        if (tarea.usuario === apikey) {
            // Actualiza el estado de la tarea a "Terminado"
            await tareaModel.updateTarea(id, { status: 'Terminado' });
            return res.status(200).json({ success: true, message: 'Tarea marcada como terminada.' });
        } else {
            return res.status(403).json({ success: false, message: 'No tienes permiso para actualizar esta tarea.' });
        }
    } else {
        return res.status(404).json({ success: false, message: 'Tarea no encontrada.' });
    }
}

async function marcarTareaComoNoTerminada(req, res) {
    const { apikey } = req.body; // Obtiene el apikey del cuerpo de la solicitud
    const { id } = req.params; // Obtiene el id de la tarea de los parámetros de la URL

    const tarea = await tareaModel.getTareaById(id);

    if (tarea) {
        // Verificar que el usuario que intenta actualizar es el mismo que creó la tarea
        if (tarea.usuario === apikey) {
            // Actualiza el estado de la tarea a "No Terminada"
            await tareaModel.updateTarea(id, { status: 'No Terminada' });
            return res.status(200).json({ success: true, message: 'Tarea marcada como no terminada.' });
        } else {
            return res.status(403).json({ success: false, message: 'No tienes permiso para actualizar esta tarea.' });
        }
    } else {
        return res.status(404).json({ success: false, message: 'Tarea no encontrada.' });
    }
}

async function eliminarTarea(req, res) {
    const { apikey } = req.body; // Obtiene el apikey del cuerpo de la solicitud
    const { id } = req.params; // Obtiene el id de la tarea de los parámetros de la URL

    const tarea = await tareaModel.getTareaById(id);

    if (tarea) {
        // Verificar que el usuario que intenta eliminar es el mismo que creó la tarea
        if (tarea.usuario === apikey) {
            await tareaModel.deleteTarea(id); // Asume que tienes un método para eliminar tareas
            return res.status(200).json({ success: true, message: 'Tarea eliminada correctamente.' });
        } else {
            return res.status(403).json({ success: false, message: 'No tienes permiso para eliminar esta tarea.' });
        }
    } else {
        return res.status(404).json({ success: false, message: 'Tarea no encontrada.' });
    }
}

module.exports = {
    getAllTareas,
    createTarea,
    updateTarea,
    marcarTareaComoTerminada,
    marcarTareaComoNoTerminada,
    eliminarTarea
};