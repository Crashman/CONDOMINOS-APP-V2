import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { HttpHeaders} from '@angular/common/http';
import { AuthService } from '../../../../services/AuthService.service';
import { FirstLogin } from '../../../../models/FirstLogin';
import { Mensaje } from '../../../../models/Mensaje';

@Component({
    selector     : 'auth-first-login',
    templateUrl  : './first-login.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthFirstLoginComponent implements OnInit
{
    /**
     * Constructor
     */

    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };

    signUpForm: FormGroup;
    showAlert: boolean = false;
    NombreUsuario = '';
    EmailUsuario = '';
    CodigoUsuario = 0;
    private UrlBase = environment.server;

    httpOption = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json;',
        }),
      };


    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _httpClient: HttpClient,
    )
    {
        this.UrlBase = environment.server + 'api/identity/';
        this.NombreUsuario = sessionStorage.getItem('Nombre');
        this.EmailUsuario = sessionStorage.getItem('Correo');
        this.CodigoUsuario = +sessionStorage.getItem('UsuarioID');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signUpForm = this._formBuilder.group({
                email     : [this.EmailUsuario, [Validators.required, Validators.email]],
                name      : [this.NombreUsuario, Validators.required],
                password  : ['', Validators.required],
            }
        );

        this.signUpForm.controls['email'].disable();
        this.signUpForm.controls['name'].disable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void
    {
        // Do nothing if the form is invalid
        if ( this.signUpForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        const _FirstLogin: FirstLogin = {
            codigoUsuario: this.CodigoUsuario,
            nombres: this.NombreUsuario,
            correo: this.EmailUsuario,
            contrasena: this.signUpForm.get('password')!.value,
        };

        // Sign up
        this._authService.firstLogin(_FirstLogin).subscribe(data => {
            const _mensaje = new Mensaje (
              data['codigo'],
              data['mensaje'],
            );
    
            if  (_mensaje.codigo === 1) {

                this._router.navigateByUrl('/dashboards/project');
                //this.showNotification('error', _mensaje.mensaje );
            }
    
            if  (_mensaje.codigo === 0) {
                this.alert = {
                    type   : 'error',
                    message: 'Something went wrong, please try again.'
                };

                // Show the alert
                this.showAlert = true;
            }
          });

            /*this._authService.signUp(this.signUpForm.value)
            .subscribe(
                (response) => {

                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/confirmation-required');
                },
                (response) => {

                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                }
            );*/
    }

}
