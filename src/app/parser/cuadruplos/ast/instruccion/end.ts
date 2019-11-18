import { Instruccion } from './instruccion';
import { Entorno } from '../entorno/entorno';
import { Tipo } from '../entorno/simbolo.interface';


export class End extends Instruccion {

    constructor(
        public id: String,
        public linea: number,
        public columna: number
    ){
        super(linea, columna);
    }

    ejecutar(e: Entorno, log: any, errores: any) {
        return this.id;
    }

    traducir(e: Entorno, errores: any){
        return "RET\n" + this.id.toLowerCase() + "    ENDP\n\n";
    }
    
}