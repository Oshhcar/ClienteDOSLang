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
import { Tipo } from './entorno/simbolo.interface';

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

        while (this.i < this.nodos.length) {
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
                break;
            }

            if (!this.Continuar) {
                break;
            }
        }
        this.Continuar = false;
    }
    /*
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
        }*/

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
        while (this.i < this.nodos.length) {
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
                break;
            }

            if (!this.Continuar) {
                break;
            }
        }

        if (this.i >= this.nodos.length) {
            let nodo = this.nodos[this.i - 2];
            this.Editor.gotoLine(nodo.linea, 0, true);
            this.Editor.setHighlightActiveLine(true);
            this.Editor.focus();
            this.Continuar = false;
        }
    }

    async ejecutarNodoDebug() {

        while (this.i < this.nodos.length) {
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
                break;
            }

            if (!this.Continuar) {
                break;
            }
        }

        if (this.i >= this.nodos.length) {
            let nodo = this.nodos[this.i - 2];
            this.Editor.gotoLine(nodo.linea, 0, true);
            this.Editor.setHighlightActiveLine(true);
            this.Editor.focus();
            this.Continuar = false;
        }

    }

    public traducir(entorno: Entorno, errores: any): string {
        let codigo: string;

        let inicio;
        inicio = ".model small\n";
        inicio += "Pila SEGMENT STACK 'STACK'\n";
        inicio += "DB   4e20h   DUP(?)\n";
        inicio += "Pila ENDS\n"

        codigo = ".code\n\n";
        codigo += ".startup\n";
        codigo += "mov  ax, @data\n";
        codigo += "mov  ds, ax\n\n";

        let bandera = false;

        for (let i = 0; i < this.nodos.length; i++) {
            let nodo = this.nodos[i];

            if (nodo instanceof Metodo) {
                if (!bandera) {
                    bandera = true;
                    codigo += "mov  ah, 4ch\n";
                    codigo += "int  21h\n\n";
                    codigo += "ret\n\n"
                }
            }

            codigo += nodo.traducir(entorno, errores);
        }

        if (!bandera) {
            codigo += "mov  ah, 4ch\n";
            codigo += "int  21h\n\n";
            codigo += "ret\n\n"
        }

        /**
         * Código para imprimir
        */

        codigo += "print_char   proc\n";
        codigo += "push  ax\n";
        codigo += "mov  ah, 0Eh\n";
        codigo += "int  10h\n";
        codigo += "pop  ax\n";
        codigo += "ret\n"
        codigo += "print_char   endp\n\n";

        codigo += "print_num    proc near\n";
        codigo += "push  dx\n";
        codigo += "push  ax\n";
        codigo += "cmp  ax, 0\n";
        codigo += "jnz  no_cero\n";
        codigo += "mov  ax, 48\n";
        codigo += "call print_char\n";
        codigo += "jmp  salida\n";

        codigo += "no_cero:\n";
        codigo += "cmp  ax, 0\n";
        codigo += "jns  positivo\n";
        codigo += "neg  ax\n";
        codigo += "push ax\n";
        codigo += "mov  ax, 45\n";
        codigo += "call print_char\n";
        codigo += "pop  ax\n";
        codigo += "positivo:\n";
        codigo += "call print_num_uns\n";
        codigo += "salida:\n";
        codigo += "pop  ax\n";
        codigo += "pop  dx\n";
        codigo += "ret\n";
        codigo += "print_num    endp\n\n";

        codigo += "print_num_uns    proc near\n";
        codigo += "push  ax\n";
        codigo += "push  bx\n";
        codigo += "push  cx\n";
        codigo += "push  dx\n";
        codigo += "mov  cx, 1\n";
        codigo += "mov  bx, 10000\n";
        codigo += "cmp  ax, 0\n";
        codigo += "jz   print_cero\n";
        codigo += "inicia_print:\n";
        codigo += "cmp  bx, 0\n";
        codigo += "jz   end_print\n";
        codigo += "cmp  cx, 0\n";
        codigo += "je   calc\n";
        codigo += "cmp ax, bx\n";
        codigo += "jb   skip\n";
        codigo += "calc:\n";
        codigo += "mov  cx, 0\n";
        codigo += "mov  dx, 0\n";
        codigo += "div  bx\n";
        codigo += "add  al, 30h\n";
        codigo += "call print_char\n";
        codigo += "mov  ax, dx\n";
        codigo += "skip:\n";
        codigo += "push  ax\n";
        codigo += "mov  dx, 0\n";
        codigo += "mov  ax, bx\n";
        codigo += "div  ten\n";
        codigo += "mov  bx, ax\n";
        codigo += "pop  ax\n";
        codigo += "jmp  inicia_print\n";
        codigo += "print_cero:\n";
        codigo += "mov  ax, 48\n";
        codigo += "call print_char\n";
        codigo += "end_print:\n";
        codigo += "pop  dx\n";
        codigo += "pop  cx\n";
        codigo += "pop  bx\n";
        codigo += "pop  ax\n";
        codigo += "ret\n";
        codigo += "print_num_uns    endp\n\n";

        codigo += "scan_num     proc\n";
        codigo += "push  dx\n";
        codigo += "push  ax\n";
        codigo += "push  si\n";
        codigo += "mov  cx, 0\n";
        codigo += "mov  make_minus, 0\n";
        codigo += "next_digit:\n";
        codigo += "mov  ah, 00h\n";
        codigo += "int  16h\n";
        codigo += "mov  ah, 0Eh\n";
        codigo += "int  10h\n";
        codigo += "cmp  al, '-'\n";
        codigo += "je   set_minus\n";
        codigo += "cmp  al, 0Dh\n";
        codigo += "jne  not_cr\n";
        codigo += "jmp  stop_input\n";
        codigo += "not_cr:\n";
        codigo += "cmp  al, 8\n";
        codigo += "jne  backspace_checked\n";
        codigo += "mov  dx, 0\n";
        codigo += "mov  ax, cx\n";
        codigo += "div  ten\n";
        codigo += "mov  cx, ax\n";
        codigo += "mov  ax, 32\n";
        codigo += "call print_char\n";
        codigo += "mov  ax, 8\n";
        codigo += "call print_char\n";
        codigo += "jmp  next_digit\n";
        codigo += "backspace_checked:\n";
        codigo += "cmp  al, '0'\n";
        codigo += "jae  ok_AE_0\n";
        codigo += "jmp  remove_not_digit\n";
        codigo += "ok_AE_0:\n";
        codigo += "cmp  al, '9'\n";
        codigo += "jbe  ok_digit\n";
        codigo += "remove_not_digit:\n";
        codigo += "mov  ax, 8\n";
        codigo += "call  print_char\n";
        codigo += "mov  ax, 32\n";
        codigo += "call print_char\n";
        codigo += "mov  ax, 8\n";
        codigo += "call  print_char\n";
        codigo += "jmp  next_digit\n";
        codigo += "ok_digit:\n";
        codigo += "push  ax\n";
        codigo += "mov  ax, cx\n";
        codigo += "mul  ten\n";
        codigo += "mov  cx, ax\n";
        codigo += "pop  ax\n";
        codigo += "cmp  dx, 0\n";
        codigo += "jne  too_big\n";
        codigo += "sub  al, 30h\n";
        codigo += "mov  ah, 0\n";
        codigo += "mov  dx, cx\n";
        codigo += "add  cx, ax\n";
        codigo += "jc   too_big2\n";
        codigo += "jmp  next_digit\n";
        codigo += "set_minus:\n";
        codigo += "mov  make_minus, 1\n";
        codigo += "jmp  next_digit\n";
        codigo += "too_big2:\n";
        codigo += "mov  cx, dx\n";
        codigo += "mov  dx, 0\n";
        codigo += "too_big:\n";
        codigo += "mov  ax, cx\n";
        codigo += "div  ten\n";
        codigo += "mov  cx, ax\n";
        codigo += "mov  ax, 8\n";
        codigo += "call  print_char\n";
        codigo += "mov  ax, 32\n";
        codigo += "call  print_char\n";
        codigo += "mov  ax, 8\n";
        codigo += "call  print_char\n";
        codigo += "jmp  next_digit\n";
        codigo += "stop_input:\n";
        codigo += "cmp  make_minus, 0\n";
        codigo += "je   not_minus\n";
        codigo += "neg  cx\n";
        codigo += "not_minus:\n";
        codigo += "mov  ax, 10\n";
        codigo += "call  print_char\n";
        codigo += "mov  ax, 13\n";
        codigo += "call  print_char\n";
        codigo += "pop  si\n";
        codigo += "pop  ax\n";
        codigo += "pop  dx\n";
        codigo += "ret\n";
        codigo += "scan_num     endp\n\n";

        codigo += "read_num     proc\n";
        codigo += "mov  ax, p\n";
        codigo += "add  ax, 3\n"; //Posicion del tipo
        codigo += "mov  tmp, 2\n";
        codigo += "mul  tmp\n"; 
        codigo += "mov  bx, ax\n";  //indice real tipo
        codigo += "mov  ax, stack[bx]\n"; //valor tipo
        codigo += "cmp  ax, 1\n";
        codigo += "jne  salida_read\n";

        codigo += "call  scan_num\n";

        codigo += "mov  ax, p\n";
        codigo += "add  ax, 2\n";
        codigo += "mov  tmp, 2\n";
        codigo += "mul  tmp\n";
        codigo += "mov  bx, ax\n"; //indice del valor
        codigo += "mov  stack[bx], cx\n";

        codigo += "mov  ax, p\n";
        codigo += "add  ax, 4\n"; //struct o heap
        codigo += "mov  tmp, 2\n";
        codigo += "mul  tmp\n";
        codigo += "mov  bx, ax\n";
        codigo += "mov  ax, stack[bx]\n";
        codigo += "cmp  ax, 0\n";
        codigo += "jne  asigna_heap\n";

        codigo += "mov  ax, p\n";
        codigo += "add  ax, 1\n"; //direccion valor
        codigo += "mov  tmp, 2\n";
        codigo += "mul  tmp\n";
        codigo += "mov  bx, ax\n";
        codigo += "mov  ax, stack[bx]\n";

        codigo += "mov  tmp, 2\n";
        codigo += "mul  tmp\n";
        codigo += "mov  bx, ax\n";
        codigo += "mov  stack[bx], cx\n";

        codigo += "jmp  salida_read\n";

        codigo += "asigna_heap:\n";
        codigo += "mov  ax, p\n";
        codigo += "add  ax, 1\n"; //direccion valor
        codigo += "mov  tmp, 2\n";
        codigo += "mul  tmp\n";
        codigo += "mov  bx, ax\n";
        codigo += "mov  ax, stack[bx]\n";

        codigo += "mov  tmp, 2\n";
        codigo += "mul  tmp\n";
        codigo += "mov  bx, ax\n";
        codigo += "mov  heap[bx], cx\n";


        codigo += "salida_read:\n";
        codigo += "ret\n";
        codigo += "read_num     endp\n\n";

        codigo += "modulo_num   proc\n";
        codigo += "cmp  ax, dx\n";
        codigo += "je   equals\n";
        codigo += "jl   sale\n";
        codigo += "restar:\n";
        codigo += "sub  ax, dx\n";
        codigo += "cmp  ax, dx\n";
        codigo += "jge  restar\n";
        codigo += "jmp  sale\n";
        codigo += "equals:\n";
        codigo += "mov  ax, 0\n";
        codigo += "sale:\n";
        codigo += "ret\n";
        codigo += "modulo_num   endp\n\n";

        codigo += "dividir_num  proc\n";
        codigo += "mov  cx, 0\n";
        codigo += "cmp  ax, dx\n";
        codigo += "je   iguales\n";
        codigo += "jl   retorna\n";
        codigo += "comparar:\n";
        codigo += "inc  cx\n";
        codigo += "sub  ax, dx\n";
        codigo += "cmp  ax, dx\n";
        codigo += "je   iguales\n";
        codigo += "jl   retorna\n";
        codigo += "jmp  comparar\n";
        codigo += "iguales:\n";
        codigo += "inc  cx\n";
        codigo += "retorna:\n";
        codigo += "ret\n";
        codigo += "dividir_num  endp\n\n";

        /**
         * Segmento dato
        */
        let dato;
        dato = ".data\n";
        //codigo += "P         dw 0\n";
        //codigo += "H         dw 0\n";
        dato += "ten            dw  10\n";
        dato += "make_minus     db  ?\n";

        for (let i = 0; i < entorno.Simbolos.length; i++) {
            let sim = entorno.Simbolos[i];

            if (sim.tipo == Tipo.DECIMAL || sim.tipo == Tipo.ENTERO) {
                dato += sim.id + "      dw 0\n";
            }
        }

        dato += "stack     dw 5000 DUP(-1)\n";
        dato += "heap      dw 5000 DUP(-1)\n\n";

        codigo = inicio + dato + codigo + "end\n";
        return codigo;
    }
}