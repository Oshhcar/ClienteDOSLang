import { Instruccion } from './instruccion';
import { Entorno } from '../entorno/entorno';
import { isNullOrUndefined } from 'util';

export class Salto extends Instruccion{

    constructor(
        public label: String,
        public linea: number,
        public columna: number
    ) {
        super(linea, columna);
    }

    ejecutar(e: Entorno, log: any, errores: any) {
        let sim = e.getLabel(this.label.toUpperCase());
        if(!isNullOrUndefined(sim)){
            return sim.valor;
        }

        errores.push({
            valor: 'Semántico',
            descripcion: 'Etiqueta "' + this.label.toUpperCase() + '" no definida.',
            linea: this.linea,
            columna: this.columna
        });
        return null;
    }

}