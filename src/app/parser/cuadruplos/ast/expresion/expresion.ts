import { NodoAST } from "../nodoAst";
import { Entorno } from '../entorno/entorno';
import { Tipo } from '../entorno/simbolo.interface';

export abstract class Expresion extends NodoAST{

    public Tipo: Tipo;
    
    constructor(
        public linea: number,
        public columna: number
    ) {
        super(linea, columna);
     }

    abstract getValor(e: Entorno, log: any, errores: any) : any;
}