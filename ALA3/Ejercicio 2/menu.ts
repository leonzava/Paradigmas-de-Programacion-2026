import promptSync from "prompt-sync";
import { Calculadora } from "./calculadora";
const prompt = promptSync();

function pedirNumero(mensaje: string): number {
    let numero = parseFloat(prompt(mensaje));
    while (isNaN(numero)) {
        console.log("Por favor, ingrese un número válido.");
        numero = parseFloat(prompt(mensaje));
    }
    return numero;
}

function mostrarMenu(): void {
    console.log("Seleccione una opción:");
    console.log("1. Sumar");
    console.log("2. Restar");
    console.log("3. Multiplicar");
    console.log("4. Dividir");
    console.log("5. Salir");
}

function main(): void {
    console.log("Bienvenido a la calculadora!\n");
    const calculiadora = new Calculadora(pedirNumero("Ingrese el número inicial: "));
    let opcion: number;
    
    do {

        mostrarMenu();
        opcion = parseInt(prompt("Ingrese su opción: "));

        switch (opcion) {
            case 1:
                console.log("Resultado: " + calculiadora.sumar(pedirNumero("Ingrese el número a sumar: ")));
                break;

            case 2:
                console.log("Resultado: " + calculiadora.restar(pedirNumero("Ingrese el número a restar: ")));
                break;

            case 3:
                console.log("Resultado: " + calculiadora.multiplicar(pedirNumero("Ingrese el número a multiplicar: ")));
                break;

            case 4:
                try {
                    console.log("Resultado: " + calculiadora.dividir(pedirNumero("Ingrese el número a dividir: ")));
                } catch (error) {
                        console.log("Error: NO se puede dividir por cero. Por favor, ingrese un número diferente de cero.");
                }
                break;

            case 5:
                console.log("Saliendo de la calculiadora. ¡Hasta luego!");
                break;
                        
            default:
                console.log("Opción inválida. Por favor, seleccione una opción del 1 al 5.");
                break;
        }
    } while (opcion !== 5);
}

main();

