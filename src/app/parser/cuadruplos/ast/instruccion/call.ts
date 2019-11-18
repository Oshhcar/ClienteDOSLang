import { Instruccion } from './instruccion';
import { Entorno } from '../entorno/entorno';
import { Label } from './label';
import { Salto } from './salto';
import { SaltoCond } from './saltoCond';
import { isNullOrUndefined } from 'util';


export class Call extends Instruccion {

    constructor(
        public id: String,
        public linea: number,
        public columna: number
    ){
        super(linea, columna);
    }

    ejecutar(e: Entorno, log: any, errores: any) {
        let sim = e.getMetodo(this.id.toLowerCase());
        if(sim){
            return sim.valor;
        } else {
            errores.push({
                valor: 'Semántico',
                descripcion: 'Método "' + this.id.toLowerCase() + '" no definido.',
                linea: this.linea,
                columna: this.columna
            });
        }
        return null;
    }

    traducir(e: Entorno, errores: any){
        return "call    " +  this.id.toLowerCase() + "\n";
    }

}