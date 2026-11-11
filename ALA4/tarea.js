"use strict";

const ESTADOS = Object.freeze({
    PENDIENTE: "Pendiente",
    EN_CURSO: "En Curso",
    TERMINADA: "Terminada",
    CANCELADA: "Cancelada"
});

const DIFICULTADES = Object.freeze({
    FACIL: "Facil",
    MEDIO: "Medio",
    DIFICIL: "Dificil"
});

// Crea una tarea nueva. La fecha "ahora" entra como argumento (así la función es pura).
const crearTarea = (datos, ahora) => {
    let estado = ESTADOS.PENDIENTE;
    if (datos.estado) {
        estado = datos.estado;
    }

    let dificultad = DIFICULTADES.FACIL;
    if (datos.dificultad) {
        dificultad = datos.dificultad;
    }

    return Object.freeze({
        titulo: datos.titulo,
        descripcion: datos.descripcion || "",
        estado: estado,
        creacion: ahora,
        ultimaEdicion: ahora,
        vencimiento: datos.vencimiento || null,
        dificultad: dificultad
    });
};

// Devuelve una tarea NUEVA con los cambios aplicados; la original no se toca.
const actualizarTarea = (tarea, cambios, ahora) => {
    return Object.freeze({
        ...tarea,
        ...cambios,
        ultimaEdicion: ahora
    });
};

module.exports = { ESTADOS, DIFICULTADES, crearTarea, actualizarTarea };