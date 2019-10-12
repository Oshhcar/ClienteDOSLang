import { Expresion } from './expresion';
import { Entorno } from '../entorno/entorno';

export class Temporal extends Expresion{

    constructor(
        public id: String, 
        public linea: number,
        public columna: number
    ) {
        super(linea, columna);
    }

    getValor(e: Entorno, log: any, errores: any) {
        let s = e.getTemporal(this.id.toLowerCase()); 
        if(s){
            this.Tipo = s.tipo;
            return s.valor;
        } else {
            errores.push({
                numero: errores.length+1,
                valor: 'Semántico',
                descripcion: 'Temporal "' + this.id.toLowerCase() + '" no definido.',
                linea: this.linea,
                columna: this.columna
            });
        }
        return null;
    }
    
}