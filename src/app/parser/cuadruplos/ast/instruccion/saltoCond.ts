import { Instruccion } from './instruccion';
import { Entorno } from '../entorno/entorno';
import { Expresion } from '../expresion/expresion';
import { isNullOrUndefined } from 'util';
import { Tipo } from '../entorno/simbolo.interface';

export class SaltoCond extends Instruccion {

    constructor(
        public tipoSalto: TipoSalto,
        public exp1: Expresion,
        public exp2: Expresion,
        public label: String,
        public linea: number,
        public columna: number
    ) {
        super(linea, columna);
    }

    ejecutar(e: Entorno, log: any, errores: any) {
        let lab = e.getLabel(this.label.toUpperCase());
        if (!isNullOrUndefined(lab)) {
            let valExp1 = this.exp1.getValor(e, log, errores);
            let valExp2 = this.exp2.getValor(e, log, errores);

            if (!isNullOrUndefined(valExp1) && !isNullOrUndefined(valExp2)) {
                if ((this.exp1.Tipo == Tipo.ENTERO || this.exp1.Tipo == Tipo.DECIMAL) && (this.exp2.Tipo == Tipo.ENTERO || this.exp2.Tipo == Tipo.DECIMAL)) {
                    switch (this.tipoSalto) {
                        case TipoSalto.IGUAL: {
                            if (Number(valExp1) == Number(valExp2)) {
                                return lab.valor;
                            }
                            break;
                        }
                        case TipoSalto.DIFERENTE: {
                            if (Number(valExp1) != Number(valExp2)) {
                                return lab.valor;
                            }
                            break;
                        }
                        case TipoSalto.MAYORQUE: {
                            if (Number(valExp1) > Number(valExp2)) {
                                return lab.valor;
                            }
                            break;
                        }
                        case TipoSalto.MENORQUE: {
                            if (Number(valExp1) < Number(valExp2)) {
                                return lab.valor;
                            }
                            break;
                        }
                        case TipoSalto.MAYORIGUAL: {
                            if (Number(valExp1) >= Number(valExp2)) {
                                return lab.valor;
                            }
                            break;
                        }
                        case TipoSalto.MENORIGUAL: {
                            if (Number(valExp1) <= Number(valExp2)) {
                                return lab.valor;
                            }
                            break;
                        }
                    }
                } else {
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

    traducir(e: Entorno, errores: any) {
        let codigo = "";

        let valExp1 = this.exp1.traducir(e, errores);
        let valExp2 = this.exp2.traducir(e, errores);

        if (!isNullOrUndefined(valExp1) && !isNullOrUndefined(valExp2)) {
            if ((this.exp1.Tipo == Tipo.ENTERO || this.exp1.Tipo == Tipo.DECIMAL) && (this.exp2.Tipo == Tipo.ENTERO || this.exp2.Tipo == Tipo.DECIMAL)) {
                codigo += "mov  ax, " + valExp1 + "\n";
                codigo += "cmp  ax, " + valExp2 + "\n";
                
                let salto = "";
                switch (this.tipoSalto) {
                    case TipoSalto.IGUAL: {
                        salto = "je";
                        break;
                    }
                    case TipoSalto.DIFERENTE: {
                        salto = "jne";
                        break;
                    }
                    case TipoSalto.MAYORQUE: {
                        salto = "jg";
                        break;
                    }
                    case TipoSalto.MENORQUE: {
                        salto = "jl";
                        break;
                    }
                    case TipoSalto.MAYORIGUAL: {
                        salto = "jge";
                        break;
                    }
                    case TipoSalto.MENORIGUAL: {
                        salto = "jle";
                        break;
                    }
                }

                codigo += salto + "   " + this.label.toUpperCase() + "\n";
            } else {
                errores.push({
                    valor: 'Semántico',
                    descripcion: 'No se pudo realizar la operaciópn relacional. ASM',
                    linea: this.linea,
                    columna: this.columna
                });
            }
        }


        return codigo;
    }
}

export const enum TipoSalto {
    IGUAL,
    DIFERENTE,
    MAYORQUE,
    MENORQUE,
    MAYORIGUAL,
    MENORIGUAL
}