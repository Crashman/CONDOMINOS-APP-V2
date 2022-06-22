import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { HttpHeaders} from '@angular/common/http';
import { GetUserProfile } from '../../../models/GetUserProfile';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService
{
    /**
     * Constructor
     */
     private UrlBase = environment.server;
     private _authenticated: boolean = false;

     httpOption = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json;',
        }),
      };

    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
    ){
        this.UrlBase = environment.server + 'api/identity/';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */

    /*set localaccessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }*/

    setValues(response: any)
    {
        sessionStorage.setItem('Correo', response.correo.toString());
        sessionStorage.setItem('CondominioID', response.codigoCondominio.toString());
        sessionStorage.setItem('UsuarioID', response.codigoUsuario.toString());
        sessionStorage.setItem('Tipo', response.tipo.toString());
        sessionStorage.setItem('firstlog', response.firstLogin.toString());
        sessionStorage.setItem('Nombre', response.nombres.toString());
    }

    set accessToken(token: string)
    {
        sessionStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(`${this.UrlBase}login`, {userName: credentials.email, password: credentials.password}).pipe(
            switchMap((response: any) => {
               // Store the access token in the local storage
                this.accessToken = response.token;
                // Set the authenticated flag to true
                this._authenticated = true;
                // Store the user on the user service
                this._userService.user = response.correo;
                // Store Access Values
                this.setValues(response);

                return of(response);
            })
        );
    }

    UserProfile()
    {
        const GetUserProfile: GetUserProfile = {
            userName: "",
            token: this.accessToken
            };

        this._httpClient.post<GetUserProfile[]>(`${this.UrlBase}getUserProfile`, GetUserProfile,this.httpOption).subscribe(data => {
        } );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Renew token
        return this._httpClient.post('api/auth/refresh-access-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('CondominioID');
        sessionStorage.removeItem('UsuarioID');
        sessionStorage.removeItem('Tipo');
        sessionStorage.removeItem('Nombre');
        sessionStorage.clear();

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        //return this.signInUsingToken();
    }
}
