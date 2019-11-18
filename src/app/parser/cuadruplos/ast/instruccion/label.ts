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
                valor: 'Semántico',
                descripcion: 'Etiqueta "' + this.label.toUpperCase() + '" ya definida.',
                linea: this.linea,
                columna: this.columna
            });
        }
        return null;
    }   
    
    traducir(e: Entorno, errores: any){
        let codigo = "";
        if(!e.getLabel(this.label.toUpperCase())){
            e.addSimbolo({
                id: this.label.toUpperCase(),
                valor: this.i,
                tipo: Tipo.LABEL
            });
            codigo = this.label.toUpperCase() + ":\n";
        } else {
            errores.push({
                valor: 'Semántico',
                descripcion: 'Etiqueta "' + this.label.toUpperCase() + '" ya definida. ASM',
                linea: this.linea,
                columna: this.columna
            });
        }
        return codigo;
    }
}