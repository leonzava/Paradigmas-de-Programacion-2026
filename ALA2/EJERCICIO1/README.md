
# EJERCICIO 1 

* **1. Generalización simbólica: ¿Cuáles son las reglas escritas del lenguaje?**
* **2. Creencias de los profesionales: ¿Qué características particulares del lenguaje se cree que sean "mejores" que en otros lenguajes?**
# 1. Generalización simbólica — las reglas escritas del lenguaje

* **Tipado estático explícito:** toda variable, parámetro de función y valor de retorno puede (y en modo strict debe) declarar su tipo — `let cantidad: number`, `function crearTarea(titulo: string): Tarea`.
* **Tipos literales y de unión:** `type Estado = "Pendiente" | "En Curso" | "Terminada" | "Cancelada"` restringe una variable a un conjunto cerrado y finito de valores válidos — regla que no existe en JavaScript puro.
* **Interfaces para describir la forma de los datos:** `interface Tarea { titulo: string; ... }` define un contrato estructural que cualquier objeto debe cumplir para ser considerado de ese tipo.
* **Módulos con reglas de visibilidad:** `import`/`export` determinan explícitamente qué queda expuesto de un archivo y qué permanece privado a él.
* **Inferencia de tipos:** cuando no se anota explícitamente, el compilador infiere el tipo a partir del valor asignado (`const x = 5` $\rightarrow$ `x` es `number` senza decirlo).
* **Compilación con borrado de tipos (type erasure):** los tipos existen solo en tiempo de compilación; el `.js` generado no contiene ningún rastro de ellos — regla que separa tajantemente la fase de verificación de la fase de ejecución.
* **Control de flujo estructurado clásico:** secuencia, selección (`if`/`switch`) e iteración (`for`/`while`), heredado de JavaScript/C — sin `goto`, base de cualquier lenguaje estructurado.
* **Funciones como unidad de descomposición:** en programación estructurada el programa se organiza en funciones con entrada y salida bien definidas (no en objetos con estado y métodos), como en tu propio TP (`tareas.ts`, `fechas.ts`, etc.).

# 2. Creencias de los profesionales — qué se cree "mejor"

Acá la respuesta no es solo técnica, sino sobre percepción de la comunidad, y hay datos recientes que la respaldan:

En la encuesta **2024 de Stack Overflow** —una de las fuentes más citadas de la industria—, TypeScript se ubica entre los lenguajes con mejores métricas tanto de uso como de admiración por parte de los desarrolladores. Un informe de **JetBrains** de fines de 2024 fue más allá: creó un **"Language Promise Index"** (combinando crecimiento de usuarios, estabilidad de ese crecimiento e intención de seguir usándolo) en el que TypeScript quedó primero, por delante incluso de Rust y Python. *(Referencia: devvisualstudiomagazine)*

Las creencias concretas detrás de esos números, que podés desarrollar en tu respuesta:

* **Detección temprana de errores:** se cree que atrapar errores de tipos en tiempo de compilación es preferible a descubrirlos en producción, como puede pasar en JS puro. Vos mismo lo viviste: un `Estado` mal escrito se marca antes de correr una sola línea.
* **Adopción incremental sin reescritura total:** uno de los puntos más valorados es que TypeScript es un *superset* de JavaScript — se puede migrar módulo por módulo (justo lo que hiciste ayer) en vez de reescribir el proyecto entero de una vez, algo que un análisis técnico de la encuesta 2020 ya destacaba como diferencial frente a otros lenguajes tipados: su capacidad de adoptarse incrementalmente permite a los desarrolladores "probarlo" ganando beneficios inmediatos, sin encarar un proyecto de migración riesgoso. *(Referencia: visualstudiomagazine)*
* **Confianza en la corrección del código en proyectos grandes:** la creencia extendida es que, a medida que una base de código en JavaScript crece en tamaño y complejidad, adoptar el tipado estático de TypeScript le da a los desarrolladores mayor confianza en la corrección de su código — se cree que aporta poco en scripts chicos, pero se vuelve indispensable en equipos grandes. *(Referencia: visualstudiomagazine)*
* **Mejor experiencia de herramientas (tooling):** se cree que el tipado explícito habilita autocompletado más preciso y *refactors* más seguros (renombrar algo y que el editor avise en cada lugar donde se usa).
* **La documentación implícita del código:** la firma de una función comunica su contrato sin necesitar comentarios aparte.