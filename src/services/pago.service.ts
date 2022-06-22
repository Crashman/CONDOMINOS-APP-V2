import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Pago } from '../models/Pago';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private UrlBase = environment.server + 'api/pago/';

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;',
    }),
  };

  constructor(private http: HttpClient) {
    this.UrlBase = environment.server + 'api/pago/';
  }

  getPagosPorCondominio(codigoCondominio: number, Estado: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(
      `${this.UrlBase}getByCondominio/` + codigoCondominio + '/' + Estado
    );
  }

  getPagosPorCondomino(CodigoUsuario: number, Estado: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(
      `${this.UrlBase}getByCondomino/` + CodigoUsuario + '/' + Estado
    );
  }

  getPagosPorRequerimiento(codigoRequerimiento: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(
      `${this.UrlBase}getByRequerimiento/` + codigoRequerimiento
    );
  }

  newPago(codigoRequerimiento: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(
      `${this.UrlBase}new/` + codigoRequerimiento
    );
  }

  newPagoRequerimientos(codigoUsuario: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(
      `${this.UrlBase}newPagoRequerimientos/` + codigoUsuario
    );
  }

  getPago(pago: Pago): Observable<Pago[]> {
    return this.http.post<Pago[]>(
      `${this.UrlBase}get`,
      pago,
      this.httpOption
    );
  }

  savePago(pago: Pago): Observable<Pago[]> {
    return this.http.post<Pago[]>(
      `${this.UrlBase}save`,
      pago,
      this.httpOption
    );
  }

  savePagoRequerimientos(pago: Array<Pago>): Observable<Pago[]> {
    return this.http.post<Pago[]>(
      `${this.UrlBase}savePagoRequerimeintos`,
      pago,
      this.httpOption
    );
  }

  approvePago(codigoRequerimiento: number, codigoPago: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(
      `${this.UrlBase}approve/` + codigoRequerimiento + '/' + codigoPago
    );
  }

  rejectPago(codigoRequerimiento: number, codigoPago: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(
      `${this.UrlBase}reject/` + codigoRequerimiento + '/' + codigoPago
    );
  }

  deletePago(codigoRequerimiento: number, pago: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(
      `${this.UrlBase}delete/` + codigoRequerimiento + '/' + pago
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
