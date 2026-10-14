const { parsearFecha } = require("./fechas");

function EditorTarea(rl) {
  this.rl = rl;
  this.tarea = null;
  this.volver = null;
}

EditorTarea.prototype.editar = function (tarea, volver) {
  this.tarea = tarea;
  this.volver = volver;

  console.log(`\nEstás editando la tarea "${tarea.titulo}".`);
  console.log("Si deseas mantener el valor de un atributo, déjalo en blanco.");
  console.log("Si deseas dejar en blanco un atributo, escribe un espacio.\n");

  this.pedirDescripcion();
};

EditorTarea.prototype.pedirDescripcion = function () {
  this.rl.question(`1. Descripción actual: "${this.tarea.descripcion}". Nueva descripción: `, (nuevaDescripcion) => {
    if (nuevaDescripcion !== "") {
      if (nuevaDescripcion.trim() === "") {
        this.tarea.descripcion = "";
      } else {
        this.tarea.descripcion = nuevaDescripcion;
      }
    }
    this.pedirEstado();
  });
};

EditorTarea.prototype.pedirEstado = function () {
  this.rl.question(`2. Estado actual: ${this.tarea.estado}. Nuevo estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): `, (nuevoEstado) => {
    const letra = nuevoEstado.trim().toUpperCase();

    if (letra === "P") {
      this.tarea.estado = "Pendiente";
    } else if (letra === "E") {
      this.tarea.estado = "En Curso";
    } else if (letra === "T") {
      this.tarea.estado = "Terminada";
    } else if (letra === "C") {
      this.tarea.estado = "Cancelada";
    } else if (letra !== "") {
      console.log("Letra no reconocida, se mantiene el estado actual.");
    }

    this.pedirDificultad();
  });
};

EditorTarea.prototype.pedirDificultad = function () {
  this.rl.question(`3. Dificultad actual: ${this.tarea.dificultad}. Nueva dificultad ([1] Fácil / [2] Medio / [3] Difícil): `, (nuevaDificultad) => {
    if (nuevaDificultad === "1") {
      this.tarea.dificultad = "Facil";
    } else if (nuevaDificultad === "2") {
      this.tarea.dificultad = "Medio";
    } else if (nuevaDificultad === "3") {
      this.tarea.dificultad = "Dificil";
    } else if (nuevaDificultad.trim() !== "") {
      console.log("Opción no reconocida, se mantiene la dificultad actual.");
    }

    this.pedirVencimiento();
  });
};

EditorTarea.prototype.pedirVencimiento = function () {
  this.rl.question(`4. Vencimiento actual: ${this.tarea.textoVencimiento()}. Nuevo vencimiento (DD/MM/AAAA): `, (nuevoVencimiento) => {
    if (nuevoVencimiento === " ") {
      this.tarea.vencimiento = null;
    } else if (nuevoVencimiento.trim() !== "") {
      const fecha = parsearFecha(nuevoVencimiento);
      if (fecha !== null) {
        this.tarea.vencimiento = fecha;
      } else {
        console.log("Fecha inválida, se mantiene el vencimiento actual.");
      }
    }

    this.tarea.marcarEdicion();
    console.log("\n¡Datos guardados!\n");
    this.volver();
  });
};

module.exports = { EditorTarea };