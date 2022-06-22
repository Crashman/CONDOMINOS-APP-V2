import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Anuncio } from '../models/Anuncio';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnuncioService {
  private UrlBase = environment.server + 'api/anuncio/';

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;'
    }),
  };

  constructor(private http: HttpClient) {
    this.UrlBase = environment.server + 'api/anuncio/';
  }

  getAnuncios(CodigoCondominio: Number): Observable<Anuncio[]> {
    return this.http.get<Anuncio[]>(
      `${this.UrlBase}getAll/` + CodigoCondominio
    );
  }

  getAnunciosActivos(CodigoCondominio: Number): Observable<Anuncio[]> {
    return this.http.get<Anuncio[]>(
      `${this.UrlBase}getAllActives/` + CodigoCondominio
    );
  }

  getAnuncio(anuncio: Anuncio): Observable<Anuncio[]> {
    return this.http.post<Anuncio[]>(
      `${this.UrlBase}get`, anuncio);
  }

  saveAnuncio(anuncio: Anuncio): Observable<Anuncio[]> {
    return this.http.post<Anuncio[]>(`${this.UrlBase}save`, anuncio);
  }

  deleteAnuncio(anuncio: Anuncio): Observable<Anuncio[]> {
    return this.http.post<Anuncio[]>(`${this.UrlBase}delete`, anuncio);
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
