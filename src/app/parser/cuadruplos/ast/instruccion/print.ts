import { Instruccion } from './instruccion';
import { Entorno } from '../entorno/entorno';
import { Expresion } from '../expresion/expresion';
import { isNullOrUndefined } from 'util';

export class Print extends Instruccion{

    constructor(
        public char: String, 
        public expr: Expresion,
        public linea: number, 
        public columna: number
    ) {
        super(linea, columna);
     }


    ejecutar(e: Entorno, log: any, errores: any) {
        let valExpr = this.expr.getValor(e, log, errores);

        if(!isNullOrUndefined(valExpr)){
            if (this.char == "c") {
                log.setValue(log.getValue() + String.fromCharCode(valExpr));
            } else if(this.char == "e"){
                log.setValue(log.getValue() + Math.floor(Number(valExpr)));
            } else {
                if(Number(valExpr) - Math.floor(Number(valExpr)) == 0){
                    log.setValue(log.getValue() + Number(valExpr) + ".0");
                } else {
                    log.setValue(log.getValue() + Number(valExpr));
                }
                //log.setValue(log.getValue() + parseFloat(valExpr)/*.toFixed(5)*/);
            }
            log.gotoPageDown();
        }
    }
    
}