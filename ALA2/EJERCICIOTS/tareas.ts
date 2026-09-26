// tareas.ts
// Explicacion guiada made by claude-sama
// --- Tipos ---
// En JS, "estado" podía ser cualquier string. Acá le decimos a TS
// que SOLO puede valer una de estas 4 opciones exactas.
type Estado = "Pendiente" | "En Curso" | "Terminada" | "Cancelada";

// Lo mismo para dificultad.
type Dificultad = "Facil" | "Medio" | "Dificil";

// La interface describe la FORMA de una tarea: qué campos tiene
// y de qué tipo es cada uno. Es la versión tipada del objeto
// que devolvía tu crearTarea en JS.
interface Tarea {
    titulo: string;
    descripcion: string;
    estado: Estado;
    dificultad: Dificultad;
    creacion: Date;
    ultimaEdicion: Date;
    vencimiento: Date | null; // puede ser una fecha, o no tener ninguna
}

// --- Datos ---
// Le decimos explícitamente que es un array de Tarea.
const listaDeTareas: Tarea[] = [];

// --- Funciones ---
// Cada parámetro lleva su tipo, y ": Tarea" al final dice qué devuelve.
function crearTarea(
    titulo: string,
    descripcion: string = "",
    estado: Estado = "Pendiente",
    dificultad: Dificultad = "Facil",
    vencimiento: Date | null = null
): Tarea {
    return {
        titulo,
        descripcion,
        estado,
        dificultad,
        creacion: new Date(),
        ultimaEdicion: new Date(),
        vencimiento
    };
}

function agregarTarea(lista: Tarea[], tarea: Tarea): void {
    // ": void" significa que la función no devuelve nada,
    // igual que en tu versión de JS.
    lista.push(tarea);
}

// export en vez de module.exports: exportamos también los tipos,
// para que otros archivos puedan usarlos al tipar sus propias funciones.
export type { Tarea, Estado, Dificultad };
export { listaDeTareas, crearTarea, agregarTarea };