import { Component, OnInit, Input } from '@angular/core';
import { Colaborador } from '../../../../models/Colaborador';
import { UsuarioReset } from '../../../../models/UsuarioReset';
import { ColaboradorService } from '../../../../services/colaborador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Condominio } from '../../../../models/Condominio';
import { CondominioService } from '../../../../services/condominio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Mensaje } from '../../../../models/Mensaje';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  _colaborador: Colaborador [] = [];
  _colaboradorForm!: FormGroup;
  _listaCondominio: Condominio[] = [];
  _collapseGeneral: boolean;
  _collapseColaborador: boolean;
  _codigoUsuario = 0;

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              public colaboradorService: ColaboradorService,
              public condominioService: CondominioService,
              private activateRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
  ) {
    this._collapseGeneral = false;
    this._collapseColaborador = false;

    this.activateRoute.params.subscribe((params) => {
      this._codigoUsuario = params['codigoUsuario'];
    });

    this._colaboradorForm = this.formBuilder.group (
      {
      codigoCondominio:  ['', [Validators.required]],
      codigoColaborador: [],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      edad: ['', ],
      fechaNacimiento: ['', [Validators.required]],
      fechaAlta: [],
      fechaBaja: [],
      nit: ['', [Validators.required]],
      dpi: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      rol: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    this.getColaborador();
    this.GetCondominios();

  }

  updateColaborador() {
    if (this._colaboradorForm.valid === true) {
      const _Colaborador: Colaborador = {
      codigoCondominio: +this._colaboradorForm.get('codigoCondominio')!.value,
      codigoColaborador: +this._colaboradorForm.get('codigoColaborador')!.value,
      codigoUsuario: +this._colaboradorForm.get('codigoColaborador')!.value,
      nombres: this._colaboradorForm.get('nombres')!.value,
      apellidos: this._colaboradorForm.get('apellidos')!.value,
      fechaNacimiento: this._colaboradorForm.get('fechaNacimiento')!.value,
      fechaAlta: this._colaboradorForm.get('fechaAlta')!.value,
      fechaBaja: this._colaboradorForm.get('fechaBaja')!.value,
      edad: +this._colaboradorForm.get('edad')!.value,
      nit: this._colaboradorForm.get('nit')!.value,
      dpi: this._colaboradorForm.get('dpi')!.value,
      telefono: this._colaboradorForm.get('telefono')!.value,
      tipo: this._colaboradorForm.get('rol')!.value,
      correo: this._colaboradorForm.get('correo')!.value,
      contrasena: '',
      confirmacion: '',
      estado: this._colaboradorForm.get('estado')!.value,
      fechaNStr: '',
      fechaAStr: '',
      fechaBStr: '',
      estadoStr: '',
      tipoStr:'',
    };
    this.colaboradorService.saveColaborador(_Colaborador).subscribe(data => {

      const _mensaje = new Mensaje (
        data['codigo'],
        data['mensaje'],
      );

      if  (_mensaje.codigo === 0) {
        this.openSnackBar(_mensaje.mensaje,_mensaje.codigo.toString());
      }

      if  (_mensaje.codigo === 1) {
        this.openSnackBar(_mensaje.mensaje,_mensaje.codigo.toString());
      }

      this.ngOnInit();
    } );
  }
}

  getColaborador() {
      this.colaboradorService.getColaborador(this._codigoUsuario).subscribe(data => {
      for (const x of data) {
        this._colaboradorForm.controls['codigoCondominio'].setValue(x.codigoCondominio);
        this._colaboradorForm.controls['codigoColaborador'].setValue(x.codigoUsuario);
        this._colaboradorForm.controls['nombres'].setValue(x.nombres);
        this._colaboradorForm.controls['apellidos'].setValue(x.apellidos);
        this._colaboradorForm.controls['edad'].setValue(x.edad);
        this._colaboradorForm.controls['fechaNacimiento'].setValue(x.fechaNStr);
        this._colaboradorForm.controls['fechaAlta'].setValue(x.fechaAStr);
        this._colaboradorForm.controls['fechaBaja'].setValue(x.fechaBStr);
        this._colaboradorForm.controls['fechaNacimiento'].setValue(x.fechaNStr);
        this._colaboradorForm.controls['nit'].setValue(x.nit);
        this._colaboradorForm.controls['dpi'].setValue(x.dpi);
        this._colaboradorForm.controls['correo'].setValue(x.correo);
        this._colaboradorForm.controls['telefono'].setValue(x.telefono);
        this._colaboradorForm.controls['estado'].setValue(x.estado);
        this._colaboradorForm.controls['rol'].setValue(x.tipo);
      }
    });
  }

  GetCondominios() {
    this.condominioService.getCondominios().subscribe((data) => {
      this._listaCondominio = data;
      for (const x of data) {
      }
    });
  }

  gotoHome(){
    this.router.navigate(['CAPP/administracion/colaborador']);  // define your component where you want to go
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2000,});
  }

  EnableDisable() {
    if (this._colaboradorForm.valid === true) {
      const _UsuarioReset: UsuarioReset = {
      codigoCondominio: +this._colaboradorForm.get('codigoCondominio')!.value,
      codigoUsuario: +this._colaboradorForm.get('codigoColaborador')!.value,
      correo: this._colaboradorForm.get('correo')!.value,
      estado: this._colaboradorForm.get('estado')!.value,
    };
    this.colaboradorService.EnableDisable(_UsuarioReset).subscribe(data => {
        const _mensaje = new Mensaje (
          data['codigo'],
          data['mensaje'],
        );

        if  (_mensaje.codigo === 0) {
          this.openSnackBar(_mensaje.mensaje,_mensaje.codigo.toString());
        }

        if  (_mensaje.codigo === 1) {
          this.openSnackBar(_mensaje.mensaje,_mensaje.codigo.toString());
        }

        this.ngOnInit();
      } );
    }
  }

  ResetPassword() {
    if (this._colaboradorForm.valid === true) {
      const _UsuarioReset: UsuarioReset = {
      codigoCondominio: +this._colaboradorForm.get('codigoCondominio')!.value,
      codigoUsuario: +this._colaboradorForm.get('codigoColaborador')!.value,
      correo: this._colaboradorForm.get('correo')!.value,
      estado: this._colaboradorForm.get('estado')!.value,
    };
    this.colaboradorService.ResetPassword(_UsuarioReset).subscribe(data => {
        const _mensaje = new Mensaje (
          data['codigo'],
          data['mensaje'],
        );

        if  (_mensaje.codigo === 0) {
          this.openSnackBar(_mensaje.mensaje,_mensaje.codigo.toString());
        }

        if  (_mensaje.codigo === 1) {
          this.openSnackBar(_mensaje.mensaje,_mensaje.codigo.toString());
        }

        this.ngOnInit();
      } );
    }
  }

}
