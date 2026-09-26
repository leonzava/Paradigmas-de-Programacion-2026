"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuPrincipal = menuPrincipal;
const rl_1 = require("./rl");
const tareas_1 = require("./tareas");
const mostrar_1 = require("./mostrar");
const agregarTarea_1 = require("./agregarTarea");
const editar_1 = require("./editar");
function menuPrincipal() {
    console.log("=== MENU PRINCIPAL ===");
    console.log("1. Ver mis tareas");
    console.log("2. Buscar una tarea");
    console.log("3. Agregar una tarea");
    console.log("0. Salir");
    console.log("========================");
    rl_1.rl.question("\nElegi una opcion: ", (opcion) => {
        switch (opcion) {
            case "1":
                menuVerTareas();
                break;
            case "2":
                buscarTarea();
                break;
            case "3":
                (0, agregarTarea_1.pedirTitulo)();
                break;
            case "0":
                console.log("Saliendo...");
                rl_1.rl.close();
                break;
            default:
                console.log("Opcion no valida. Por favor, elija una opcion valida.");
                menuPrincipal();
        }
    });
}
function menuVerTareas() {
    console.log("\n=== TIPOS DE ESTADOS ===");
    console.log("1. Todas");
    console.log("2. Pendientes");
    console.log("3. En curso");
    console.log("4. Terminadas");
    console.log("5. Canceladas");
    console.log("0. Volver al menu principal");
    console.log("========================");
    rl_1.rl.question("\nIngrese que tipo de estado desea ver: ", (ot) => {
        let tareasFiltradas;
        switch (ot) {
            case "0":
                menuPrincipal();
                return;
            case "1":
                tareasFiltradas = tareas_1.listaDeTareas;
                break;
            case "2":
                tareasFiltradas = tareas_1.listaDeTareas.filter(t => t.estado === "Pendiente");
                break;
            case "3":
                tareasFiltradas = tareas_1.listaDeTareas.filter(t => t.estado === "En Curso");
                break;
            case "4":
                tareasFiltradas = tareas_1.listaDeTareas.filter(t => t.estado === "Terminada");
                break;
            case "5":
                tareasFiltradas = tareas_1.listaDeTareas.filter(t => t.estado === "Cancelada");
                break;
            default:
                console.log("Opcion no valida. Intente nuevamente.");
                menuVerTareas();
                return;
        }
        (0, mostrar_1.recorrerTareas)(tareasFiltradas);
        seleccionarTarea(tareasFiltradas);
    });
}
function seleccionarTarea(lista) {
    if (lista.length === 0) {
        menuVerTareas();
        return;
    }
    rl_1.rl.question("Introduce el numero para verla o 0 para volver: ", (num) => {
        const numero = parseInt(num);
        if (isNaN(numero) || numero < 0 || numero > lista.length) {
            console.log("Numero invalido.");
            seleccionarTarea(lista);
            return;
        }
        if (numero === 0) {
            menuVerTareas();
            return;
        }
        const tareaSeleccionada = lista[numero - 1];
        if (!tareaSeleccionada) {
            console.log("Numero invalido.");
            seleccionarTarea(lista);
            return;
        }
        (0, mostrar_1.mostrarDetalle)(tareaSeleccionada);
        rl_1.rl.question("Si deseas editarla, presiona E, o presiona 0 para volver: ", (opcionEditar) => {
            if (opcionEditar.toLowerCase() === "e") {
                (0, editar_1.editarTarea)(tareaSeleccionada, menuVerTareas);
            }
            else {
                menuVerTareas();
            }
        });
    });
}
function buscarTarea() {
    rl_1.rl.question("Introduce el titulo de una Tarea para buscarla: ", (titulo) => {
        const resultados = tareas_1.listaDeTareas.filter(tarea => tarea.titulo.toLowerCase().includes(titulo.toLowerCase()));
        if (resultados.length === 0) {
            console.log("No hay tareas relacionadas con la busqueda.");
            menuPrincipal();
        }
        else {
            (0, mostrar_1.recorrerTareas)(resultados);
            seleccionarTareaDesdeBusqueda(resultados);
        }
    });
}
function seleccionarTareaDesdeBusqueda(lista) {
    rl_1.rl.question("Introduce el numero para verla o 0 para volver: ", (num) => {
        const numero = parseInt(num);
        if (isNaN(numero) || numero < 0 || numero > lista.length) {
            console.log("Numero invalido.");
            seleccionarTareaDesdeBusqueda(lista);
            return;
        }
        if (numero === 0) {
            menuPrincipal();
            return;
        }
        const tareaSeleccionada = lista[numero - 1];
        if (!tareaSeleccionada) {
            console.log("Numero invalido.");
            seleccionarTareaDesdeBusqueda(lista);
            return;
        }
        (0, mostrar_1.mostrarDetalle)(tareaSeleccionada);
        rl_1.rl.question("Si deseas editarla, presiona E, o presiona 0 para volver: ", (opcionEditar) => {
            if (opcionEditar.toLowerCase() === "e") {
                (0, editar_1.editarTarea)(tareaSeleccionada, menuPrincipal);
            }
            else {
                menuPrincipal();
            }
        });
    });
}
