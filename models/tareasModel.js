const { ref, get, set, push, query, orderByChild, equalTo, update, remove } = require("firebase/database");
const { db } = require('../conexion'); // Importa la conexión a Firebase

// Obtener todos los tareas
async function getAllTareas(apikey) {
    // get tareas by apikey (usuario: apikey)

    const dbRef = ref(db, 'tareas');

    // Consulta que filtra las tareas por el campo 'usuario' igual a la apikey
    const snapshot = await get(query(dbRef, orderByChild('usuario'), equalTo(apikey)));

    if (snapshot.exists()) {
        const tareas = snapshot.val();
        return Object.keys(tareas).map(key => {
            const tarea = { id: key, ...tareas[key] }; // Guardar la clave como ID
            delete tarea.usuario; // Eliminar el campo 'usuario'
            return tarea;
        });
    } else {
        return [];
    }
}

// Función para obtener una tarea por ID
async function getTareaById(tareaId) {
    
    const tareaRef = ref(db, `tareas/${tareaId}`);
    const snapshot = await get(tareaRef);
    
    return snapshot.exists() ? snapshot.val() : null;
}

// Función para actualizar una tarea
async function updateTarea(tareaId, nuevaData) {
    const tareaRef = ref(db, `tareas/${tareaId}`);
    await update(tareaRef, nuevaData);
}

// Crear un nuevo tarea con nombre dinámico tipo "Tarea 1", "Tarea 2", etc.
async function createTarea(tarea) {

    const createdAt = new Date().toISOString();
    const newTarea = { // Usar un ID similar al nombre
        name: tarea.name,  // Nombre dinámico basado en el número
        description: tarea.description,
        startDate: tarea.startDate,
        endDate: tarea.endDate,
        status: tarea.status,
        usuario: tarea.apikey,
        createdAt: createdAt
    };
    // Obtener componentes de la fecha y hora
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');  // Día con dos dígitos
    const month = String(now.getMonth() + 1).padStart(2, '0');  // Mes con dos dígitos (getMonth() retorna 0-11)
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');  // Horas con dos dígitos
    const minutes = String(now.getMinutes()).padStart(2, '0');  // Minutos con dos dígitos
    const seconds = String(now.getSeconds()).padStart(2, '0');  // Segundos con dos dígitos

    // Formatear la fecha y hora de acuerdo al formato deseado
    const formattedDate = `${day}-${month}-${year}_${hours}h-${minutes}m-${seconds}s`;

    const tareaName = (tarea.name + '_' + formattedDate).replace(/\s+/g, '_');

    // Guardar el nuevo tarea en Firebase
    await set(ref(db, `tareas/${tareaName}`), newTarea);  // Usar el nuevo nombre como clave en Firebase
    return newTarea;
}

// Función para eliminar una tarea por su ID
async function deleteTarea(id) {
    const dbRef = ref(db, `tareas/${id}`); // Referencia a la tarea en la base de datos

    try {
        await remove(dbRef); // Elimina la tarea de la base de datos
        return { success: true }; // Retorna un objeto de éxito
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        throw new Error('No se pudo eliminar la tarea.'); // Manejo de errores
    }
}

module.exports = {
    getAllTareas,
    createTarea,
    updateTarea,
    getTareaById,
    deleteTarea
};

