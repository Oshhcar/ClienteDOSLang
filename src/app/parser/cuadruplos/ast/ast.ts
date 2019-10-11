import { Entorno } from './entorno/entorno';
import { Label } from './instruccion/label';
import { Salto } from './instruccion/salto';
import { isNullOrUndefined } from 'util';
import { SaltoCond } from './instruccion/saltoCond';

export class AST{
    
    constructor(public nodos: any[]) { }

    public ejecutar (log: any, errores: any){
        let entorno = new Entorno();
        
        for (let i = 0; i < this.nodos.length; i++){
            let nodo = this.nodos[i];

            if(nodo instanceof Label) {
                nodo.i = i;
                nodo.ejecutar(entorno, log, errores);
            }
        }

        for (let i = 0; i < this.nodos.length; i++) {
            let nodo = this.nodos[i];

            if (!(nodo instanceof Label)) {
                if(!(nodo instanceof Salto) && !(nodo instanceof SaltoCond)) {
                    nodo.ejecutar(entorno, log, errores);
                } else {
                    let salto = nodo.ejecutar(entorno, log, errores);
                    if(!isNullOrUndefined(salto)){
                        i = salto;
                    }
                }
            }
        }


        /*
        log.setValue(log.getValue() + "Guarda " + nodo.label + "\n");
                log.gotoPageDown()
        
        errores.push({
            numero: 1,
            valor: 'Semántico',
            descripcion: 'Error en línea ta',
            linea: "23",
            columna: "3"
        })
        */
    }
}