import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UsuarioRegistro } from '../../../../models/UsuarioRegistro';
import { Router } from '@angular/router';
import { CondominoService } from '../../../../services/condomino.service';
import { AuthService } from '../../../../services/AuthService.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Mensaje } from '../../../../models/Mensaje';
import { FuseAlertType } from '@fuse/components/alert';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class CrearComponent implements OnInit {

  CondominoForm!: FormGroup;
  Loading: boolean;
  Submitted: boolean;
  CollapseGeneral: boolean;
  CollapseCondomino: boolean;
  selectedDevice: string | undefined;
  error: string | undefined;
  codigoCondominio = sessionStorage.getItem('CondominioID');
  successfulSave: boolean;
  errors: string[];

  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
  };

  showAlert: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public condominoService: CondominoService,
    private authService: AuthService,
  ) {
    this.CollapseGeneral = true;
    this.CollapseCondomino = false;
    this.Loading = false;
    this.Submitted = false;

    this.CondominoForm = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      dpi: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  limpiarCondomino() {
    this.CondominoForm.controls['nombres'].setValue('');
    this.CondominoForm.controls['apellidos'].setValue('');
    this.CondominoForm.controls['nit'].setValue('');
    this.CondominoForm.controls['dpi'].setValue('');
    this.CondominoForm.controls['correo'].setValue('');
    this.CondominoForm.controls['telefono'].setValue('');
    this.CondominoForm.controls['tipo'].setValue('');
    this.CondominoForm.controls['fechaNacimiento'].setValue('');
  }

  createCondomino() {

    // Hide the alert
    this.showAlert = false;

    if (this.CondominoForm.valid === true) {
      const _Condomino: UsuarioRegistro = {
        // tslint:disable-next-line:no-non-null-assertion
        codigoCondominio: +this.codigoCondominio,
        // tslint:disable-next-line:no-non-null-assertion
        nombres: this.CondominoForm.get('nombres')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        apellidos: this.CondominoForm.get('apellidos')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        fechaNacimiento: this.CondominoForm.get('fechaNacimiento')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        nit: this.CondominoForm.get('nit')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        dpi: this.CondominoForm.get('dpi')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        telefono: this.CondominoForm.get('telefono')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        tipo: this.CondominoForm.get('tipo')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        correo: this.CondominoForm.get('correo')!.value,
      };

      // tslint:disable-next-line:no-shadowed-variable
      this.authService.register(_Condomino).subscribe(data => {
        const _mensaje = new Mensaje (
          data['codigo'],
          data['mensaje'],
        );

        if  (_mensaje.codigo === 1) {
          this.limpiarCondomino();
          this.alert.message = _mensaje.mensaje;
        }

        if  (_mensaje.codigo === 0) {
            this.alert = {
                type   : 'error',
                message: _mensaje.mensaje
            };

          // Show the alert
          this.showAlert = true;
        }
      });
    }
  }

  gotoHome(){
    this.router.navigate(['CAPP/administracion/condominos']);  // define your component where you want to go
  }

}
