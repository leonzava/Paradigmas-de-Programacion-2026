"use strict";

// Recibe el valor del vencimiento (Date o null) y devuelve un texto.
const textoVencimiento = (vencimiento) => {
    if (vencimiento === null) {
        return "Sin datos";
    }
    return new Date(vencimiento).toLocaleDateString();
};

const textoFecha = (fecha) => new Date(fecha).toLocaleDateString();

const iconoDificultad = (dificultad) => {
    switch (dificultad) {
        case "Facil":
            return "***";
        case "Medio":
            return "**-";
        case "Dificil":
            return "*--";
        default:
            return "*--";
    }
};

// Devuelve el detalle completo como UN texto; no imprime nada.
const detalleTarea = (tarea) => {
    let descripcion = tarea.descripcion;
    if (descripcion === "") {
        descripcion = "Sin datos";
    }

    const lineas = [
        "\n--- Detalle de la tarea ---",
        `Titulo:         ${tarea.titulo}`,
        `Descripcion:    ${descripcion}`,
        `Estado:         ${tarea.estado}`,
        `Dificultad:     ${iconoDificultad(tarea.dificultad)} (${tarea.dificultad})`,
        `Vencimiento:    ${textoVencimiento(tarea.vencimiento)}`,
        `Creacion:       ${textoFecha(tarea.creacion)}`,
        `Ultima edicion: ${textoFecha(tarea.ultimaEdicion)}`,
        "----------------------------\n"
    ];

    return lineas.join("\n");
};

// Devuelve la lista numerada como UN texto; no imprime nada.
const listaNumerada = (lista) => {
    if (lista.length === 0) {
        return "No hay tareas para mostrar.";
    }

    return lista
        .map((tarea, indice) => `[${indice + 1}] ${tarea.titulo}`)
        .join("\n");
};

module.exports = { textoVencimiento, textoFecha, iconoDificultad, detalleTarea, listaNumerada };