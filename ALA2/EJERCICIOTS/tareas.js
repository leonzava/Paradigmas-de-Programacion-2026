"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listaDeTareas = void 0;
exports.crearTarea = crearTarea;
exports.agregarTarea = agregarTarea;
// --- Datos ---
// Le decimos explícitamente que es un array de Tarea.
const listaDeTareas = [];
exports.listaDeTareas = listaDeTareas;
// --- Funciones ---
// Cada parámetro lleva su tipo, y ": Tarea" al final dice qué devuelve.
function crearTarea(titulo, descripcion = "", estado = "Pendiente", dificultad = "Facil", vencimiento = null) {
    return {
        titulo,
        descripcion,
        estado,
        dificultad,
        creacion: new Date(),
        ultimaEdicion: new Date(),
        vencimiento
    };
}
function agregarTarea(lista, tarea) {
    // ": void" significa que la función no devuelve nada,
    // igual que en tu versión de JS.
    lista.push(tarea);
}
