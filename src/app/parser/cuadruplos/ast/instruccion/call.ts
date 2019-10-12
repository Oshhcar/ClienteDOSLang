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

            let local: Entorno = new Entorno(e);

            for (let i = 0; i < sim.valor.length; i++){
                let nodo = sim.valor[i];
    
                if(nodo instanceof Label) {
                    nodo.i = i;
                    nodo.ejecutar(local, log, errores);
                }
            }
    
            for (let i = 0; i < sim.valor.length; i++) {
                let nodo = sim.valor[i];
    
                if (!(nodo instanceof Label)) {
                    if(!(nodo instanceof Salto) && !(nodo instanceof SaltoCond)) {
                        nodo.ejecutar(local, log, errores);
                    } else {
                        let salto = nodo.ejecutar(local, log, errores);
                        if(!isNullOrUndefined(salto)){
                            i = salto;
                        }
                    }
                }
            }

        } else {
            errores.push({
                numero: errores.length+1,
                valor: 'Semántico',
                descripcion: 'Método "' + this.id.toLowerCase() + '" no definido.',
                linea: this.linea,
                columna: this.columna
            });
        }
        return null;
    }

}