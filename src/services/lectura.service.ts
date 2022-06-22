import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Lectura } from '../models/Lectura';
import { Propiedad } from '../models/Propiedad';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LecturaService {

  private UrlBase = environment.server + 'api/lectura/';

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;',
    }),
  };

  constructor(private http: HttpClient) {
    this.UrlBase = environment.server + 'api/lectura/';
  }

  newLectura(codigoPropiedad: number): Observable<Lectura[]> {
    return this.http.get<Lectura[]>(
      `${this.UrlBase}new/` + codigoPropiedad
    );
  }

  getLecturas(codigoPropiedad: number): Observable<Lectura[]> {
    return this.http.get<Lectura[]>(
      `${this.UrlBase}getAll/` + codigoPropiedad
    );
  }

  getLectura(lectura: Lectura): Observable<Lectura[]> {
    return this.http.post<Lectura[]>(
      `${this.UrlBase}get/`,
      lectura,
      this.httpOption
    );
  }

  getContadores(codigoCondominio?: number): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(
      `${this.UrlBase}getContadores/` + codigoCondominio
    );
  }

  saveLectura(lectura: Lectura): Observable<Lectura[]> {
    return this.http.post<Lectura[]>(
      `${this.UrlBase}save`,
      lectura,
      this.httpOption
    );
  }

  deleteLectura(codigoLectura: number): Observable<Lectura[]> {
    return this.http.get<Lectura[]>(
      `${this.UrlBase}delete/` + codigoLectura
    );
  }

  errorHandler(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
