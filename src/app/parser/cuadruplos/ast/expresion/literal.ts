import { Expresion } from './expresion';
import { Entorno } from '../entorno/entorno';
import { Tipo } from '../entorno/simbolo.interface';

export class Literal extends Expresion{

    constructor(
        public tipo: Tipo,
        public valor: any,
        public linea: number,
        public columna: number
    ) {
        super(linea, columna);
        this.Tipo = tipo;
    }

    getValor(e: Entorno, log: any, errores: any) {
        return this.valor;
    }

    traducir(e: Entorno, errores: any) {
        if(this.tipo == Tipo.DECIMAL){
            return Math.floor(Number(this.valor)).toString();
        } else {
            return this.valor.toString();
        }
    }
    
}