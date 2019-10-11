import { Instruccion } from './instruccion';
import { Expresion } from '../expresion/expresion';
import { Entorno } from '../entorno/entorno';
import { isNullOrUndefined } from 'util';
import { Tipo } from '../entorno/simbolo.interface';

export class Asignacion extends Instruccion {

    public target: String;

    constructor(
        public op: Op,
        public exp1: Expresion,
        public exp2: Expresion,
        public linea: number,
        public columna: number
    ) {
        super(linea, columna);
    }

    ejecutar(e: Entorno, log: any, errores: any) {
        let valExp1 = this.exp1.getValor(e, log, errores);

        if (!isNullOrUndefined(valExp1)) {
            if (this.op == Op.IGUAL) {
                if (isNullOrUndefined(this.exp2)) {
                    if (this.exp1.Tipo == Tipo.NUMERO) {
                        let sim = e.getSimbolo(this.target.toLowerCase());
                        if (isNullOrUndefined(sim)) {
                            sim = {
                                id: this.target.toLowerCase(),
                                valor: null,
                                tipo: Tipo.NUMERO
                            }
                            e.addSimbolo(sim);
                        }
                        if (sim.tipo == Tipo.NUMERO) {
                            sim.valor = valExp1;
                        } else {
                            errores.push({
                                numero: errores.length + 1,
                                valor: 'Semántico',
                                descripcion: 'No se puede asignar el valor a "' + this.target.toUpperCase() + '".',
                                linea: this.linea,
                                columna: this.columna
                            });
                        }
                    } else {
                        errores.push({
                            numero: errores.length + 1,
                            valor: 'Semántico',
                            descripcion: 'No se puede asignar el valor a "' + this.target.toUpperCase() + '".',
                            linea: this.linea,
                            columna: this.columna
                        });
                    }
                } else {
                    /* PILA O STACK*/
                    let valExp2 = this.exp2.getValor(e, log, errores);
                    if (!isNullOrUndefined(valExp2)) {
                        if (this.target.toLowerCase() === "stack" || this.target.toLowerCase() === "heap") {

                            let sim = e.getSimbolo(this.target.toLowerCase());
                            if (isNullOrUndefined(sim)) {
                                sim = {
                                    id: this.target.toLowerCase(),
                                    valor: [],
                                    tipo: Tipo.ARREGLO
                                }
                                e.addSimbolo(sim);
                            }

                            if (sim.tipo == Tipo.ARREGLO) {
                                if (this.exp1.Tipo == Tipo.NUMERO && this.exp2.Tipo == Tipo.NUMERO) {
                                    sim.valor[Number(valExp1)] = Number(valExp2);
                                } else {
                                    errores.push({
                                        numero: errores.length + 1,
                                        valor: 'Semántico',
                                        descripcion: 'Posición y valor debe ser número.',
                                        linea: this.linea,
                                        columna: this.columna
                                    });
                                }
                            } else {
                                errores.push({
                                    numero: errores.length + 1,
                                    valor: 'Semántico',
                                    descripcion: 'Variable "' + this.target.toLowerCase() + '" no es arreglo.',
                                    linea: this.linea,
                                    columna: this.columna
                                });
                            }

                        } else {
                            if (this.exp1.Tipo == Tipo.ARREGLO) {
                                if (this.exp2.Tipo == Tipo.NUMERO) {
                                    if (isNullOrUndefined(valExp1[Number(valExp2)])) {
                                        errores.push({
                                            numero: errores.length + 1,
                                            valor: 'Semántico',
                                            descripcion: 'No hay valor en la posición ' + valExp2 + ' del arreglo.',
                                            linea: this.linea,
                                            columna: this.columna
                                        });
                                    } else {
                                        let sim = e.getSimbolo(this.target.toLowerCase());
                                        if (isNullOrUndefined(sim)) {
                                            sim = {
                                                id: this.target.toLowerCase(),
                                                valor: null,
                                                tipo: Tipo.NUMERO
                                            }
                                            e.addSimbolo(sim);
                                        }
                                        if (sim.tipo == Tipo.NUMERO) {
                                            sim.valor = valExp1[Number(valExp2)];
                                        } else {
                                            errores.push({
                                                numero: errores.length + 1,
                                                valor: 'Semántico',
                                                descripcion: 'No se puede asignar el valor a "' + this.target.toUpperCase() + '".',
                                                linea: this.linea,
                                                columna: this.columna
                                            });
                                        }
                                    }
                                } else {
                                    errores.push({
                                        numero: errores.length + 1,
                                        valor: 'Semántico',
                                        descripcion: 'Posición debe ser número.',
                                        linea: this.linea,
                                        columna: this.columna
                                    });
                                }
                            } else {
                                errores.push({
                                    numero: errores.length + 1,
                                    valor: 'Semántico',
                                    descripcion: 'Variable de acceso no es arreglo.',
                                    linea: this.linea,
                                    columna: this.columna
                                });
                            }
                        }
                    }
                }
            } else {
                let valExp2 = this.exp2.getValor(e, log, errores);

                if (!isNullOrUndefined(valExp2)) {
                    if (this.exp1.Tipo == Tipo.NUMERO && this.exp2.Tipo == Tipo.NUMERO) {
                        let sim = e.getSimbolo(this.target.toLowerCase());
                        if (isNullOrUndefined(sim)) {
                            sim = {
                                id: this.target.toLowerCase(),
                                valor: null,
                                tipo: Tipo.NUMERO
                            }
                            e.addSimbolo(sim);
                        }
                        if (sim.tipo == Tipo.NUMERO) {
                            switch(this.op){
                                case Op.SUMA:{
                                    sim.valor = Number(valExp1) + Number(valExp2);
                                    break;
                                }
                                case Op.RESTA:{
                                    sim.valor = Number(valExp1) - Number(valExp2);
                                    break;
                                }
                                case Op.MULTIPLICACION:{
                                    sim.valor = Number(valExp1) * Number(valExp2);
                                    break;
                                }
                                case Op.DIVISION:{
                                    if(Number(valExp2) != 0){
                                        sim.valor = Number(valExp1) / Number(valExp2);
                                    } else {
                                        errores.push({
                                            numero: errores.length + 1,
                                            valor: 'Semántico',
                                            descripcion: 'No se puede dividir entre 0.',
                                            linea: this.linea,
                                            columna: this.columna
                                        });
                                    }
                                    break;
                                }
                                case Op.MODULO:{
                                    sim.valor = Number(valExp1) % Number(valExp2);
                                    break;
                                }
                            }
                        } else {
                            errores.push({
                                numero: errores.length + 1,
                                valor: 'Semántico',
                                descripcion: 'No se puede asignar el valor a "' + this.target.toUpperCase() + '".',
                                linea: this.linea,
                                columna: this.columna
                            });
                        }
                    } else {
                        errores.push({
                            numero: errores.length + 1,
                            valor: 'Semántico',
                            descripcion: 'No se pudo realizar la operaciópn aritmética.',
                            linea: this.linea,
                            columna: this.columna
                        });
                    }
                }
            }
        }

        return null;
    }
}

export const enum Op {
    IGUAL,
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MODULO
}