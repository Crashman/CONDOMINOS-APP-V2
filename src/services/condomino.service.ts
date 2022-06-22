import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Condomino } from '../models/Condomino';
import { UsuarioReset } from '../models/UsuarioReset';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CondominoService {

  private UrlBase = environment.server + 'api/condomino/';
  private UrlBase2 = environment.server + 'api/identity/';

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;',
    }),
  };

  constructor(private http: HttpClient) {
    this.UrlBase =  environment.server + 'api/condomino/';
    this.UrlBase2 = environment.server + 'api/identity/';
  }

  getCondominos(codigoCondominio: number): Observable<Condomino[]> {
    return this.http.get<Condomino[]>(
      `${this.UrlBase}getAll/` + codigoCondominio,
    );
  }

  getCondomino(codigoUsuario: number): Observable<Condomino[]> {
    return this.http.get<Condomino[]>(
      `${this.UrlBase}get/` + codigoUsuario
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

  saveCondomino(condomino: Condomino): Observable<Condomino[]> {
    return this.http.post<Condomino[]>(
      `${this.UrlBase2}update`,
      condomino,
      this.httpOption
    );
  }

  deleteCondomino(codigoUsuario: number): Observable<Condomino[]> {
    return this.http.get<Condomino[]>(
      `${this.UrlBase2}delete/` + codigoUsuario
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
