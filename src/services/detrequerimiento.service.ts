import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DetRequerimiento } from '../models/DetRequerimiento';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetrequerimientoService {

  private UrlBase = environment.server + 'api/detrequerimiento/';

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;',
    }),
  };

  constructor(private http: HttpClient) {
    this.UrlBase = environment.server + 'api/detrequerimiento/';
  }

  getDetRequerimiento(codigoRequerimiento: number): Observable<DetRequerimiento[]> {
    return this.http.get<DetRequerimiento[]>(
      `${this.UrlBase}getDet/` + codigoRequerimiento
    );
  }
}
