"use strict";

// Devuelve una lista NUEVA con la tarea al final.
const agregar = (lista, tarea) => {
    return Object.freeze([...lista, tarea]);
};

// Devuelve una lista NUEVA donde "original" fue cambiada por "nueva".
const reemplazar = (lista, original, nueva) => {
    return Object.freeze(
        lista.map((tarea) => {
            if (tarea === original) {
                return nueva;
            }
            return tarea;
        })
    );
};

// El numero va de 1 a N, como lo ve el usuario.
const obtener = (lista, numero) => lista[numero - 1];

// ----- Criterios: funciones que DEVUELVEN funciones (para usar con filter) -----
const porEstado = (estado) => (tarea) => tarea.estado === estado;

const porTitulo = (texto) => (tarea) => {
    return tarea.titulo.toLowerCase().includes(texto.toLowerCase());
};

const filtrar = (lista, criterio) => {
    return Object.freeze(lista.filter(criterio));
};

// ----- Comparadores (para sort) -----
const comparar = (a, b) => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
};

const RANGO_DIFICULTAD = Object.freeze({ Facil: 1, Medio: 2, Dificil: 3 });

const ordenPorTitulo = (a, b) => {
    return comparar(a.titulo.toLowerCase(), b.titulo.toLowerCase());
};

const ordenPorCreacion = (a, b) => comparar(a.creacion, b.creacion);

const ordenPorDificultad = (a, b) => {
    return comparar(RANGO_DIFICULTAD[a.dificultad], RANGO_DIFICULTAD[b.dificultad]);
};

// Las tareas sin vencimiento (null) van al final.
const ordenPorVencimiento = (a, b) => {
    if (a.vencimiento === null && b.vencimiento === null) {
        return 0;
    }
    if (a.vencimiento === null) {
        return 1;
    }
    if (b.vencimiento === null) {
        return -1;
    }
    return comparar(a.vencimiento, b.vencimiento);
};

// sort MUTA el array, por eso se ordena una COPIA ([...lista]).
const ordenar = (lista, comparador) => {
    return Object.freeze([...lista].sort(comparador));
};

module.exports = {
    agregar,
    reemplazar,
    obtener,
    porEstado,
    porTitulo,
    filtrar,
    ordenar,
    ordenPorTitulo,
    ordenPorCreacion,
    ordenPorDificultad,
    ordenPorVencimiento
};