"use strict";

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const preguntar = (texto, alResponder) => {
    rl.question(texto, alResponder);
};

const imprimir = (texto) => {
    console.log(texto);
};

const ahora = () => new Date();

const cerrar = () => {
    rl.close();
};

module.exports = { preguntar, imprimir, ahora, cerrar };