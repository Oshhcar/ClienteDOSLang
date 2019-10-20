import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { EditorComponent } from '../editor/editor.component';

import { FileInterface } from '../../models/file.interface';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private titleService: Title) { }

  nuevo: FileInterface;

  file1: FileInterface = {
    name: 'archivo1',
    content: '',
    main: false
  }

  contador: number = 2;

  files: FileInterface[] = [];

  SelectedFiles : FileList;

  ngOnInit() {
    if (this.router.url.toString() == '/') {
      this.router.navigate(['/inicio']);
      //window.location.href = "/inicio";
    }

    this.titleService.setTitle("Editor - DOSLang");
    this.files.push(this.file1);
  }

  addFile(){
    this.nuevo = {
      name: 'archivo'+this.contador++,
      content: '',
      main: false
    }
    this.files.push(this.nuevo);
  }

  deleteFile(pos: number){
    this.files.splice(pos,1); 
  }

  onSelectFile(files: FileList){
    this.SelectedFiles = files;
  }

  openFile(){
    if(!isNullOrUndefined(this.SelectedFiles)){
      if(this.SelectedFiles.length>0){
        let file: File = this.SelectedFiles[0];
        let reader = new FileReader();

        let self = this;
        reader.onloadend = function (x) {
          //self.fileContent = reader.result;
          self.nuevaPestaña(file.name, reader.result);
        }
        reader.readAsText(file);
      }
    }
  }

  nuevaPestaña(name: string, content: any){
    this.files.push({name:name, content: content});
    //console.log(content);
  }


}
