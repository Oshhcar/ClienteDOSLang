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

    
}