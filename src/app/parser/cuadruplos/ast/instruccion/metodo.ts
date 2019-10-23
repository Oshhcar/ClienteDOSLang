import { Instruccion } from './instruccion';
import { Entorno } from '../entorno/entorno';
import { Tipo } from '../entorno/simbolo.interface';


export class Metodo extends Instruccion {

    constructor(
        public id: String,
        public id2: String,
        public nodos: any[],
        public linea: number,
        public columna: number
    ){
        super(linea, columna);
    }

    ejecutar(e: Entorno, log: any, errores: any) {

        if(!(this.id === this.id2)){
            errores.push({
                valor: 'Semántico',
                descripcion: 'Identificadores  de "Begin" y "End" no coinciden.',
                linea: this.linea,
                columna: this.columna
            });
        } 

        if(!e.getMetodo(this.id.toLowerCase())){
            e.addSimbolo({
                id: this.id.toLowerCase(),
                valor: this.nodos,
                tipo: Tipo.METODO
            });

        } else {
            errores.push({
                valor: 'Semántico',
                descripcion: 'Método "' + this.id.toLowerCase() + '" ya definido.',
                linea: this.linea,
                columna: this.columna
            });
        }
        return null;
    }

    
}