import { Component, OnInit, ViewChild, ElementRef, Input, ɵConsole } from '@angular/core';
import { FileInterface } from '../../models/file.interface';
import { ErrorInterface } from '../../models/error.interface';

import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-terminal'
import 'ace-builds/src-noconflict/mode-text';
import { SocketService } from 'src/app/services/socket/socket.service';
import { ContenidoInterface } from 'src/app/models/contenido.interface';
import { isNullOrUndefined } from 'util';
import { Entorno } from 'src/app/parser/cuadruplos/ast/entorno/entorno';
import { Simbolo, Tipo } from 'src/app/parser/cuadruplos/ast/entorno/simbolo.interface';
import { AST } from 'src/app/parser/cuadruplos/ast/ast';
import { SimboloInterface } from 'src/app/models/simbolo.interface';
import { BanderaInterface } from 'src/app/models/bandera.interface';

const THEME = 'ace/theme/github';
const LANG = 'ace/mode/java';

const parserCuadruplos = require('../../parser/cuadruplos/parserCuadruplos');

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @Input('file') file: FileInterface;

  @Input('files') files: FileInterface[];

  @ViewChild('codeEditor', { static: true }) codeEditorElmRef: ElementRef;
  private codeEditor: ace.Ace.Editor;

  @ViewChild('codeEditor3d', { static: true }) codeEditorElmRef3d: ElementRef;
  private codeEditor3d: ace.Ace.Editor;

  @ViewChild('consolaEditor', { static: true }) consolaEditorElmRef: ElementRef;
  private consolaEditor: ace.Ace.Editor;

  constructor(private socket: SocketService) { }

  ngOnInit() {
    const element = this.codeEditorElmRef.nativeElement;
    const editorOptions: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: true,
      minLines: 25,
      maxLines: 25,
      fontSize: 15
    };

    this.codeEditor = ace.edit(element, editorOptions);
    this.codeEditor.setTheme(THEME);
    this.codeEditor.getSession().setMode(LANG);
    this.codeEditor.setShowFoldWidgets(true); // for the scope fold feature
    this.codeEditor.setValue(this.file.content);
    this.codeEditor.navigateLineEnd();

    this.codeEditor.addEventListener("change", () => {
      this.file.content = this.codeEditor.getValue();
    });

    const element3d = this.codeEditorElmRef3d.nativeElement;
    const editorOptions3d: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: true,
      minLines: 25,
      maxLines: 25,
      fontSize: 15
    };

    this.codeEditor3d = ace.edit(element3d, editorOptions3d);
    this.codeEditor3d.setTheme(THEME);
    this.codeEditor3d.getSession().setMode(LANG);
    this.codeEditor3d.setShowFoldWidgets(true);

    this.codeEditor3d.addEventListener("guttermousedown", (e) => {
      var target = e.domEvent.target;

      if (target.className.indexOf("ace_gutter-cell") == -1) {
        return;
      }

      var breakpoints = e.editor.session.getBreakpoints(row, 0);

      var row = e.getDocumentPosition().row;

      if (isNullOrUndefined(breakpoints[row])) {
        e.editor.session.setBreakpoint(row);
        this.breakpoints[row + 1] = 1;
      } else {
        e.editor.session.clearBreakpoint(row);
        this.breakpoints[row + 1] = null;
      }

      //console.log("entra " + row)
      e.stop();
    });

    const elementConsola = this.consolaEditorElmRef.nativeElement;
    const editorOptionsConsola: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: false,
      minLines: 15,
      maxLines: 15,
      fontSize: 15,
      readOnly: true
    };

    this.consolaEditor = ace.edit(elementConsola, editorOptionsConsola);
    this.consolaEditor.setTheme('ace/theme/terminal');
    this.consolaEditor.getSession().setMode('ace/mode/text');
    this.consolaEditor.setShowFoldWidgets(true);

  }


  error = '';
  mensaje = '';
  error2 = '';
  mensaje2 = '';
  error3 = '';

  lectura: String;
  bandera: BanderaInterface = {
    leerEntrada: false
  };

  errorEditor: ErrorInterface[] = [];
  errorEjecucion: ErrorInterface[] = [];
  simbolos: SimboloInterface[] = [];

  reportes: FileInterface[] = [];

  contenido: ContenidoInterface;

  breakpoints: number[] = [];

  stack: Simbolo = { id: "heap", valor: [], tipo: Tipo.ARREGLO };
  heap: Simbolo = { id: "heap", valor: [], tipo: Tipo.ARREGLO };
  P: Simbolo = { id: "p", valor: 0, tipo: Tipo.ENTERO };
  H: Simbolo = { id: "h", valor: 0, tipo: Tipo.ENTERO };

  AST: AST;

  Tiempo: number = 3;

  onGuardar() {
    //console.log(this.codeEditor.getValue());
    var blob = new Blob([this.codeEditor.getValue()], { type: 'text/plain' });
    var url = window.URL.createObjectURL(blob);

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', url);
    linkElement.setAttribute("download", this.file.name);

    var clickEvent = new MouseEvent("click", {
      "view": window,
      "bubbles": true,
      "cancelable": false
    });

    linkElement.dispatchEvent(clickEvent);
  }

  deleteReporte(pos: number) {
    this.reportes.splice(pos, 1);
  }

  generarTabla(val: string, filename: string, reporte: FileInterface) {
    let id = filename + "reporte_" + this.reportes.indexOf(reporte);
    let doc = document.getElementById(id);
    doc.innerHTML = val;
  }

  onCompilar() {
    this.error = '';
    this.mensaje = '';
    this.file.main = true;

    this.error2 = '';
    this.mensaje2 = '';
    
    this.error3 = '';
    this.bandera.leerEntrada = false;

    this.consolaEditor.setValue('');
    this.consolaEditor.gotoLine(1, 0, false);

    this.socket.traducir(this.files)
      .subscribe(
        (contenido: ContenidoInterface) => {
          this.contenido = contenido;
          this.codeEditor3d.setValue(this.contenido.content.toString());
          this.codeEditor3d.navigateLineEnd();

          this.errorEditor = contenido.errors;
          this.simbolos = contenido.table;
        },
        (error) => {
          this.error = "Error de conexión, inténtelo nuevamente.";
          console.log(error);
        }
      );
    //console.log("archivos->"+this.files);

    this.file.main = false;
  }

  onEjecutar() {
    if (this.AST) {
      if (this.AST.Continuar) {
        return;
      }
    }

    this.error2 = '';
    this.mensaje2 = '';

    this.error3 = '';
    this.bandera.leerEntrada = false;

    this.errorEjecucion = [];
    this.consolaEditor.setValue('');
    this.consolaEditor.gotoLine(1, 0, false);
    //verificar que no esté vacío.
    //let ast = parserCuadruplos.parse(this.codeEditor3d.getValue());
    this.AST = parserCuadruplos.parse(this.codeEditor3d.getValue());
    
    if (this.AST) { 
      let entorno = new Entorno();

      this.P = { id: "p", valor: 0, tipo: Tipo.ENTERO };
      this.H = { id: "h", valor: 0, tipo: Tipo.ENTERO };
      this.stack = { id: "stack", valor: [], tipo: Tipo.ARREGLO };
      this.heap = { id: "heap", valor: [], tipo: Tipo.ARREGLO };

      entorno.addSimbolo(this.P);
      entorno.addSimbolo(this.H);
      entorno.addSimbolo(this.stack);
      entorno.addSimbolo(this.heap);

      this.AST.Bandera = this.bandera;

      this.AST.ejecutar(this.consolaEditor, this.errorEjecucion, entorno, this.codeEditor3d);//borre asignacion a 147
    } else {
      this.error2 = 'Archivo con errores.';
    }

  }

  async onDepurar() {

    if (this.AST) {
      if (this.AST.Continuar) {
        return;
      }
    }

    this.error2 = '';
    this.mensaje2 = '';
    this.codeEditor3d.setReadOnly(true);

    this.errorEjecucion = [];
    this.consolaEditor.setValue('');
    this.consolaEditor.gotoLine(1, 0, false);

    this.AST = parserCuadruplos.parse(this.codeEditor3d.getValue());
    //ast.ejecutar(this.consolaEditor, this.errorEditor);
    if (this.AST) {
      let entorno = new Entorno();

      this.P = { id: "p", valor: 0, tipo: Tipo.ENTERO };
      this.H = { id: "h", valor: 0, tipo: Tipo.ENTERO };
      this.stack = { id: "stack", valor: [], tipo: Tipo.ARREGLO };
      this.heap = { id: "heap", valor: [], tipo: Tipo.ARREGLO };

      entorno.addSimbolo(this.P);
      entorno.addSimbolo(this.H);
      entorno.addSimbolo(this.stack);
      entorno.addSimbolo(this.heap);

      this.AST.Bandera = this.bandera;

      this.AST.Tiempo = 400 / this.Tiempo;
      this.AST.Breakpoints = this.breakpoints;
      this.AST.debugear(this.consolaEditor, this.errorEjecucion, entorno, this.codeEditor3d);
    }

    this.codeEditor3d.setReadOnly(false);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onPausa() {
    if (this.AST) {
      if (this.AST.Debugeando) {
        this.AST.Continuar = false;
      }
    }
  }

  onContinuar() {
    if (this.AST) {
      if (!this.AST.Continuar && this.AST.Debugeando) {
        if (!this.bandera.leerEntrada) {
          this.AST.Continuar = true;
          this.AST.ejecutarNodoDebug();
        }
      }
    }
  }

  onSiguiente() {
    if (this.AST) {
      if (!this.AST.Continuar && this.AST.Debugeando) {
        if (!this.bandera.leerEntrada) {
          this.AST.Continuar = false;
          this.AST.ejecutarNodoDebug();
        }
      }
    }
  }

  onRango() {
    if (this.AST) {
      this.AST.Tiempo = 400 / this.Tiempo;
    }
  }

  onSiguienteBreakpoint() {
    if (this.AST) {
      if (this.AST.Debugeando) {
        if (!this.bandera.leerEntrada) {
          this.AST.Continuar = true;
          this.AST.DebugeandoUntilBreakpoint = true;
          this.AST.untilBreakpoint();
        }
      }
    }
  }

  onLectura() {
    this.error3 = '';
    if (!isNullOrUndefined(this.lectura)) {
      if (this.lectura.length != 0) {

        let tipo = this.P.valor + 3;
        tipo = this.stack.valor[tipo];

        let struct = this.P.valor + 4;
        struct = this.stack.valor[struct];

        let direccion = this.P.valor + 1;
        direccion = this.stack.valor[direccion];

        let direccionVal = this.P.valor + 2;

        let valor;
        let correcto = false;

        if (tipo == 0) { //si se espera un char
          if (this.lectura.length == 1) {
            valor = this.lectura.charCodeAt(0);
            correcto = true;
          } else {
            this.error3 = 'Se espera un Char, inténtelo nuevamente.';
          }
        } else if (tipo == 1) { //integer
          if(!isNaN(Number(this.lectura))){
            valor = Number(this.lectura);
            if(valor % 1 == 0){
              correcto = true;
            } else {
              this.error3 = 'Se espera un Integer, inténtelo nuevamente.';
            }
          } else if(this.lectura.length == 1){
            valor = this.lectura.charCodeAt(0);
            correcto = true;
          } else {
            this.error3 = 'Se espera un Integer, inténtelo nuevamente.';
          }
        } else if(tipo == 2) { //real
          if(!isNaN(Number(this.lectura))){
            valor = Number(this.lectura);
            correcto = true;
          } else if(this.lectura.length == 1){
            valor = this.lectura.charCodeAt(0);
            correcto = true;
          } else {
            this.error3 = 'Se espera un Real, inténtelo nuevamente.';
          }
        } else if(tipo == 3) { //cadena
          valor = this.H.valor;

          for(let i = 0; i<this.lectura.length; i ++){
            this.heap.valor[this.H.valor] = this.lectura.charCodeAt(i);
            this.H.valor = this.H.valor+1;
          }
          this.heap.valor[this.H.valor] = 0;
          this.H.valor = this.H.valor+1;
          correcto = true;
        } else if(tipo == 4){ //boolean
          if(!isNaN(Number(this.lectura))){
            if(Number(this.lectura) == 1){
              valor = 1;
              correcto = true;
            } else if(Number(this.lectura) == 0){
              valor = 0;
              correcto = true;
            } else {
              this.error3 = 'Se espera un Boolean, inténtelo nuevamente.';
            }
          } else {
            if(this.lectura.toLowerCase() == 'true'){
              valor = 1;
              correcto = true;
            } else if(this.lectura.toLowerCase() == 'false'){
              valor = 0;
              correcto = true;
            } else {
              this.error3 = 'Se espera un Boolean, inténtelo nuevamente.';
            }
          }
        }

        if (correcto) {
          this.lectura = '';
          this.stack.valor[direccionVal] = valor;
          if (struct == 0) {
            this.stack.valor[direccion] = valor;
          } else {
            this.heap.valor[direccion] = valor;
          }

          this.AST.Continuar = true;
          this.AST.Bandera.leerEntrada = false;

          if (this.AST.Debugeando) {
            if (this.AST.DebugeandoUntilBreakpoint) {
              this.AST.untilBreakpoint();
            } else {
              this.AST.ejecutarNodoDebug();
            }
          } else {
            this.AST.ejecutarNodo();
          }
        }
      } else {
        this.error3 = 'Se debe ingresar un valor.';
      }
    } else {
      this.error3 = 'Se debe ingresar un valor.';
    }
  }

}
