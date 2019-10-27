import { Instruccion } from './instruccion';
import { Entorno } from '../entorno/entorno';
import { Tipo } from '../entorno/simbolo.interface';


export class Metodo extends Instruccion {

    public i: number;

    constructor(
        public id: String,
        public linea: number,
        public columna: number
    ){
        super(linea, columna);
    }

    ejecutar(e: Entorno, log: any, errores: any) {
        if(!e.getMetodo(this.id.toLowerCase())){
            e.addSimbolo({
                id: this.id.toLowerCase(),
                valor: this.i,
                tipo: Tipo.METODO
            });
            return this.id;
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