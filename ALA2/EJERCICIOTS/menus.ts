import { rl } from "./rl";
import { listaDeTareas } from "./tareas";
import type { Tarea } from "./tareas";
import { recorrerTareas, mostrarDetalle } from "./mostrar";
import { pedirTitulo } from "./agregarTarea";
import { editarTarea } from "./editar";

function menuPrincipal(): void {
    console.log("=== MENU PRINCIPAL ===");
    console.log("1. Ver mis tareas");
    console.log("2. Buscar una tarea");
    console.log("3. Agregar una tarea");
    console.log("0. Salir");
    console.log("========================");

    rl.question("\nElegi una opcion: ", (opcion) => {
        switch (opcion) {
            case "1":
                menuVerTareas();
                break;
            case "2":
                buscarTarea();
                break;
            case "3":
                pedirTitulo();
                break;
            case "0":
                console.log("Saliendo...");
                rl.close();
                break;
            default:
                console.log("Opcion no valida. Por favor, elija una opcion valida.");
                menuPrincipal();
        }
    });
}

function menuVerTareas(): void {
    console.log("\n=== TIPOS DE ESTADOS ===");
    console.log("1. Todas");
    console.log("2. Pendientes");
    console.log("3. En curso");
    console.log("4. Terminadas");
    console.log("5. Canceladas");
    console.log("0. Volver al menu principal");
    console.log("========================");

    rl.question("\nIngrese que tipo de estado desea ver: ", (ot) => {
        let tareasFiltradas: Tarea[];
        switch (ot) {
            case "0":
                menuPrincipal();
                return;
            case "1":
                tareasFiltradas = listaDeTareas;
                break;
            case "2":
                tareasFiltradas = listaDeTareas.filter(t => t.estado === "Pendiente");
                break;
            case "3":
                tareasFiltradas = listaDeTareas.filter(t => t.estado === "En Curso");
                break;
            case "4":
                tareasFiltradas = listaDeTareas.filter(t => t.estado === "Terminada");
                break;
            case "5":
                tareasFiltradas = listaDeTareas.filter(t => t.estado === "Cancelada");
                break;
            default:
                console.log("Opcion no valida. Intente nuevamente.");
                menuVerTareas();
                return;
        }

        recorrerTareas(tareasFiltradas);
        seleccionarTarea(tareasFiltradas);
    });
}

function seleccionarTarea(lista: Tarea[]): void {
    if (lista.length === 0) {
        menuVerTareas();
        return;
    }
    rl.question("Introduce el numero para verla o 0 para volver: ", (num) => {
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

        mostrarDetalle(tareaSeleccionada);

        rl.question("Si deseas editarla, presiona E, o presiona 0 para volver: ", (opcionEditar) => {
            if (opcionEditar.toLowerCase() === "e") {
                editarTarea(tareaSeleccionada, menuVerTareas);
            } else {
                menuVerTareas();
            }
        });
    });
}

function buscarTarea(): void {
    rl.question("Introduce el titulo de una Tarea para buscarla: ", (titulo) => {
        const resultados = listaDeTareas.filter(tarea =>
            tarea.titulo.toLowerCase().includes(titulo.toLowerCase())
        );

        if (resultados.length === 0) {
            console.log("No hay tareas relacionadas con la busqueda.");
            menuPrincipal();
        } else {
            recorrerTareas(resultados);
            seleccionarTareaDesdeBusqueda(resultados);
        }
    });
}

function seleccionarTareaDesdeBusqueda(lista: Tarea[]): void {
    rl.question("Introduce el numero para verla o 0 para volver: ", (num) => {
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

        mostrarDetalle(tareaSeleccionada);

        rl.question("Si deseas editarla, presiona E, o presiona 0 para volver: ", (opcionEditar) => {
            if (opcionEditar.toLowerCase() === "e") {
                editarTarea(tareaSeleccionada, menuPrincipal);
            } else {
                menuPrincipal();
            }
        });
    });
}

export { menuPrincipal };
