import { Instruccion } from './instruccion';
import { Expresion } from '../expresion/expresion';
import { Entorno } from '../entorno/entorno';
import { isNullOrUndefined } from 'util';
import { Tipo } from '../entorno/simbolo.interface';

export class Asignacion extends Instruccion {

    public target: String;
    public temp: boolean;

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
                    if (this.exp1.Tipo == Tipo.ENTERO || this.exp1.Tipo == Tipo.DECIMAL) {
                        let sim = this.temp? e.getTemporal(this.target.toLowerCase()) : e.getIdentificador(this.target.toLowerCase());
                        if (isNullOrUndefined(sim)) {
                            sim = {
                                id: this.target.toLowerCase(),
                                valor: null,
                                tipo: this.exp1.Tipo
                            }
                            e.addSimbolo(sim);
                        }
                        if (sim.tipo == Tipo.ENTERO || sim.tipo == Tipo.DECIMAL) {
                            sim.valor = valExp1;
                            sim.tipo == this.exp1.Tipo;
                        } else {
                            errores.push({
                                valor: 'Semántico',
                                descripcion: 'No se puede asignar el valor a "' + this.target.toUpperCase() + '".',
                                linea: this.linea,
                                columna: this.columna
                            });
                        }
                    } else {
                        errores.push({
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

                            let sim = e.getIdentificador(this.target.toLowerCase());
                            if (isNullOrUndefined(sim)) {
                                sim = {
                                    id: this.target.toLowerCase(),
                                    valor: [],
                                    tipo: Tipo.ARREGLO
                                }
                                e.addSimbolo(sim);
                            }

                            if (sim.tipo == Tipo.ARREGLO) {
                                if (this.exp1.Tipo == Tipo.ENTERO) {
                                    if(this.exp2.Tipo == Tipo.ENTERO || this.exp2.Tipo == Tipo.DECIMAL){
                                        sim.valor[Number(valExp1)] = Number(valExp2);
                                    } else {
                                        errores.push({
                                            valor: 'Semántico',
                                            descripcion: 'Valor debe ser entero o decimal.',
                                            linea: this.linea,
                                            columna: this.columna
                                        });
                                    }
                                } else {
                                    errores.push({
                                        valor: 'Semántico',
                                        descripcion: 'Posición del arreglo debe ser entero.',
                                        linea: this.linea,
                                        columna: this.columna
                                    });
                                }
                            } else {
                                errores.push({
                                    valor: 'Semántico',
                                    descripcion: 'Variable "' + this.target.toLowerCase() + '" no es arreglo.',
                                    linea: this.linea,
                                    columna: this.columna
                                });
                            }

                        } else {
                            if (this.exp1.Tipo == Tipo.ARREGLO) {
                                if (this.exp2.Tipo == Tipo.ENTERO) {
                                    if (isNullOrUndefined(valExp1[Number(valExp2)])) {
                                        errores.push({
                                            valor: 'Semántico',
                                            descripcion: 'No hay valor en la posición ' + valExp2 + ' del arreglo.',
                                            linea: this.linea,
                                            columna: this.columna
                                        });
                                        errores.push({
                                            valor: 'Semántico',
                                            descripcion: 'NullPointerException.',
                                            linea: this.linea,
                                            columna: this.columna
                                        });
                                        log.setValue(log.getValue() + "\nNullPointerException en Línea: " + this.linea + ".\n");
                                        log.gotoPageDown();
                                        e.NullPointer = true;
                                    } else {
                                        let sim = this.temp? e.getTemporal(this.target.toLowerCase()) : e.getIdentificador(this.target.toLowerCase());
                                        
                                        let valor = valExp1[Number(valExp2)];
                                        let tipo : Tipo;

                                        if(valor%1 == 0){
                                            tipo = Tipo.ENTERO;
                                        } else {
                                            tipo = Tipo.DECIMAL;
                                        }
                                        
                                        if (isNullOrUndefined(sim)) {
                                            sim = {
                                                id: this.target.toLowerCase(),
                                                valor: null,
                                                tipo: tipo
                                            }
                                            e.addSimbolo(sim);
                                        }
                                        if (sim.tipo == Tipo.ENTERO || sim.tipo == Tipo.DECIMAL) {
                                            sim.valor = valor;
                                            //sim.tipo = tipo;
                                        } else {
                                            errores.push({
                                                valor: 'Semántico',
                                                descripcion: 'No se puede asignar el valor a "' + this.target.toUpperCase() + '".',
                                                linea: this.linea,
                                                columna: this.columna
                                            });
                                        }
                                    }
                                } else {
                                    errores.push({
                                        valor: 'Semántico',
                                        descripcion: 'Posición debe ser número entero.',
                                        linea: this.linea,
                                        columna: this.columna
                                    });
                                }
                            } else {
                                errores.push({
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
                    if ((this.exp1.Tipo == Tipo.ENTERO || this.exp1.Tipo == Tipo.DECIMAL ) && (this.exp2.Tipo == Tipo.ENTERO || this.exp2.Tipo == Tipo.DECIMAL)) {
                        
                        let tipoDominante;

                        if(this.exp1.Tipo == Tipo.DECIMAL || this.exp2.Tipo == Tipo.DECIMAL){
                            tipoDominante = Tipo.DECIMAL;
                        } else {
                            tipoDominante = Tipo.ENTERO;
                        }

                        let sim = this.temp? e.getTemporal(this.target.toLowerCase()) : e.getIdentificador(this.target.toLowerCase());
                        if (isNullOrUndefined(sim)) {
                            sim = {
                                id: this.target.toLowerCase(),
                                valor: null,
                                tipo: tipoDominante
                            }
                            e.addSimbolo(sim);
                        }
                        if (sim.tipo == Tipo.ENTERO || sim.tipo == Tipo.DECIMAL) {
                            switch(this.op){
                                case Op.SUMA:{
                                    sim.valor = Number(valExp1) + Number(valExp2);
                                    sim.tipo = tipoDominante;
                                    break;
                                }
                                case Op.RESTA:{
                                    sim.valor = Number(valExp1) - Number(valExp2);
                                    sim.tipo = tipoDominante;
                                    break;
                                }
                                case Op.MULTIPLICACION:{
                                    sim.valor = Number(valExp1) * Number(valExp2);
                                    sim.tipo = tipoDominante;
                                    break;
                                }
                                case Op.DIVISION:{
                                    if(Number(valExp2) != 0){
                                        if(tipoDominante == Tipo.DECIMAL){
                                            sim.valor = (Number(valExp1) / Number(valExp2));
                                        } else {
                                            sim.valor = Math.floor(Number(valExp1) / Number(valExp2));
                                        }
                                        sim.tipo = tipoDominante;
                                    } else {
                                        errores.push({
                                            valor: 'Semántico',
                                            descripcion: 'No se puede dividir entre 0.',
                                            linea: this.linea,
                                            columna: this.columna
                                        });
                                        errores.push({
                                            valor: 'Semántico',
                                            descripcion: 'ArithmethicException',
                                            linea: this.linea,
                                            columna: this.columna
                                        });
                                        log.setValue(log.getValue() + "\nArithmethicException en Línea: " + this.linea + ".\n");
                                        log.gotoPageDown();
                                        e.NullPointer = true;
                                    }
                                    break;
                                }
                                case Op.MODULO:{
                                    if(tipoDominante == Tipo.DECIMAL){
                                        sim.valor = Number(valExp1) % Number(valExp2);
                                    } else {
                                        sim.valor =Math.floor(Number(valExp1) % Number(valExp2));
                                    }
                                    sim.tipo = tipoDominante;
                                    break;
                                }
                            }
                        } else {
                            errores.push({
                                valor: 'Semántico',
                                descripcion: 'No se puede asignar el valor a "' + this.target.toUpperCase() + '".',
                                linea: this.linea,
                                columna: this.columna
                            });
                        }
                    } else {
                        errores.push({
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