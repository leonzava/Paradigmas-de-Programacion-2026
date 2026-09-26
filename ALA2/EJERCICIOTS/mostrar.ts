import type { Tarea, Dificultad } from "./tareas";

function obtenerIconoDificultad(dificultad: Dificultad): string {
    switch (dificultad) {
        case "Facil": return "***";
        case "Medio": return "**-";
        case "Dificil": return "*--";
        default: return "*--";
    }
}

function recorrerTareas(lista: Tarea[]): void {
    if (lista.length === 0) {
        console.log("No hay tareas para mostrar.");
        return;
    }
    for (const [index, tarea] of lista.entries()) {
        console.log(`[${index + 1}] ${tarea.titulo}`);
    }
}

function mostrarDetalle(tarea: Tarea): void {
    console.log("\n--- Detalle de la tarea ---");
    console.log(`Titulo:         ${tarea.titulo}`);
    console.log(`Descripcion:    ${tarea.descripcion || "Sin datos"}`);
    console.log(`Estado:         ${tarea.estado}`);
    console.log(`Dificultad:     ${obtenerIconoDificultad(tarea.dificultad)} (${tarea.dificultad})`);
    console.log(`Vencimiento:    ${tarea.vencimiento ? new Date(tarea.vencimiento).toLocaleDateString() : "Sin Datos"}`);
    console.log(`Creacion:       ${tarea.creacion.toLocaleDateString()}`);
    console.log(`Ultima edicion: ${tarea.ultimaEdicion.toLocaleDateString()}`);
    console.log("----------------------------\n");
}

export { obtenerIconoDificultad, recorrerTareas, mostrarDetalle };