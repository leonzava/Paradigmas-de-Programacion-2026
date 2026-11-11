"use strict";

const io = require("./io");
const { crearTarea, actualizarTarea } = require("./tarea");
const { agregar, reemplazar, obtener, porTitulo, filtrar } = require("./lista");
const { detalleTarea, listaNumerada } = require("./formato");
const { PASOS_ALTA, pasosEdicion, vistaPorOpcion, interpretarNumero } = require("./pantallas");

const TEXTO_MENU_PRINCIPAL = [
    "=== MENU PRINCIPAL ===",
    "1. Ver mis tareas",
    "2. Buscar una tarea",
    "3. Agregar una tarea",
    "0. Salir",
    "========================"
].join("\n");

const TEXTO_MENU_ESTADOS = [
    "\n=== TIPOS DE ESTADOS ===",
    "1. Todas",
    "2. Pendientes",
    "3. En curso",
    "4. Terminadas",
    "5. Canceladas",
    "0. Volver al menu principal",
    "========================"
].join("\n");

// El encuestador: hace las preguntas de la lista UNA POR UNA (recursión en vez de while).
// "acumulado" es la ficha con las respuestas hasta ahora; al terminar se la entrega a "alTerminar".
const hacerPreguntas = (pasos, acumulado, alTerminar) => {
    if (pasos.length === 0) {
        alTerminar(acumulado);
        return;
    }

    const paso = pasos[0];
    const resto = pasos.slice(1);

    io.preguntar(paso.pregunta, (respuesta) => {
        const resultado = paso.convertir(respuesta);

        if (resultado === null) {
            io.imprimir(paso.error);
            if (paso.repetir) {
                hacerPreguntas(pasos, acumulado, alTerminar);
            } else {
                hacerPreguntas(resto, acumulado, alTerminar);
            }
            return;
        }

        hacerPreguntas(resto, { ...acumulado, ...resultado }, alTerminar);
    });
};

// "listaCompleta" es la lista entera; "listaVista" es lo que el usuario está viendo (puede ser filtrada).
// "volver" recibe la lista completa (por si cambió) y sigue con el menú anterior.
const seleccionarTarea = (listaCompleta, listaVista, volver) => {
    if (listaVista.length === 0) {
        volver(listaCompleta);
        return;
    }

    io.preguntar("Introduce el numero para verla o 0 para volver: ", (texto) => {
        const numero = interpretarNumero(texto, listaVista.length);

        if (numero === null) {
            io.imprimir("Numero invalido.");
            seleccionarTarea(listaCompleta, listaVista, volver);
            return;
        }

        if (numero === 0) {
            volver(listaCompleta);
            return;
        }

        const tarea = obtener(listaVista, numero);
        io.imprimir(detalleTarea(tarea));

        io.preguntar("Si deseas editarla, presiona E, o presiona 0 para volver: ", (opcion) => {
            if (opcion.toLowerCase() !== "e") {
                volver(listaCompleta);
                return;
            }

            io.imprimir(`\nEstás editando la tarea "${tarea.titulo}".`);
            io.imprimir("Si deseas mantener el valor de un atributo, déjalo en blanco.");
            io.imprimir("Si deseas dejar en blanco un atributo, escribe un espacio.\n");

            hacerPreguntas(pasosEdicion(tarea), {}, (cambios) => {
                const tareaNueva = actualizarTarea(tarea, cambios, io.ahora());
                io.imprimir("\n¡Datos guardados!\n");
                volver(reemplazar(listaCompleta, tarea, tareaNueva));
            });
        });
    });
};

const menuVerTareas = (lista) => {
    io.imprimir(TEXTO_MENU_ESTADOS);

    io.preguntar("\nIngrese que tipo de estado desea ver: ", (opcion) => {
        if (opcion === "0") {
            menuPrincipal(lista);
            return;
        }

        const vista = vistaPorOpcion(lista, opcion);

        if (vista === null) {
            io.imprimir("Opcion no valida. Intente nuevamente.");
            menuVerTareas(lista);
            return;
        }

        io.imprimir(listaNumerada(vista));
        seleccionarTarea(lista, vista, menuVerTareas);
    });
};

const buscarTarea = (lista) => {
    io.preguntar("Introduce el titulo de una Tarea para buscarla: ", (texto) => {
        const resultados = filtrar(lista, porTitulo(texto));

        if (resultados.length === 0) {
            io.imprimir("No hay tareas relacionadas con la busqueda.");
            menuPrincipal(lista);
            return;
        }

        io.imprimir(listaNumerada(resultados));
        seleccionarTarea(lista, resultados, menuPrincipal);
    });
};

const menuPrincipal = (lista) => {
    io.imprimir(TEXTO_MENU_PRINCIPAL);

    io.preguntar("\nElegi una opcion: ", (opcion) => {
        switch (opcion) {
            case "1":
                menuVerTareas(lista);
                break;
            case "2":
                buscarTarea(lista);
                break;
            case "3":
                hacerPreguntas(PASOS_ALTA, {}, (datos) => {
                    const tarea = crearTarea(datos, io.ahora());
                    io.imprimir("====================================\n✅ Tarea agregada con éxito.\n====================================\n");
                    menuPrincipal(agregar(lista, tarea));
                });
                break;
            case "0":
                io.imprimir("Saliendo...");
                io.cerrar();
                break;
            default:
                io.imprimir("Opcion no valida. Por favor, elija una opcion valida.");
                menuPrincipal(lista);
        }
    });
};

module.exports = { menuPrincipal };