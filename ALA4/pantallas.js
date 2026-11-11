"use strict";

const { ESTADOS, DIFICULTADES } = require("./tarea");
const { interpretarEstado, interpretarDificultad, esTituloValido, esDescripcionValida } = require("./entradas");
const { parsearFecha } = require("./fechas");
const { textoVencimiento } = require("./formato");
const { filtrar, porEstado } = require("./lista");

// Congela cada paso (para que nadie lo modifique).
const paso = (datos) => Object.freeze(datos);

// ---------- Conversores del ALTA ----------
// Cada uno devuelve un objeto con el dato (ej: { titulo: "..." }) o null si no es válido.

const convertirTitulo = (texto) => {
    if (esTituloValido(texto)) {
        return { titulo: texto };
    }
    return null;
};

const convertirDescripcion = (texto) => {
    if (esDescripcionValida(texto)) {
        return { descripcion: texto };
    }
    return null;
};

const convertirEstadoAlta = (texto) => {
    if (texto.trim() === "") {
        return { estado: ESTADOS.PENDIENTE };
    }
    const estado = interpretarEstado(texto);
    if (estado === null) {
        return null;
    }
    return { estado: estado };
};

const convertirDificultadAlta = (texto) => {
    if (texto.trim() === "") {
        return { dificultad: DIFICULTADES.FACIL };
    }
    const dificultad = interpretarDificultad(texto);
    if (dificultad === null) {
        return null;
    }
    return { dificultad: dificultad };
};

const convertirVencimientoAlta = (texto) => {
    if (texto.trim() === "") {
        return { vencimiento: null };
    }
    const fecha = parsearFecha(texto);
    if (fecha === null) {
        return null;
    }
    return { vencimiento: fecha };
};

// ---------- Lista de preguntas del ALTA (son DATOS) ----------
// repetir: true  -> si la respuesta es inválida, vuelve a preguntar lo mismo.
// repetir: false -> si es inválida, avisa y sigue con la siguiente pregunta.
const PASOS_ALTA = Object.freeze([
    paso({
        pregunta: "Ingrese el título de la nueva tarea: ",
        convertir: convertirTitulo,
        error: "El título no puede estar vacío ni superar los 100 caracteres.",
        repetir: true
    }),
    paso({
        pregunta: "Ingrese la descripcion de la nueva tarea o presione ENTER para dejarla vacia: ",
        convertir: convertirDescripcion,
        error: "La descripción no puede superar los 500 caracteres.",
        repetir: true
    }),
    paso({
        pregunta: "Estados: [P] Pendiente , [E] En curso , [T] Terminada, [C] Cancelada\nENTER = [P] Pendiente\nElija el estado de su tarea: ",
        convertir: convertirEstadoAlta,
        error: "❌ Letra no reconocida, por favor vuelva a agregar el estado de la tarea!",
        repetir: true
    }),
    paso({
        pregunta: "Dificultades: [1] Facil , [2] Medio , [3] Dificil\nENTER = [1] Facil\nElija la dificultad de su tarea: ",
        convertir: convertirDificultadAlta,
        error: "❌ Valor invalido! Por favor ingrese una dificultad válida.",
        repetir: true
    }),
    paso({
        pregunta: "Ingrese fecha de vencimiento (DD/MM/AAAA) o Enter para omitir: ",
        convertir: convertirVencimientoAlta,
        error: "Fecha inválida, se guarda sin vencimiento.",
        repetir: false
    })
]);

// ---------- Conversores de la EDICIÓN ----------
// {} significa "no cambiar nada"; null significa "respuesta inválida".

const cambioDescripcion = (texto) => {
    if (texto === "") {
        return {};
    }
    if (texto.trim() === "") {
        return { descripcion: "" };
    }
    if (!esDescripcionValida(texto)) {
        return null;
    }
    return { descripcion: texto };
};

const cambioEstado = (texto) => {
    if (texto.trim() === "") {
        return {};
    }
    const estado = interpretarEstado(texto);
    if (estado === null) {
        return null;
    }
    return { estado: estado };
};

const cambioDificultad = (texto) => {
    if (texto.trim() === "") {
        return {};
    }
    const dificultad = interpretarDificultad(texto);
    if (dificultad === null) {
        return null;
    }
    return { dificultad: dificultad };
};

const cambioVencimiento = (texto) => {
    if (texto === " ") {
        return { vencimiento: null };
    }
    if (texto.trim() === "") {
        return {};
    }
    const fecha = parsearFecha(texto);
    if (fecha === null) {
        return null;
    }
    return { vencimiento: fecha };
};

// Las preguntas de la edición dependen de la tarea (muestran el valor actual).
const pasosEdicion = (tarea) => {
    return Object.freeze([
        paso({
            pregunta: `1. Descripción actual: "${tarea.descripcion}". Nueva descripción: `,
            convertir: cambioDescripcion,
            error: "Descripción inválida (máximo 500 caracteres), se mantiene la actual.",
            repetir: false
        }),
        paso({
            pregunta: `2. Estado actual: ${tarea.estado}. Nuevo estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): `,
            convertir: cambioEstado,
            error: "Letra no reconocida, se mantiene el estado actual.",
            repetir: false
        }),
        paso({
            pregunta: `3. Dificultad actual: ${tarea.dificultad}. Nueva dificultad ([1] Fácil / [2] Medio / [3] Difícil): `,
            convertir: cambioDificultad,
            error: "Opción no reconocida, se mantiene la dificultad actual.",
            repetir: false
        }),
        paso({
            pregunta: `4. Vencimiento actual: ${textoVencimiento(tarea.vencimiento)}. Nuevo vencimiento (DD/MM/AAAA): `,
            convertir: cambioVencimiento,
            error: "Fecha inválida, se mantiene el vencimiento actual.",
            repetir: false
        })
    ]);
};

// ---------- Otras conversiones del menú ----------
const ESTADO_POR_OPCION = Object.freeze({
    "2": "Pendiente",
    "3": "En Curso",
    "4": "Terminada",
    "5": "Cancelada"
});

// Devuelve la lista a mostrar según la opción elegida, o null si la opción no existe.
const vistaPorOpcion = (lista, opcion) => {
    if (opcion === "1") {
        return lista;
    }
    const estado = ESTADO_POR_OPCION[opcion];
    if (estado === undefined) {
        return null;
    }
    return filtrar(lista, porEstado(estado));
};

// Devuelve un número entre 0 y "maximo", o null si no es válido.
const interpretarNumero = (texto, maximo) => {
    const numero = parseInt(texto);
    if (isNaN(numero) || numero < 0 || numero > maximo) {
        return null;
    }
    return numero;
};

module.exports = { PASOS_ALTA, pasosEdicion, vistaPorOpcion, interpretarNumero };