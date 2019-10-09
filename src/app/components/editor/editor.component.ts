import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FileInterface } from '../../models/file.interface';
import { ErrorInterface } from '../../models/error.interface';

import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';


const THEME = 'ace/theme/github';
const LANG = 'ace/mode/java';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @Input('file') file: FileInterface;

  @ViewChild('codeEditor', {static:true}) codeEditorElmRef: ElementRef;
  private codeEditor: ace.Ace.Editor;

  @ViewChild('codeEditor3d', {static: true}) codeEditorElmRef3d: ElementRef;
  private codeEditor3d: ace.Ace.Editor;

  constructor() { }

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
    this.codeEditor.gotoLine(1,0,false);

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

  }

  error = '';
  mensaje = '';
  error2 = '';
  mensaje2 = '';

  errorEditor: ErrorInterface[] = [];
  consolaEditor = '';

  reportes: FileInterface[]=[];

  onGuardar(){
    //console.log(this.codeEditor.getValue());
    var blob = new Blob([this.codeEditor.getValue()], { type : 'text/plain'});
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

  deleteReporte(pos: number){
    this.reportes.splice(pos,1); 
  }

  generarTabla(val: string, filename: string, reporte: FileInterface){
    let id = filename + "reporte_"+ this.reportes.indexOf(reporte);
    let doc = document.getElementById(id);
    doc.innerHTML = val;
  }

  onCompilar() {
    this.error= '';
    this.mensaje = '';
  }

  onEjecutar() {
    this.error2 = '';
    this.mensaje2 = '';
  }

  onDepurar() {
    this.error2 = '';
    this.mensaje2 = '';
  }

}