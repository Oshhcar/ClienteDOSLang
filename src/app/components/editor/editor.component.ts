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

    this.codeEditor3d.addEventListener("guttermousedown", (e)=>{
      var target = e.domEvent.target;

      if (target.className.indexOf("ace_gutter-cell") == -1) {
        return;
      }
      
      var breakpoints = e.editor.session.getBreakpoints(row, 0);
      
      var row = e.getDocumentPosition().row;
      
      if(isNullOrUndefined(breakpoints[row])){
        e.editor.session.setBreakpoint(row);
        this.breakpoints[row+1] = 1;
      } else {
        e.editor.session.clearBreakpoint(row);
        this.breakpoints[row+1] = null;
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

  errorEditor: ErrorInterface[] = [];
  errorEjecucion: ErrorInterface[] = [];
  simbolos: SimboloInterface[] = [];

  reportes: FileInterface[] = [];

  contenido: ContenidoInterface;

  breakpoints: number[] = [];

  stack: Simbolo = {id: "heap", valor: [], tipo: Tipo.ARREGLO};
  heap: Simbolo = {id: "heap", valor: [], tipo: Tipo.ARREGLO};
  P: Simbolo = {id: "p", valor: 0, tipo: Tipo.ENTERO};
  H: Simbolo = {id: "h", valor: 0, tipo: Tipo.ENTERO};

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
    this.error2 = '';
    this.mensaje2 = '';

    this.errorEjecucion = [];
    this.consolaEditor.setValue('');
    this.consolaEditor.gotoLine(1, 0, false);
    //verificar que no esté vacío.
    let ast = parserCuadruplos.parse(this.codeEditor3d.getValue());
    //ast.ejecutar(this.consolaEditor, this.errorEditor);
    if (ast) {
      let entorno = new Entorno();

      this.P = {id: "p", valor: 0, tipo: Tipo.ENTERO};
      this.H = {id: "h", valor: 0, tipo: Tipo.ENTERO};
      this.stack = {id: "stack", valor: [], tipo: Tipo.ARREGLO};
      this.heap = {id: "heap", valor: [], tipo: Tipo.ARREGLO};

      entorno.addSimbolo(this.P);
      entorno.addSimbolo(this.H);
      entorno.addSimbolo(this.stack);
      entorno.addSimbolo(this.heap);

      ast.ejecutar(this.consolaEditor, this.errorEjecucion, entorno);//borre asignacion a 147
    }

  }

  async onDepurar() {

    if(this.AST){
      if(this.AST.Continuar){
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

      this.P = {id: "p", valor: 0, tipo: Tipo.ENTERO};
      this.H = {id: "h", valor: 0, tipo: Tipo.ENTERO};
      this.stack = {id: "stack", valor: [], tipo: Tipo.ARREGLO};
      this.heap = {id: "heap", valor: [], tipo: Tipo.ARREGLO};

      entorno.addSimbolo(this.P);
      entorno.addSimbolo(this.H);
      entorno.addSimbolo(this.stack);
      entorno.addSimbolo(this.heap);

      this.AST.Tiempo = 400/this.Tiempo;
      this.AST.Breakpoints = this.breakpoints;
      this.AST.debugear(this.consolaEditor, this.errorEjecucion, entorno, this.codeEditor3d);
    }

    this.codeEditor3d.setReadOnly(false);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onPausa() {
    if(this.AST){
      this.AST.Continuar = false;
    }
  }

  onContinuar(){
    if(this.AST){
      this.AST.Continuar = true;
      this.AST.ejecutarNodoDebug();
    }
  }

  onSiguiente(){
    if(this.AST){
      this.AST.Continuar = false;
      this.AST.ejecutarNodoDebug();
    }
  }

  onRango(){
    if(this.AST){
      this.AST.Tiempo = 400/this.Tiempo;
    }
  }

  onSiguienteBreakpoint(){
    if(this.AST){
      this.AST.Continuar = false;
      this.AST.ejecutarNodoDebug();
      this.AST.untilBreakpoint();
    }
  }

}
