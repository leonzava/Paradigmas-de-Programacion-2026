const { Tarea } = require("./tareas");
const { parsearFecha } = require("./fechas");

function FormularioTarea(rl, lista, volver) {
  this.rl = rl;
  this.lista = lista;
  this.volver = volver;
  this.reiniciar();
}

FormularioTarea.prototype.reiniciar = function () {
  this.titulo = "";
  this.descripcion = "";
  this.estado = "Pendiente";
  this.dificultad = "Facil";
  this.vencimiento = null;
};

FormularioTarea.prototype.iniciar = function () {
  this.reiniciar();
  this.pedirTitulo();
};

FormularioTarea.prototype.pedirTitulo = function () {
  this.rl.question("Ingrese el título de la nueva tarea: ", (titulo) => {
    if (titulo.trim() === "") {
      console.log("El título no puede estar vacío.");
      this.pedirTitulo();
      return;
    }
    this.titulo = titulo;
    this.pedirDescripcion();
  });
};

FormularioTarea.prototype.pedirDescripcion = function () {
  this.rl.question("Ingrese la descipcion de la nueva tarea o presione ENTER para dejarla vacia : ", (descripcion) => {
    if (descripcion.trim() === "") {
      console.log("Usted subio una descripcion vacia!.\n");
    } else {
      console.log("Descripcion agregada!.\n");
    }
    this.descripcion = descripcion;
    this.pedirEstado();
  });
};

FormularioTarea.prototype.pedirEstado = function () {
  console.log("ENTER = [P] Pendiente");
  console.log("Estados: [P] Pendiente , [E] En curso , [T] Terminada, [C] Cancelada \n");
  this.rl.question("Elija el estado de su tarea: ", (opcionEstado) => {
    const letra = opcionEstado.trim().toUpperCase();

    if (letra === "E") {
      this.estado = "En Curso";
      console.log("La tarea se cargó con estado: En Curso!\n");
    } else if (letra === "T") {
      this.estado = "Terminada";
      console.log("La tarea se cargó con estado: Terminada!\n");
    } else if (letra === "C") {
      this.estado = "Cancelada";
      console.log("La tarea se cargó con estado: Cancelada!\n");
    } else if (letra === "" || letra === "P") {
      this.estado = "Pendiente";
      console.log("La tarea se cargó con estado: Pendiente!\n");
    } else {
      console.log("❌ Letra no reconocida, por favor vuelva a agregar el estado de la tarea!\n");
      this.pedirEstado();
      return;
    }

    this.pedirDificultad();
  });
};

FormularioTarea.prototype.pedirDificultad = function () {
  console.log("Dificultades: [1] Facil , [2] Medio , [3] Dificil");
  console.log("ENTER = [1] Facil");
  this.rl.question("Elija la dificultad de su tarea: ", (opcionDificultad) => {
    const numerodif = opcionDificultad.trim();

    if (numerodif === "2") {
      this.dificultad = "Medio";
      console.log("¡Che, agregaste la dificultad \"Medio\" a tu tarea!\n");
    } else if (numerodif === "3") {
      this.dificultad = "Dificil";
      console.log("¡Che, agregaste la dificultad \"Dificil\" a tu tarea!\n");
    } else if (numerodif === "" || numerodif === "1") {
      this.dificultad = "Facil";
      console.log("¡Che, agregaste la dificultad \"Facil\" a tu tarea!\n");
    } else {
      console.log("❌ Valor invalido! Por favor ingrese una dificultad válida.\n");
      this.pedirDificultad();
      return;
    }

    this.pedirVencimiento();
  });
};

FormularioTarea.prototype.pedirVencimiento = function () {
  this.rl.question("Ingrese fecha de vencimiento (DD/MM/AAAA) o Enter para omitir: ", (fechaVencimiento) => {
    if (fechaVencimiento.trim() !== "") {
      const fecha = parsearFecha(fechaVencimiento);
      if (fecha !== null) {
        this.vencimiento = fecha;
      } else {
        console.log("Fecha inválida, se guarda sin vencimiento.");
      }
    }

    this.guardar();
  });
};

FormularioTarea.prototype.guardar = function () {
  const nuevaTarea = new Tarea(
    this.titulo,
    this.descripcion,
    this.estado,
    this.dificultad,
    this.vencimiento
  );
  this.lista.agregar(nuevaTarea);

  console.log("====================================");
  console.log("✅ Tarea agregada con éxito.");
  console.log("====================================\n");

  this.volver();
};

module.exports = { FormularioTarea };