import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Requerimiento } from '../models/Requerimiento';
import { DetRequerimiento } from '../models/DetRequerimiento';
import { environment } from '../environments/environment';
import { Recibo } from '../models/Recibo';
import { RequerimientoValidate} from 'models/RequerimientoValidate';
import { RequerimientoStatus} from 'models/RequerimientoStatus';

@Injectable({
  providedIn: 'root'
})
export class RequerimientoService {

  private UrlBase = environment.server + 'api/requerimiento/';

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;',
    }),
  };

  RequerimientoList: Requerimiento;
  encabezado = '';
  detalle = '';

  constructor(private http: HttpClient) {
    this.UrlBase = environment.server + 'api/requerimiento/';
  }

  getRequerimientosPorCondominioYEstado(codigoCondominio: number,  estado: number): Observable<Requerimiento[]> {
    return this.http.get<Requerimiento[]>(
      `${this.UrlBase}getByCondominioYEstado/` + codigoCondominio + '/' + estado
    );
  }

  getRequerimientosPorCondomino(codigoUsuario: number): Observable<Requerimiento[]> {
    return this.http.get<Requerimiento[]>(
      `${this.UrlBase}getByUsuario/` + codigoUsuario
    );
  }

  getRequerimientoPagado(codigoRequerimiento: number): Observable<Recibo[]> {
    return this.http.get<Recibo[]>(
      `${this.UrlBase}getRequerimientoPagado/` + codigoRequerimiento
    );
  }

  getRequerimientosPorCondominoYEstado(requerimiento: RequerimientoStatus): Observable<Requerimiento[]> {
    return this.http.post<Requerimiento[]>(`${this.UrlBase}getByCondominoYEstado`,requerimiento
    );
  }

  ValidateRequerimiento(requerimiento: RequerimientoValidate): Observable<RequerimientoValidate[]> {
    return this.http.post<Requerimiento[]>(`${this.UrlBase}validateStatus` , requerimiento);
  }

  /*getRequerimientosPorCondominoYEstado(codigoUsuario: number, estado: number): Observable<Requerimiento[]> {
    return this.http.get<Requerimiento[]>(
      `${this.UrlBase}getByCondominoYEstado/` + codigoUsuario + '/' + estado
    );
  }*/

  getRequerimiento(codigoRequerimiento: number): Observable<Requerimiento[]> {
    return this.http.get<Requerimiento[]>(
      `${this.UrlBase}get/` + codigoRequerimiento
    );
  }

  getLastRequerimiento(codigoCondominio: number): Observable<Requerimiento[]> {
    return this.http.get<Requerimiento[]>(
      `${this.UrlBase}last/` + codigoCondominio
    );
  }

  saveRequerimiento(requerimiento: Requerimiento): Observable<Requerimiento[]> {
    return this.http.post<Requerimiento[]>(`${this.UrlBase}save` , requerimiento);
  }



  saveDetRequerimiento(detRequerimiento: DetRequerimiento[]): Observable<DetRequerimiento[]> {
    return this.http.post<DetRequerimiento[]>(`${this.UrlBase}saveDet`, detRequerimiento);
  }

  generateRequerimientos(requerimiento: Requerimiento): Observable<Requerimiento[]> {
    return this.http.post<Requerimiento[]>(
      `${this.UrlBase}generate`, requerimiento, this.httpOption
    );
  }

  deleteRequerimiento(codigoRequerimiento: number): Observable<Requerimiento[]> {
    return this.http.get<Requerimiento[]>(
      `${this.UrlBase}delete/` + codigoRequerimiento
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
