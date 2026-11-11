"use strict";

const LETRA_A_ESTADO = Object.freeze({
    P: "Pendiente",
    E: "En Curso",
    T: "Terminada",
    C: "Cancelada"
});

const NUMERO_A_DIFICULTAD = Object.freeze({
    "1": "Facil",
    "2": "Medio",
    "3": "Dificil"
});

// Devuelve el estado oficial, o null si el texto no es válido.
const interpretarEstado = (texto) => {
    const letra = texto.trim().toUpperCase();
    const estado = LETRA_A_ESTADO[letra];
    if (estado === undefined) {
        return null;
    }
    return estado;
};

// Devuelve la dificultad oficial, o null si el texto no es válido.
const interpretarDificultad = (texto) => {
    const dificultad = NUMERO_A_DIFICULTAD[texto.trim()];
    if (dificultad === undefined) {
        return null;
    }
    return dificultad;
};

// Título: no vacío y hasta 100 caracteres.
const esTituloValido = (texto) => {
    if (texto.trim() === "") {
        return false;
    }
    if (texto.length > 100) {
        return false;
    }
    return true;
};

// Descripción: puede estar vacía, hasta 500 caracteres.
const esDescripcionValida = (texto) => texto.length <= 500;

module.exports = { interpretarEstado, interpretarDificultad, esTituloValido, esDescripcionValida };