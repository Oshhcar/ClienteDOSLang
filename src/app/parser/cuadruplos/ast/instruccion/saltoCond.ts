import { Instruccion } from './instruccion';
import { Entorno } from '../entorno/entorno';
import { Expresion } from '../expresion/expresion';
import { isNullOrUndefined } from 'util';
import { Tipo } from '../entorno/simbolo.interface';

export class SaltoCond extends Instruccion{

    constructor(
        public tipoSalto: TipoSalto,
        public exp1: Expresion,
        public exp2: Expresion,
        public label: String,
        public linea: number,
        public columna: number
    ){
        super(linea, columna);
    }

    ejecutar(e: Entorno, log: any, errores: any) {
        let lab = e.getLabel(this.label.toUpperCase());
        if(!isNullOrUndefined(lab)){
            let valExp1 = this.exp1.getValor(e, log, errores);
            let valExp2 = this.exp2.getValor(e, log, errores);

            if(!isNullOrUndefined(valExp1) && !isNullOrUndefined(valExp2)){
                if(this.exp1.Tipo == Tipo.NUMERO && this.exp2.Tipo == Tipo.NUMERO){
                    switch(this.tipoSalto){
                        case TipoSalto.IGUAL:{
                            if(Number(valExp1) == Number(valExp2)){
                                return lab.valor;
                            }
                            break;
                        }
                        case TipoSalto.DIFERENTE:{
                            if(Number(valExp1) != Number(valExp2)){
                                return lab.valor;
                            }
                            break;
                        }
                        case TipoSalto.MAYORQUE:{
                            if(Number(valExp1) > Number(valExp2)){
                                return lab.valor;
                            }
                            break;
                        }
                        case TipoSalto.MENORQUE:{
                            if(Number(valExp1) < Number(valExp2)){
                                return lab.valor;
                            }
                            break;
                        }
                        case TipoSalto.MAYORIGUAL: {
                            if(Number(valExp1) >= Number(valExp2)){
                                return lab.valor;
                            }
                            break;
                        }
                        case TipoSalto.MENORIGUAL: {
                            if(Number(valExp1) <= Number(valExp2)){
                                return lab.valor;
                            }
                            break;
                        }
                    }
                } else{
                    errores.push({
                        valor: 'Semántico',
                        descripcion: 'No se pudo realizar la operaciópn relacional.',
                        linea: this.linea,
                        columna: this.columna
                    });
                }
            }

        } else {
            errores.push({
                valor: 'Semántico',
                descripcion: 'Etiqueta "' + this.label.toUpperCase() + '" no definida.',
                linea: this.linea,
                columna: this.columna
            });
        }
        return null;
    }
    
}

export const enum TipoSalto{
    IGUAL,
    DIFERENTE,
    MAYORQUE,
    MENORQUE,
    MAYORIGUAL,
    MENORIGUAL
}