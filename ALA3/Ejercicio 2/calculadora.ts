export class Calculadora {
    private resultado: number;

    constructor(numeroInicial: number) {
        this.resultado = numeroInicial;
    }

    public getResultado(): number {
        return this.resultado;
    }

    public sumar(numero: number): number {
        this.resultado = this.resultado + numero;
        return this.resultado;

    }
    public restar(numero: number): number {
        this.resultado = this.resultado - numero;
        return this.resultado;

    }
    public multiplicar(numero: number): number {
        this.resultado = this.resultado * numero;
        return this.resultado;

    }

    public dividir(numero: number): number {
        if (numero === 0) {
            throw new Error("No se puede dividir por cero.");
        } else {
            this.resultado = this.resultado / numero;
            return this.resultado;
        }
      }
    }