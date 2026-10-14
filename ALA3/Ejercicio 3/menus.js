const { FormularioTarea } = require("./agregarTarea");
const { EditorTarea } = require("./editar");

function MenuTareas(rl, lista) {
  this.rl = rl;
  this.lista = lista;
  this.formulario = new FormularioTarea(rl, lista, () => this.menuPrincipal());
  this.editor = new EditorTarea(rl);
}

MenuTareas.prototype.menuPrincipal = function () {
  console.log("=== MENU PRINCIPAL ===");
  console.log("1. Ver mis tareas");
  console.log("2. Buscar una tarea");
  console.log("3. Agregar una tarea");
  console.log("0. Salir");
  console.log("========================");

  this.rl.question("\nElegi una opcion: ", (opcion) => {
    switch (opcion) {
      case "1":
        this.menuVerTareas();
        break;
      case "2":
        this.buscarTarea();
        break;
      case "3":
        this.formulario.iniciar();
        break;
      case "0":
        console.log("Saliendo...");
        this.rl.close();
        break;
      default:
        console.log("Opcion no valida. Por favor, elija una opcion valida.");
        this.menuPrincipal();
    }
  });
};

MenuTareas.prototype.menuVerTareas = function () {
  console.log("\n=== TIPOS DE ESTADOS ===");
  console.log("1. Todas");
  console.log("2. Pendientes");
  console.log("3. En curso");
  console.log("4. Terminadas");
  console.log("5. Canceladas");
  console.log("0. Volver al menu principal");
  console.log("========================");

  this.rl.question("\nIngrese que tipo de estado desea ver: ", (ot) => {
    let tareasFiltradas;

    switch (ot) {
      case "0":
        this.menuPrincipal();
        return;
      case "1":
        tareasFiltradas = this.lista;
        break;
      case "2":
        tareasFiltradas = this.lista.filtrarPorEstado("Pendiente");
        break;
      case "3":
        tareasFiltradas = this.lista.filtrarPorEstado("En Curso");
        break;
      case "4":
        tareasFiltradas = this.lista.filtrarPorEstado("Terminada");
        break;
      case "5":
        tareasFiltradas = this.lista.filtrarPorEstado("Cancelada");
        break;
      default:
        console.log("Opcion no valida. Intente nuevamente.");
        this.menuVerTareas();
        return;
    }

    tareasFiltradas.recorrer();
    this.seleccionarTarea(tareasFiltradas, () => this.menuVerTareas());
  });
};

MenuTareas.prototype.buscarTarea = function () {
  this.rl.question("Introduce el titulo de una Tarea para buscarla: ", (titulo) => {
    const resultados = this.lista.buscarPorTitulo(titulo);

    if (resultados.estaVacia()) {
      console.log("No hay tareas relacionadas con la busqueda.");
      this.menuPrincipal();
    } else {
      resultados.recorrer();
      this.seleccionarTarea(resultados, () => this.menuPrincipal());
    }
  });
};

// Reemplaza a seleccionarTarea y seleccionarTareaDesdeBusqueda:
// "volver" indica a qué menú regresar.
MenuTareas.prototype.seleccionarTarea = function (lista, volver) {
  if (lista.estaVacia()) {
    volver();
    return;
  }

  this.rl.question("Introduce el numero para verla o 0 para volver: ", (num) => {
    const numero = parseInt(num);

    if (isNaN(numero) || numero < 0 || numero > lista.cantidad()) {
      console.log("Numero invalido.");
      this.seleccionarTarea(lista, volver);
      return;
    }

    if (numero === 0) {
      volver();
      return;
    }

    const tareaSeleccionada = lista.obtener(numero);

    if (!tareaSeleccionada) {
      console.log("Numero invalido.");
      this.seleccionarTarea(lista, volver);
      return;
    }

    tareaSeleccionada.mostrarDetalle();

    this.rl.question("Si deseas editarla, presiona E, o presiona 0 para volver: ", (opcionEditar) => {
      if (opcionEditar.toLowerCase() === "e") {
        this.editor.editar(tareaSeleccionada, volver);
      } else {
        volver();
      }
    });
  });
};

module.exports = { MenuTareas };