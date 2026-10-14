# Ejercicio 4: Características de OOP utilizadas en los Ejercicios 2 y 3

En el Ejercicio 2 armé la clase `Calculadora` y en el Ejercicio 3 el programa de consola que la usa. Este documento explica qué características de la Programación Orientada a Objetos (OOP) apliqué, con ejemplos del código, y cuáles no utilicé y por qué.

## Características que utilicé

### 1. Clase y objeto

Una clase es el molde que define qué datos tiene algo y qué puede hacer. Un objeto es una instancia concreta de ese molde. `Calculadora` es la clase y en el programa principal creo un objeto a partir de ella:

```typescript
const calculiadora = new Calculadora(pedirNumero("Ingrese el número inicial: "));
```

Esa línea no es "la calculadora" en general, sino una calculadora concreta con su propio resultado inicial. Si creara otra con `new Calculadora(100)`, serían dos objetos independientes, cada uno con su propio estado.

### 2. Atributos y métodos (estado y comportamiento juntos)

La clase junta en un solo lugar el dato (`resultado`) y las operaciones que trabajan con ese dato (`sumar`, `restar`, `multiplicar`, `dividir`). Cada método usa `this.resultado` para leer y modificar el estado del objeto:

```typescript
public sumar(numero: number): number {
    this.resultado = this.resultado + numero;
    return this.resultado;
}
```

Esto es lo contrario a programar con funciones sueltas y una variable global: acá los datos y las operaciones que los modifican viven juntos.

### 3. Constructor

El constructor se ejecuta al crear el objeto y lo deja en un estado válido desde el principio:

```typescript
constructor(numeroInicial: number) {
    this.resultado = numeroInicial;
}
```

Gracias a esto, una `Calculadora` nunca existe sin un resultado inicial.

### 4. Encapsulamiento

El atributo `resultado` es `private`, por lo que desde afuera de la clase no se puede escribir `calculiadora.resultado = 999`. La única forma de modificarlo es a través de los métodos públicos, y la única forma de leerlo es `getResultado()`.

Esto protege el estado: toda modificación pasa por métodos que controla la propia clase. El mejor ejemplo es `dividir`, que valida antes de modificar:

```typescript
public dividir(numero: number): number {
    if (numero === 0) {
        throw new Error("No se puede dividir por cero.");
    } else {
        this.resultado = this.resultado / numero;
        return this.resultado;
    }
}
```

Si `resultado` fuera público, cualquiera podría saltearse esa regla. Con el encapsulamiento, "no se divide por cero" queda garantizado porque no hay otro camino para dividir.

### 5. Abstracción

Quien usa la calculadora no necesita saber cómo se guarda el resultado ni cómo se hace la cuenta por dentro. Solo conoce lo que puede pedirle: sumar, restar, multiplicar, dividir y consultar el resultado. En el `main` alcanza con escribir `calculiadora.sumar(5)` y olvidarse de los detalles. La clase muestra **qué** hace y esconde **cómo** lo hace.

### 6. Separación de responsabilidades

Dividí el trabajo en dos archivos con tareas distintas:

- `calculadora.ts`: solo tiene la lógica matemática. No usa `console.log` ni `prompt`.
- El programa principal: se encarga de la interacción con el usuario (el menú, pedir números y mostrar resultados).

Así se puede reutilizar la clase en una página web o en tests automáticos sin tocarla, porque no depende de la consola. Y cambiar el menú tampoco rompe la lógica de la calculadora.

### 7. Manejo de excepciones

Cuando la clase detecta un uso inválido (dividir por cero), no decide qué mostrarle al usuario: lanza un error con `throw`. El programa principal lo captura con `try/catch` y decide cómo comunicarlo:

```typescript
try {
    console.log("Resultado: " + calculiadora.dividir(pedirNumero("Ingrese el número a dividir: ")));
} catch (error) {
    console.log("Error: NO se puede dividir por cero. Por favor, ingrese un número diferente de cero.");
}
```

La clase detecta el problema y el programa decide cómo reaccionar. Esto refuerza la separación de responsabilidades del punto anterior.

## Características que no utilicé

| Característica | Por qué no fue necesaria |
|---|---|
| **Herencia** | No había una relación "es un tipo de" entre clases. Hay una sola clase y ninguna más general de la que `Calculadora` sea un caso particular. Habría tenido sentido con una `CalculadoraCientifica` que extendiera a `Calculadora` agregando potencias y raíces. |
| **Polimorfismo** | Depende de la herencia o de interfaces: se usa cuando varios objetos distintos responden al mismo método de formas diferentes. Con una sola clase no había dónde aplicarlo. |
| **Composición** | Solo interviene un objeto de la clase `Calculadora`. Habría composición si, por ejemplo, la calculadora tuviera un objeto `Historial` que guardara las operaciones realizadas. |
| **Interfaces y clases abstractas** | Sirven para definir contratos que varias clases deben cumplir. Con una sola clase concreta no tenían función. |
| **Miembros estáticos** | Todos los métodos dependen del estado de un objeto concreto (`this.resultado`), así que ninguno tenía sentido como `static`. |

## Conclusión

Usé las características fundamentales de la OOP: clases y objetos, constructor, encapsulamiento, abstracción y separación de responsabilidades, junto con el manejo de excepciones. Las que dejé afuera (herencia, polimorfismo, composición, interfaces) tienen sentido cuando hay varias clases relacionadas entre sí, y este problema se resolvía bien con una sola clase. Aplicarlas igual habría complicado el código sin aportar nada.