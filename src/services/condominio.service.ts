import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Condominio } from '../models/Condominio';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CondominioService {

  private UrlBase = environment.server + 'api/condominio/';
  public ListaCondominio: Condominio[] = [];
  public Condominio: Condominio[] = [];

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;',
    }),
  };

  constructor(private http: HttpClient) {
    this.UrlBase = environment.server + 'api/condominio/';
  }

  getCondominios(): Observable<Condominio[]> {
    return this.http.get<Condominio[]>(
      `${this.UrlBase}getAll`
    );
  }

  getCondominio(CodigoCondominio: Number): Observable<Condominio[]> {
    return this.http.get<Condominio[]>(
      `${this.UrlBase}getCondominio/` + CodigoCondominio
    );
  }

  saveCondominio(condominio: Condominio): Observable<Condominio[]> {
    return this.http.post<Condominio[]>(
      `${this.UrlBase}save`,
      condominio,
      this.httpOption
    );
  }

  deleteCondominio(codigoCondominio: Number): Observable<Condominio[]> {
    return this.http.get<Condominio[]>(
      `${this.UrlBase}delete/` + codigoCondominio
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
