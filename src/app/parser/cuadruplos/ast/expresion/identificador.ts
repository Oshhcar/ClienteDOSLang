import { Expresion } from './expresion';
import { Entorno } from '../entorno/entorno';

export class Identificador extends Expresion{

    constructor(
        public id: String, 
        public linea: number,
        public columna: number
    ) {
        super(linea, columna);
    }

    getValor(e: Entorno, log: any, errores: any) {
        let s = e.getSimbolo(this.id.toLowerCase()); 
        if(s){
            this.Tipo = s.tipo;
            return s.valor;
        } else {
            errores.push({
                numero: errores.length+1,
                valor: 'Semántico',
                descripcion: 'Variable "' + this.id.toLowerCase() + '" no definida.',
                linea: this.linea,
                columna: this.columna
            });
        }
        return null;
    }
    
}