// ---------- Tarea ----------
function Tarea(titulo, descripcion, estado, dificultad, vencimiento) {
  this.titulo = titulo;
  this.descripcion = descripcion;
  this.estado = estado;           // "Pendiente" | "En Curso" | "Terminada" | "Cancelada"
  this.dificultad = dificultad;   // "Facil" | "Medio" | "Dificil"
  this.vencimiento = vencimiento; // Date o null
  this.creacion = new Date();
  this.ultimaEdicion = new Date();
}

Tarea.prototype.coincideConTitulo = function (texto) {
  return this.titulo.toLowerCase().includes(texto.toLowerCase());
};

Tarea.prototype.marcarEdicion = function () {
  this.ultimaEdicion = new Date();
};

Tarea.prototype.textoVencimiento = function () {
  if (this.vencimiento === null) {
    return "Sin datos";
  }
  return new Date(this.vencimiento).toLocaleDateString();
};

Tarea.prototype.iconoDificultad = function () {
  switch (this.dificultad) {
    case "Facil":
      return "***";
    case "Medio":
      return "**-";
    case "Dificil":
      return "*--";
    default:
      return "*--";
  }
};

Tarea.prototype.mostrarDetalle = function () {
  let descripcion = this.descripcion;
  if (descripcion === "") {
    descripcion = "Sin datos";
  }

  console.log("\n--- Detalle de la tarea ---");
  console.log(`Titulo:         ${this.titulo}`);
  console.log(`Descripcion:    ${descripcion}`);
  console.log(`Estado:         ${this.estado}`);
  console.log(`Dificultad:     ${this.iconoDificultad()} (${this.dificultad})`);
  console.log(`Vencimiento:    ${this.textoVencimiento()}`);
  console.log(`Creacion:       ${this.creacion.toLocaleDateString()}`);
  console.log(`Ultima edicion: ${this.ultimaEdicion.toLocaleDateString()}`);
  console.log("----------------------------\n");
};

// ---------- ListaTareas ----------
function ListaTareas(tareas) {
  this.tareas = [];
  if (tareas !== undefined) {
    this.tareas = tareas;
  }
}

ListaTareas.prototype.agregar = function (tarea) {
  this.tareas.push(tarea);
};

ListaTareas.prototype.cantidad = function () {
  return this.tareas.length;
};

ListaTareas.prototype.estaVacia = function () {
  return this.tareas.length === 0;
};

// numero va de 1 a cantidad (como lo ve el usuario)
ListaTareas.prototype.obtener = function (numero) {
  return this.tareas[numero - 1];
};

ListaTareas.prototype.filtrarPorEstado = function (estado) {
  return new ListaTareas(this.tareas.filter((t) => t.estado === estado));
};

ListaTareas.prototype.buscarPorTitulo = function (texto) {
  return new ListaTareas(this.tareas.filter((t) => t.coincideConTitulo(texto)));
};

ListaTareas.prototype.recorrer = function () {
  if (this.estaVacia()) {
    console.log("No hay tareas para mostrar.");
    return;
  }

  this.tareas.forEach((tarea, index) => {
    console.log(`[${index + 1}] ${tarea.titulo}`);
  });
};

module.exports = { Tarea, ListaTareas };