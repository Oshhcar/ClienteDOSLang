import { Instruccion } from './instruccion';
import { Entorno } from '../entorno/entorno';


export class Read extends Instruccion {

    constructor(
        public linea: number,
        public columna: number
    ){
        super(linea, columna);
    }

    ejecutar(e: Entorno, log: any, errores: any) {
        return null;
    }

    traducir(e: Entorno, errores: any){
        let codigo = "";

        return codigo;
    }
}