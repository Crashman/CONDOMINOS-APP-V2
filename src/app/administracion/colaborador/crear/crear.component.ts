import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Colaborador } from '../../../../models/Colaborador';
import { UsuarioRegistro } from '../../../../models/UsuarioRegistro';
import { AuthService } from '../../../../services/AuthService.service';
import { Router } from '@angular/router';
import { ColaboradorService } from '../../../../services/colaborador.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Condominio } from '../../../../models/Condominio';
import { CondominioService } from '../../../../services/condominio.service';
import { FuseAlertType } from '@fuse/components/alert';
import { Mensaje } from '../../../../models/Mensaje';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  _colaborador: Colaborador [] = [];
  _listaCondominio: Condominio[] = [];
  _colaboradorForm!: FormGroup;
  _collapseGeneral: boolean;
  successfulSave: boolean;
  errors: string[];

  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
  };

  showAlert: boolean = false;

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              public colaboradorService: ColaboradorService,
              public condominioService: CondominioService,
              private authService: AuthService,
              private snackBar: MatSnackBar,
  ) {
    this._collapseGeneral = true;
    this._colaboradorForm = this.formBuilder.group (
      {
      codigoCondominio:  ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      dpi: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      rol: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    this.GetCondominios();
  }

  createColaborador() {
    if (this._colaboradorForm.valid === true) {
        const _Colaborador: UsuarioRegistro = {
        // tslint:disable-next-line:no-non-null-assertion
        codigoCondominio: +this._colaboradorForm.get('codigoCondominio')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        nombres: this._colaboradorForm.get('nombres')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        apellidos: this._colaboradorForm.get('apellidos')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        fechaNacimiento: this._colaboradorForm.get('fechaNacimiento')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        nit: this._colaboradorForm.get('nit')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        dpi: this._colaboradorForm.get('dpi')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        telefono: this._colaboradorForm.get('telefono')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        tipo: this._colaboradorForm.get('rol')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        correo: this._colaboradorForm.get('correo')!.value,
      };

      this.authService.register(_Colaborador).subscribe(data => {
        
        const _mensaje = new Mensaje (
          data['codigo'],
          data['mensaje'],
        );

        if  (_mensaje.codigo === 0) {
          this.limpiarColaborador();
          this.openSnackBar(_mensaje.mensaje,_mensaje.codigo.toString());
        }

        if  (_mensaje.codigo === 1) {
          this.openSnackBar(_mensaje.mensaje,_mensaje.codigo.toString());
        }

      });
    }
  }

  limpiarColaborador() {
      this._colaboradorForm.controls['codigoCondominio'].setValue('');
      this._colaboradorForm.controls['nombres'].setValue('');
      this._colaboradorForm.controls['apellidos'].setValue('');
      this._colaboradorForm.controls['fechaNacimiento'].setValue('');
      this._colaboradorForm.controls['nit'].setValue('');
      this._colaboradorForm.controls['dpi'].setValue('');
      this._colaboradorForm.controls['correo'].setValue('');
      this._colaboradorForm.controls['telefono'].setValue('');
      this._colaboradorForm.controls['rol'].setValue('');
}

  GetCondominios() {
    this.condominioService.getCondominios().subscribe((data) => {
      this._listaCondominio = data;
    });
  }

  gotoHome(){
    this.router.navigate(['CAPP/administracion/colaborador']);  // define your component where you want to go
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2000,});
  }
}
