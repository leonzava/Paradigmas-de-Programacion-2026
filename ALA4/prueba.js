"use strict";

const { crearTarea, actualizarTarea } = require("./tarea");
const L = require("./lista");

const ahora = new Date();
const a = crearTarea({ titulo: "Zeta", dificultad: "Dificil" }, ahora);
const b = crearTarea({ titulo: "alfa", estado: "En Curso" }, ahora);

const lista = L.agregar(L.agregar([], a), b);

console.log(L.filtrar(lista, L.porEstado("En Curso")).length);
console.log(L.ordenar(lista, L.ordenPorTitulo).map((t) => t.titulo));
console.log(L.ordenar(lista, L.ordenPorDificultad).map((t) => t.titulo));
console.log(lista.map((t) => t.titulo));

const a2 = actualizarTarea(a, { estado: "Terminada" }, ahora);
const lista2 = L.reemplazar(lista, a, a2);
console.log(a.estado, a2.estado);
console.log(lista.map((t) => t.estado));
console.log(lista2.map((t) => t.estado));