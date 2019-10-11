import { Instruccion } from './instruccion';
import { Entorno } from '../entorno/entorno';
import { Tipo } from '../entorno/simbolo.interface';

export class Label extends Instruccion{
    
    public i: number;

    constructor(
        public label: String, 
        public linea: number, 
        public columna: number
    ) {
        super(linea, columna);
     }

    ejecutar(e: Entorno, log: any, errores: any): any {
        if(!e.getLabel(this.label.toUpperCase())){
            e.addSimbolo({
                id: this.label.toUpperCase(),
                valor: this.i,
                tipo: Tipo.LABEL
            });

        } else {
            errores.push({
                numero: errores.length+1,
                valor: 'Semántico',
                descripcion: 'Etiqueta "' + this.label.toUpperCase() + '" ya definida.',
                linea: this.linea,
                columna: this.columna
            });
        }
        return null;
    }    
}