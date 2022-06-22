import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Colaborador } from '../models/Colaborador';
import { environment } from '../environments/environment';
import { UsuarioReset } from 'models/UsuarioReset';


@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  private UrlBase = environment.server + 'api/colaborador/';
  private UrlBase2 = environment.server + 'api/identity/';

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;',
    }),
  };

  constructor(private http: HttpClient) {
    this.UrlBase =  environment.server + 'api/colaborador/';
    this.UrlBase2 = environment.server + 'api/identity/';
  }

  getColaboradores(codigoCondominio: number): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(
      `${this.UrlBase}getAll/`+ codigoCondominio,
    );
  }

  getColaborador(codigoColaborador: number): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(
      `${this.UrlBase}get/` + codigoColaborador
    );
  }

  EnableDisable(usuarioReset: UsuarioReset): Observable<UsuarioReset[]> {
    return this.http.post<UsuarioReset[]>(
      `${this.UrlBase2}enabledisable`,
      usuarioReset,
      this.httpOption
    );
  }

  ResetPassword(usuarioReset: UsuarioReset): Observable<UsuarioReset[]> {
    return this.http.post<UsuarioReset[]>(
      `${this.UrlBase2}passwordreset`,
      usuarioReset,
      this.httpOption
    );
  }

  saveColaborador(colaborador: Colaborador): Observable<Colaborador[]> {
    return this.http.post<Colaborador[]>(
      `${this.UrlBase2}update`,
      colaborador,
      this.httpOption
    );
  }

  deleteColaborador(codigoColaborador: number): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${this.UrlBase2}delete/` + codigoColaborador);
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
