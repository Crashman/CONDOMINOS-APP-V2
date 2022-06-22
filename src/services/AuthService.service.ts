import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
//import { UsuarioLoginRequest } from '../../../models/UsuarioLoginRequest';
//import { SessionManager } from '../app/shared/auth/session-manager';
import { environment } from '../environments/environment';
import { UsuarioRegistro } from '../models/UsuarioRegistro';
import { Router } from '@angular/router';
import { FirstLogin } from 'models/FirstLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private UrlBase = environment.server;

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;',
    }),
  };

  constructor(private http: HttpClient,
              //private session: SessionManager,
              private router: Router) {
    this.UrlBase = environment.server + 'api/identity/';
  }

  register(usuarioRegistro: UsuarioRegistro): Observable<UsuarioRegistro[]> {
    return this.http.post<UsuarioRegistro[]>(
      `${this.UrlBase}Register`,
      usuarioRegistro,
      this.httpOption
    );
  }

  firstLogin(firstLogin: FirstLogin): Observable<FirstLogin[]> {
    return this.http.post<FirstLogin[]>(
      `${this.UrlBase}firstlogin`,
      firstLogin,
      this.httpOption
    );
  }

  /*login(usuarioLogin: UsuarioLoginRequest) {
    return this.http.post<UsuarioLoginRequest>(
      `${this.UrlBase}Login`,
      usuarioLogin,
      this.httpOption
    ).subscribe(
      (data) => {
        this.saveToken(data['token']);

        this.getUserProfile().subscribe(
          response => {
              sessionStorage.setItem('CondominioID', response['codigoCondominio']);
              sessionStorage.setItem('UsuarioID', response['id']);
              sessionStorage.setItem('Tipo', response['tipo']);
              sessionStorage.setItem('Correo', response['email']);
              sessionStorage.setItem('Nombre', response['nombres']);

              this.session.setItem('token', data['token']);
          }
        );
        this.router.navigate(['/dashboard/dashboard']);
    },
        (error: HttpErrorResponse) => {
          if (
            error &&
            error.status &&
            error.status === 401 &&
            typeof error.error === 'string'
          ) {
            alert(error.error);
          } else {
            alert(
              'Ocurrió un error intentando ingresar a la aplicación, intente de nuevo'
            );
          }
        }
      );
  }

  login2(usuarioLogin: UsuarioLoginRequest): Observable<UsuarioLoginRequest[]> {
    return this.http.post<UsuarioLoginRequest[]>(
      `${this.UrlBase}Login`,
      usuarioLogin,
      this.httpOption
    );
  }

  saveToken(token) {
    this.session.setItem('token', token);
    localStorage.setItem('token', token);
  }*/

  getToken () {
    return localStorage.getItem('token');
  }

  getUserProfile() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get(environment.server + '/getUserProfile', {headers});
  }

  /*login(usuarioLogin: UsuarioLogin) {
    return this.rest
      .post<UsuarioLogin>('/indentity/Login', {})
      .map((response: UsuarioLogin) => {
        if (response) {
          /*sessionStorage.setItem('CondominioID', response.codigoCondominio.toString());
          sessionStorage.setItem('UsuarioID', response.codigoUsuario.toString());
          sessionStorage.setItem('IDCondomino', response.codigoCondomino.toString());
          sessionStorage.setItem('IDColaborador', response.codigoColaborador.toString());
          sessionStorage.setItem('Tipo', response.tipo.toString());
          sessionStorage.setItem('Correo', response.correo.toString());
          sessionStorage.setItem('Nombre', response.nombres.toString());
          this.session.setItem('IDUsuario', response.codigoUsuario);

          this.session.setItem('token', email);
        }
        return email;
      });
  }*/

  logout() {
    // remove user from local storage to log user out
    // sessionStorage.removeItem('config');
    // sessionStorage.removeItem('currentUser');
    sessionStorage.clear();
  }

}
