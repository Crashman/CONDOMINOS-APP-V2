import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Servicio } from '../models/Servicio';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  private UrlBase = environment.server + 'api/servicio/';

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;'
    }),
  };

  constructor(private http: HttpClient) {
    this.UrlBase = environment.server + 'api/servicio/';
  }

  getServicios(CodigoCondominio: Number): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(
      `${this.UrlBase}getAll/` + CodigoCondominio
    );
  }

  getServicio(CodigoCondominio: Number,CodigoServicio: Number): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(
      `${this.UrlBase}get/` + CodigoCondominio +'/'+ CodigoServicio
    );
  }

  saveServicio(servicio: Servicio): Observable<Servicio[]> {
    return this.http.post<Servicio[]>(`${this.UrlBase}save`, servicio);
  }

  deleteServicio(codigoServicio: number): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(
      `${this.UrlBase}delete/` + codigoServicio
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
