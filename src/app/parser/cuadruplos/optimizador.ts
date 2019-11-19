import { Optimizado } from 'src/app/models/optimizado.interface';

export class Optimizador {

    constructor(public Contenido: string,
        public Optimizado: Optimizado[]) { }

    public Optimizar(): string {
        return this.TerceraPasada(this.SegundaPasada(this.PrimeraPadada(this.Contenido)));
    }

    private PrimeraPadada(Contenido: string): string {
        let codigo = "";
        let lineas = Contenido.split("\n");
        let j = 1;

        let anterior = "";
        let tipAnt = 0;

        for (let z = 0; z < lineas.length; z++) {
            let l = lineas[z];
            let linea = l;

            if (l.length > 0) {
                if (l.includes('+')) {
                    let op = l.split(',');
                    let opDer = op[3].trim();

                    let op1 = op[1].trim();
                    let op2 = op[2].trim();

                    if (op1 === "0") {
                        if (opDer === op2) {
                            linea = "";
                            this.Optimizado.push({ expresion: l, resultado: "", fila: j, regla: 6 });
                        } else {
                            linea = "=, " + op2 + ", , " + opDer;
                            this.Optimizado.push({ expresion: l, resultado: linea, fila: j, regla: 10 });
                        }
                    } else if (op2 === "0") {
                        if (opDer === op1) {
                            linea = "";
                            this.Optimizado.push({ expresion: l, resultado: "", fila: j, regla: 6 });
                        } else {
                            linea = "=, " + op1 + ", , " + opDer;
                            this.Optimizado.push({ expresion: l, resultado: linea, fila: j, regla: 10 });
                        }
                    }
                    tipAnt = 2;
                } else if (l.includes('-')) {
                    let op = l.split(',');
                    let opDer = op[3].trim();

                    let op1 = op[1].trim();
                    let op2 = op[2].trim();

                    if (op2 === "0") {
                        if (opDer === op1) {
                            linea = "";
                            this.Optimizado.push({ expresion: l, resultado: "", fila: j, regla: 7 });
                        } else {
                            linea = "=, " + op1 + ", , " + opDer;
                            this.Optimizado.push({ expresion: l, resultado: linea, fila: j, regla: 11 });
                        }
                    }

                    tipAnt = 2;
                } else if (l.includes('*')) {
                    let op = l.split(',');
                    let opDer = op[3].trim();

                    let op1 = op[1].trim();
                    let op2 = op[2].trim();

                    if (op1 === "1") {
                        if (opDer === op2) {
                            linea = "";
                            this.Optimizado.push({ expresion: l, resultado: "", fila: j, regla: 8 });
                        } else {
                            linea = "=, " + op2 + ", , " + opDer;
                            this.Optimizado.push({ expresion: l, resultado: linea, fila: j, regla: 12 });
                        }
                    } else if (op2 === "1") {
                        if (opDer === op1) {
                            linea = "";
                            this.Optimizado.push({ expresion: l, resultado: "", fila: j, regla: 8 });
                        } else {
                            linea = "=, " + op1 + ", , " + opDer;
                            this.Optimizado.push({ expresion: l, resultado: linea, fila: j, regla: 12 });
                        }
                    } else if (op1 === "2") {
                        linea = "+, " + op2 + ", " + op2 + ", " + opDer;
                        this.Optimizado.push({ expresion: l, resultado: linea, fila: j, regla: 14 });
                    } else if (op2 === "2") {
                        linea = "+, " + op1 + ", " + op1 + ", " + opDer;
                        this.Optimizado.push({ expresion: l, resultado: linea, fila: j, regla: 14 });
                    } else if (op1 === "0" || op2 === "0") {
                        linea = "=, 0, , " + opDer;
                        this.Optimizado.push({ expresion: l, resultado: linea, fila: j, regla: 15 });
                    }

                    tipAnt = 2;
                } else if (l.includes('/')) {
                    let op = l.split(',');
                    let opDer = op[3].trim();

                    let op1 = op[1].trim();
                    let op2 = op[2].trim();

                    if (op2 === "1") {
                        if (opDer === op1) {
                            linea = "";
                            this.Optimizado.push({ expresion: l, resultado: "", fila: j, regla: 9 });
                        } else {
                            linea = "=, " + op1 + ", , " + opDer;
                            this.Optimizado.push({ expresion: l, resultado: linea, fila: j, regla: 13 });
                        }
                    } else if (op1 === "0") {
                        linea = "=, 0, , " + opDer;
                        this.Optimizado.push({ expresion: l, resultado: linea, fila: j, regla: 16 });
                    }
                    tipAnt = 2;
                } else if (l.includes('%')) {
                    tipAnt = 2;
                } else if (l.includes('=')) {
                    if (anterior.length > 0) {
                        if (tipAnt == 3) {
                            let op = l.split(',');
                            let opDer = op[3].trim();

                            let op1 = op[1].trim();
                            let op2 = op[2].trim();

                            let opAnt = anterior.split(',');
                            let opDerAnt = opAnt[3].trim();

                            let op1Ant = opAnt[1].trim();
                            let op2Ant = opAnt[2].trim();

                            if (op2.length == 0 && op2Ant.length == 0) {
                                if (op1 === opDerAnt) {
                                    if (opDer === op1Ant) {
                                        //anterior = l;
                                        linea = "";
                                        this.Optimizado.push({ expresion: l, resultado: "", fila: j, regla: 1 });
                                    }
                                }
                            }

                        }
                    }
                    tipAnt = 3;
                } else {
                    /*otra instrucción*/
                    tipAnt = 4;
                }
            } else {
                /*salto*/
                //codigo += "\n";
            }

            if (anterior.length > 0) {
                codigo += anterior + "\n";
            }
            j++;
            anterior = linea;
        }

        if (anterior.length > 0) {
            codigo += anterior + "\n";
        }

        return codigo;
    }

    private SegundaPasada(Contenido: string): string {
        let codigo = "";
        let num = new RegExp('^[0-9]+$')

        let lineas = Contenido.split("\n");
        let i = 1;
        let delSalto = false;
        let lineaAnt = "";

        for (let j = 0; j < lineas.length; j++) {
            let l = lineas[j];
            let linea = l;

            if (l.includes("je")) {
                delSalto = false;

                let instr = l.split(',');

                let op1 = instr[1].trim();
                let op2 = instr[2].trim();
                let etq = instr[3].trim();

                if (num.test(op1) && num.test(op2)) {
                    if (Number(op1) == Number(op2)) {
                        linea = "jmp, , , " + etq;
                        delSalto = true;
                        this.Optimizado.push({ expresion: l, resultado: linea, fila: j, regla: 4 });
                    } else {
                        linea = "";
                        this.Optimizado.push({ expresion: l, resultado: "", fila: j, regla: 5 });
                    }
                }

            } else if (l.includes("jne")) {
                delSalto = false;

                let instr = l.split(',');

                let op1 = instr[1].trim();
                let op2 = instr[2].trim();
                let etq = instr[3].trim();

                if (num.test(op1) && num.test(op2)) {
                    if (Number(op1) != Number(op2)) {
                        linea = "jmp, , , " + etq;
                        delSalto = true;
                        this.Optimizado.push({ expresion: l, resultado: linea, fila: j, regla: 4 });
                    } else {
                        linea = "";
                        this.Optimizado.push({ expresion: l, resultado: "", fila: j, regla: 5 });
                    }
                }

            } else if (l.includes("jge")) {
                delSalto = false;

                let instr = l.split(',');

                let op1 = instr[1].trim();
                let op2 = instr[2].trim();
                let etq = instr[3].trim();

                if (num.test(op1) && num.test(op2)) {
                    if (Number(op1) >= Number(op2)) {
                        linea = "jmp, , , " + etq;
                        delSalto = true;
                        this.Optimizado.push({ expresion: l, resultado: linea, fila: j, regla: 4 });
                    } else {
                        linea = "";
                        this.Optimizado.push({ expresion: l, resultado: "", fila: j, regla: 5 });
                    }
                }

            } else if (l.includes("jle")) {
                delSalto = false;

                let instr = l.split(',');

                let op1 = instr[1].trim();
                let op2 = instr[2].trim();
                let etq = instr[3].trim();

                if (num.test(op1) && num.test(op2)) {
                    if (Number(op1) <= Number(op2)) {
                        linea = "jmp, , , " + etq;
                        delSalto = true;
                        this.Optimizado.push({ expresion: l, resultado: linea, fila: j, regla: 4 });
                    } else {
                        linea = "";
                        this.Optimizado.push({ expresion: l, resultado: "", fila: j, regla: 5 });
                    }
                }

            } else if (l.includes("jg")) {
                delSalto = false;

                let instr = l.split(',');

                let op1 = instr[1].trim();
                let op2 = instr[2].trim();
                let etq = instr[3].trim();

                if (num.test(op1) && num.test(op2)) {
                    if (Number(op1) > Number(op2)) {
                        linea = "jmp, , , " + etq;
                        delSalto = true;
                        this.Optimizado.push({ expresion: l, resultado: linea, fila: j, regla: 4 });
                    } else {
                        linea = "";
                        this.Optimizado.push({ expresion: l, resultado: "", fila: j, regla: 5 });
                    }
                }

            } else if (l.includes("jl")) {
                delSalto = false;

                let instr = l.split(',');

                let op1 = instr[1].trim();
                let op2 = instr[2].trim();
                let etq = instr[3].trim();

                if (num.test(op1) && num.test(op2)) {
                    if (Number(op1) < Number(op2)) {
                        linea = "jmp, , , " + etq;
                        delSalto = true;
                        this.Optimizado.push({ expresion: l, resultado: linea, fila: j, regla: 4 });
                    } else {
                        linea = "";
                        this.Optimizado.push({ expresion: l, resultado: "", fila: j, regla: 5 });
                    }
                }

            } else if (l.includes("jmp")) {
                if (delSalto) {
                    linea = "";
                }
            } else {
                delSalto = false;
            }

            if (lineaAnt.length > 0) {
                codigo += lineaAnt + "\n";
            }
            i++;
            lineaAnt = linea;
        }

        if (lineaAnt.length > 0) {
            codigo += lineaAnt + "\n";
        }

        return codigo;
    }

    private TerceraPasada(Contenido: string): string {
        let codigo = "";

        let lineas = Contenido.split('\n');
        let i = 0;
        let etqSalto = "";
        let codEntreEtq = "";

        for(let j = 0; j < lineas.length; j++){
            let l = lineas[j];

            if(l.includes("jmp")){
                let instr = l.split(',');
                let etq = instr[3].trim();

                if(etqSalto.length == 0){
                    etqSalto = etq;
                }
            } else if(l.includes(':')){
                let etq = l.split(':').join('').trim();

                if(etqSalto.length > 0){
                    if(etq === etqSalto){
                        etqSalto = "";
                        codEntreEtq = "";
                        this.Optimizado.push({expresion: "jmp, , , " + etq, resultado: l, fila: i, regla: 2});
                    } else {
                        etqSalto = "";
                        codigo += codEntreEtq;
                        codEntreEtq = "";
                    }
                }
            }

            if(etqSalto.length == 0){
                codigo += l + "\n";
            } else {
                codEntreEtq += l + "\n";
            }
            i++;
        }

        return codigo;
    }

    
}