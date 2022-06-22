import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Propiedad } from '../models/Propiedad';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {

  private UrlBase = environment.server + 'api/propiedad/';

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;',
    }),
  };

  constructor(private http: HttpClient) {
    this.UrlBase = environment.server + 'api/propiedad/';
  }

  getPropiedades(codigoCondominio?: number): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(
      `${this.UrlBase}getAll/` + codigoCondominio
    );
  }

  getPropiedadesPorCodigoCondomino(CodigoUsuario: number): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(
      `${this.UrlBase}getByUsuario/` + CodigoUsuario
    );
  }

  getPropiedad(CodigoPropiedad: number): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(
      `${this.UrlBase}get/` + CodigoPropiedad
    );
  }

  savePropiedad(propiedad: Propiedad): Observable<Propiedad[]> {
    return this.http.post<Propiedad[]>(
      `${this.UrlBase}save`,
      propiedad,
      this.httpOption
    );
  }

  deletePropiedad(codigoPropiedad: number): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(
      `${this.UrlBase}delete/` + codigoPropiedad
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
