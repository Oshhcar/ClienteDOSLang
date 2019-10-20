import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { ContenidoInterface } from 'src/app/models/contenido.interface';
import { FileInterface } from 'src/app/models/file.interface';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8080/api/doslang/parser';
  headers: HttpHeaders = new HttpHeaders ({
    "Content-Type": "application/json"
  });

  traducir(files: FileInterface[]) : Observable<ContenidoInterface>{
    return this.http.post(`${this.baseUrl}`, {data: files})
    .pipe(map((res)=>{
      return res;
    }))
  }


}
