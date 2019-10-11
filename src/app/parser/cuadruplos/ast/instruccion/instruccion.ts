import { NodoAST } from "../nodoAst";
import { Entorno } from "../entorno/entorno";

export abstract class Instruccion extends NodoAST{

    constructor(
        public linea: number,
        public columna: number
    ) {
        super(linea, columna);
     }

    abstract ejecutar(e: Entorno, log: any, errores: any) : any;
}