import { Entorno } from './entorno/entorno';
import { Label } from './instruccion/label';
import { Salto } from './instruccion/salto';
import { isNullOrUndefined } from 'util';
import { SaltoCond } from './instruccion/saltoCond';
import { Metodo } from './instruccion/metodo';
import { End } from './instruccion/end';
import { Call } from './instruccion/call';
import { Read } from './instruccion/read';
import { BanderaInterface } from 'src/app/models/bandera.interface';

export class AST {

    public Continuar: boolean;
    public retorna: number[];
    public metodo: String;

    public Log: any;
    public Errores: any;
    public Entorno: Entorno;
    public Editor: any;
    public i: number;
    public Tiempo: number;
    public Breakpoints: number[];

    public Debugeando: boolean;
    public DebugeandoUntilBreakpoint: boolean;
    public Bandera: BanderaInterface;

    constructor(public nodos: any[]) { }

    public ejecutar(log: any, errores: any, entorno: Entorno, editor: any) {

        /*
        * Primera pasada para guardar Línea de Etiquetas y Métodos 
        * Verifico algúnos errores semánticos
        */
        this.metodo = null;
        for (let i = 0; i < this.nodos.length; i++) {
            let nodo = this.nodos[i];

            if (nodo instanceof Label) {
                nodo.i = i;
                nodo.ejecutar(entorno, log, errores);
            }
            else if (nodo instanceof Metodo) {
                if (isNullOrUndefined(this.metodo)) {
                    nodo.i = i;
                    let id = nodo.ejecutar(entorno, log, errores);

                    if (!isNullOrUndefined(id)) {
                        this.metodo = id;
                    }
                } else {
                    errores.push({
                        valor: 'Semántico',
                        descripcion: 'No se puede colocar métodos anidados en Cuádruplos.',
                        linea: nodo.linea,
                        columna: nodo.columna
                    });
                    return;
                }
            } else if (nodo instanceof End) {
                if (!isNullOrUndefined(this.metodo)) {
                    if (!(this.metodo === nodo.ejecutar(entorno, log, errores))) {
                        errores.push({
                            valor: 'Semántico',
                            descripcion: 'Identificadores  de "Begin" y "End" no coinciden.',
                            linea: nodo.linea,
                            columna: nodo.columna
                        });
                    }
                    this.metodo = null;
                } else {
                    errores.push({
                        valor: 'Semántico',
                        descripcion: 'No se puede colocar un "End" si no hay un "Begin" antes.',
                        linea: nodo.linea,
                        columna: nodo.columna
                    });
                    return;
                }
            }
        }

        /*
         * Segunda Pasada, ejecutar todo lo que no sea Label y Metodo 
        */
        this.retorna = [];
        this.metodo = null;

        this.Log = log;
        this.Errores = errores;
        this.Entorno = entorno;
        this.Editor = editor;
        this.Continuar = true;
        this.i = 0;
        this.Debugeando = false;
        this.Bandera.leerEntrada = false;
        this.ejecutarNodo();
        /*
        for (let i = 0; i < this.nodos.length; i++) {
            let nodo = this.nodos[i];

            if (isNullOrUndefined(this.metodo)) {
                if (!(nodo instanceof Label) && !(nodo instanceof Metodo)) {
                    if (nodo instanceof Call) {
                        let salto = nodo.ejecutar(entorno, log, errores);
                        if (!isNullOrUndefined(salto)) {
                            this.retorna.push(i);
                        }
                        i = salto;
                    } else if (nodo instanceof End) {
                        i = this.retorna.pop();
                    } else if (!(nodo instanceof Salto) && !(nodo instanceof SaltoCond)) {
                        nodo.ejecutar(entorno, log, errores);
                    } else {
                        let salto = nodo.ejecutar(entorno, log, errores);
                        if (!isNullOrUndefined(salto)) {
                            i = salto;
                        }
                    }
                } else {
                    if (nodo instanceof Metodo) {
                        this.metodo = nodo.id;
                    }
                }
            } else {
                if (nodo instanceof End) {
                    this.metodo = null;
                }
            }

            if(entorno.NullPointer) return;
        }
        */

        /*
        //entorno.Recorrer();

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

    public ejecutarNodo() {
        if (this.i < this.nodos.length) {
            let nodo = this.nodos[this.i];

            if (isNullOrUndefined(this.metodo)) {
                if (!(nodo instanceof Label) && !(nodo instanceof Metodo)) {
                    if (nodo instanceof Call) {
                        let salto = nodo.ejecutar(this.Entorno, this.Log, this.Errores);
                        if (!isNullOrUndefined(salto)) {
                            this.retorna.push(this.i);
                            this.i = salto;
                        }
                    } else if (nodo instanceof End) {
                        this.i = this.retorna.pop();
                    } else if (nodo instanceof Read) {
                        this.Bandera.leerEntrada = true;
                        this.Continuar = false;
                    } else if (!(nodo instanceof Salto) && !(nodo instanceof SaltoCond)) {
                        nodo.ejecutar(this.Entorno, this.Log, this.Errores);
                    } else {
                        let salto = nodo.ejecutar(this.Entorno, this.Log, this.Errores);
                        if (!isNullOrUndefined(salto)) {
                            this.i = salto;
                        }
                    }
                } else {
                    if (nodo instanceof Metodo) {
                        this.metodo = nodo.id;
                    }
                }
            } else {
                if (nodo instanceof End) {
                    this.metodo = null;
                }
            }
            this.i++;
            if (this.Entorno.NullPointer) {
                this.Continuar = false;
                return;
            }

            if (this.Continuar) {
                this.ejecutarNodo();
            }
        } else {
            this.Continuar = false;
        }
    }

    public debugear(log: any, errores: any, entorno: Entorno, editor: any) {

        /*
        * Primera pasada para guardar Línea de Etiquetas y Métodos 
        * Verifico algúnos errores semánticos
        */
        let metodo: String = null;
        for (let i = 0; i < this.nodos.length; i++) {
            let nodo = this.nodos[i];

            if (nodo instanceof Label) {
                nodo.i = i;
                nodo.ejecutar(entorno, log, errores);
            }
            else if (nodo instanceof Metodo) {
                if (isNullOrUndefined(metodo)) {
                    nodo.i = i;
                    let id = nodo.ejecutar(entorno, log, errores);

                    if (!isNullOrUndefined(id)) {
                        metodo = id;
                    }
                } else {
                    errores.push({
                        valor: 'Semántico',
                        descripcion: 'No se puede colocar métodos anidados en Cuádruplos.',
                        linea: nodo.linea,
                        columna: nodo.columna
                    });
                    return;
                }
            } else if (nodo instanceof End) {
                if (!isNullOrUndefined(metodo)) {
                    if (!(metodo === nodo.ejecutar(entorno, log, errores))) {
                        errores.push({
                            valor: 'Semántico',
                            descripcion: 'Identificadores  de "Begin" y "End" no coinciden.',
                            linea: nodo.linea,
                            columna: nodo.columna
                        });
                    }
                    metodo = null;
                } else {
                    errores.push({
                        valor: 'Semántico',
                        descripcion: 'No se puede colocar un "End" si no hay un "Begin" antes.',
                        linea: nodo.linea,
                        columna: nodo.columna
                    });
                    return;
                }
            }
        }

        /*
         * Segunda Pasada, ejecutar todo lo que no sea Label y Metodo 
        */
        this.retorna = [];
        this.metodo = null;

        this.Log = log;
        this.Errores = errores;
        this.Entorno = entorno;
        this.Editor = editor;
        this.Continuar = true;
        this.i = 0;
        this.Debugeando = true;
        this.DebugeandoUntilBreakpoint = false;

        if (this.Breakpoints.length > 0) {
            let band = false;

            for (let i = 0; i < this.Breakpoints.length; i++) {
                if (!isNullOrUndefined(this.Breakpoints[i])) {
                    band = true;
                    break;
                }
            }

            if (band) {
                this.DebugeandoUntilBreakpoint = true;
                this.untilBreakpoint();
            } else {
                this.ejecutarNodoDebug();
            }
        } else {
            this.ejecutarNodoDebug();
        }
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    untilBreakpoint() {
        if (this.i < this.nodos.length) {
            let nodo = this.nodos[this.i];

            if (!isNullOrUndefined(this.Breakpoints[nodo.linea])) {
                this.Continuar = false;
                this.DebugeandoUntilBreakpoint = false;
                this.Editor.gotoLine(nodo.linea, 0, true);
                this.Editor.setHighlightActiveLine(true);
                this.Editor.focus();
            }

            if (isNullOrUndefined(this.metodo)) {
                if (!(nodo instanceof Label) && !(nodo instanceof Metodo)) {
                    if (nodo instanceof Call) {
                        let salto = nodo.ejecutar(this.Entorno, this.Log, this.Errores);
                        if (!isNullOrUndefined(salto)) {
                            this.retorna.push(this.i);
                        }
                        this.i = salto;
                    } else if (nodo instanceof End) {
                        this.i = this.retorna.pop();
                    } else if (nodo instanceof Read) {
                        this.Bandera.leerEntrada = true;
                        this.Continuar = false;
                    } else if (!(nodo instanceof Salto) && !(nodo instanceof SaltoCond)) {
                        nodo.ejecutar(this.Entorno, this.Log, this.Errores);
                    } else {
                        let salto = nodo.ejecutar(this.Entorno, this.Log, this.Errores);
                        if (!isNullOrUndefined(salto)) {
                            this.i = salto;
                        }
                    }
                } else {
                    if (nodo instanceof Metodo) {
                        this.metodo = nodo.id;
                    }
                }
            } else {
                if (nodo instanceof End) {
                    this.metodo = null;
                }
            }
            this.i++;
            if (this.Entorno.NullPointer) {
                this.Continuar = false;
                return;
            }

            if (this.Continuar) {
                this.untilBreakpoint();
            }
        } else {

            let nodo = this.nodos[this.i-1];
            this.Editor.gotoLine(nodo.linea, 0, true);
            this.Editor.setHighlightActiveLine(true);
            this.Editor.focus();
            this.Continuar = false;
        }
    }

    async ejecutarNodoDebug() {

        if (this.i < this.nodos.length) {
            let nodo = this.nodos[this.i];

            if (isNullOrUndefined(this.metodo)) {
                if (!(nodo instanceof Label) && !(nodo instanceof Metodo)) {

                    this.Editor.gotoLine(nodo.linea, 0, true);
                    this.Editor.setHighlightActiveLine(true);
                    this.Editor.focus();

                    if (this.Continuar) {
                        await this.delay(this.Tiempo);
                    }

                    if (nodo instanceof Call) {
                        let salto = nodo.ejecutar(this.Entorno, this.Log, this.Errores);
                        if (!isNullOrUndefined(salto)) {
                            this.retorna.push(this.i);
                            this.i = salto;
                        }
                    } else if (nodo instanceof End) {
                        this.i = this.retorna.pop();
                    } else if (nodo instanceof Read) {
                        this.Bandera.leerEntrada = true;
                        this.Continuar = false;
                    } else if (!(nodo instanceof Salto) && !(nodo instanceof SaltoCond)) {
                        nodo.ejecutar(this.Entorno, this.Log, this.Errores);
                    } else {
                        let salto = nodo.ejecutar(this.Entorno, this.Log, this.Errores);
                        if (!isNullOrUndefined(salto)) {
                            this.i = salto;
                        }
                    }
                } else {
                    if (nodo instanceof Metodo) {
                        this.metodo = nodo.id;
                    }
                }
            } else {
                if (nodo instanceof End) {
                    this.metodo = null;
                }
            }
            this.i++;
            if (this.Entorno.NullPointer) {
                this.Continuar = false;
                return;
            }

            if (this.Continuar) {
                this.ejecutarNodoDebug();
            }
        } else {
            let nodo = this.nodos[this.i-1];
            this.Editor.gotoLine(nodo.linea, 0, true);
            this.Editor.setHighlightActiveLine(true);
            this.Editor.focus();
            this.Continuar = false;
        }
    }
}