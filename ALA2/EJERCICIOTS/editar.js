"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarTarea = editarTarea;
const rl_1 = require("./rl");
const fechas_1 = require("./fechas");
function editarTarea(tarea, volver) {
    console.log(`\nEstás editando la tarea "${tarea.titulo}".`);
    console.log("Si deseas mantener el valor de un atributo, déjalo en blanco.");
    console.log("Si deseas dejar en blanco un atributo, escribe un espacio.\n");
    rl_1.rl.question(`1. Descripción actual: "${tarea.descripcion}". Nueva descripción: `, (nuevaDescripcion) => {
        if (nuevaDescripcion !== "") {
            tarea.descripcion = nuevaDescripcion.trim() === "" ? "" : nuevaDescripcion;
        }
        rl_1.rl.question(`2. Estado actual: ${tarea.estado}. Nuevo estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): `, (nuevoEstado) => {
            const letra = nuevoEstado.trim().toUpperCase();
            if (letra === "P")
                tarea.estado = "Pendiente";
            else if (letra === "E")
                tarea.estado = "En Curso";
            else if (letra === "T")
                tarea.estado = "Terminada";
            else if (letra === "C")
                tarea.estado = "Cancelada";
            else if (letra !== "")
                console.log("Letra no reconocida, se mantiene el estado actual.");
            rl_1.rl.question(`3. Dificultad actual: ${tarea.dificultad}. Nueva dificultad ([1] Fácil / [2] Medio / [3] Difícil): `, (nuevaDificultad) => {
                if (nuevaDificultad === "1")
                    tarea.dificultad = "Facil";
                else if (nuevaDificultad === "2")
                    tarea.dificultad = "Medio";
                else if (nuevaDificultad === "3")
                    tarea.dificultad = "Dificil";
                else if (nuevaDificultad.trim() !== "")
                    console.log("Opción no reconocida, se mantiene la dificultad actual.");
                rl_1.rl.question(`4. Vencimiento actual: ${tarea.vencimiento ? new Date(tarea.vencimiento).toLocaleDateString() : "Sin datos"}. Nuevo vencimiento (DD/MM/AAAA): `, (nuevoVencimiento) => {
                    if (nuevoVencimiento.trim() === " ") {
                        tarea.vencimiento = null;
                    }
                    else if (nuevoVencimiento.trim() !== "") {
                        const fecha = (0, fechas_1.parsearFecha)(nuevoVencimiento);
                        if (fecha !== null) {
                            tarea.vencimiento = fecha;
                        }
                        else {
                            console.log("Fecha inválida, se mantiene el vencimiento actual.");
                        }
                    }
                    tarea.ultimaEdicion = new Date();
                    console.log("\n¡Datos guardados!\n");
                    volver();
                });
            });
        });
    });
}
