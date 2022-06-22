import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DetCondominio } from '../models/DetCondominio';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetcondominioService {

  private UrlBase = environment.server + 'api/detCondominio/';

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;',
    }),
  };

  constructor(private http: HttpClient) {
    this.UrlBase = environment.server + 'api/detCondominio/';
  }

  getDetCondominio(codigoCondominio: number): Observable<DetCondominio[]> {
    return this.http.get<DetCondominio[]>(
      `${this.UrlBase}get/` + codigoCondominio
    );
  }

  saveDetCondominio(detCondominio: DetCondominio): Observable<DetCondominio[]> {
    return this.http.post<DetCondominio[]>(
      `${this.UrlBase}save`,
      detCondominio,
      this.httpOption
    );
  }

  deleteDetCondominio(detCondominio: DetCondominio): Observable<DetCondominio[]> {
    return this.http.get<DetCondominio[]>(`${this.UrlBase}delete/` + detCondominio);
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
