import { Component, OnInit, Input } from '@angular/core';
import { Condomino } from '../../../../models/Condomino';
import { UsuarioReset } from '../../../../models/UsuarioReset';
import { CondominoService } from '../../../../services/condomino.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup,FormBuilder, Validators,} from '@angular/forms';
import { Mensaje } from '../../../../models/Mensaje';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {

  CondominoData: Condomino [] = [];
  CondominoForm!: FormGroup;
  CollapseGeneral: boolean;
  CollapCondomino: boolean;
  selectedDevice: string | undefined;
  error: string | undefined;
  codigoUsuario = 0;
  codigoCondominio = sessionStorage.getItem('CondominioID');

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              public condominoService: CondominoService,
              private activateRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
  ) {
    this.CollapseGeneral = false;
    this.CollapCondomino = false;

    this.activateRoute.params.subscribe((params) => {
      this.codigoUsuario = params['codigoUsuario'];
    });

    this.CondominoForm = this.formBuilder.group (
      {
      codigoCondomino: [''],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      edad: [''],
      fechaNacimiento: ['', [Validators.required]],
      fechaAlta: ['', [Validators.required]],
      fechaBaja: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      dpi: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    this.getCondomino();
  }

  updateCondomino() {
    if (this.CondominoForm.valid === true) {
      const _Condomino: Condomino = {
      codigoCondominio: +this.codigoCondominio,
      codigoUsuario: +this.CondominoForm.get('codigoCondomino')!.value,
      nombres: this.CondominoForm.get('nombres')!.value,
      apellidos: this.CondominoForm.get('apellidos')!.value,
      fechaNacimiento: this.CondominoForm.get('fechaNacimiento')!.value,
      fechaAlta: this.CondominoForm.get('fechaAlta')!.value,
      fechaBaja: this.CondominoForm.get('fechaBaja')!.value,
      edad: this.CondominoForm.get('edad')!.value,
      nit: this.CondominoForm.get('nit')!.value,
      dpi: this.CondominoForm.get('dpi')!.value,
      telefono: this.CondominoForm.get('telefono')!.value,
      tipo: this.CondominoForm.get('tipo')!.value,
      correo: this.CondominoForm.get('correo')!.value,
      contrasena: '',
      confirmacion: '',
      estado: this.CondominoForm.get('estado')!.value,
      fechaNStr: '',
      fechaAStr: '',
      fechaBStr: '',
      estadoStr: '',
      tipoStr:'',
    };

    this.condominoService.saveCondomino(_Condomino).subscribe(data => {

      const _mensaje = new Mensaje (
        data['codigo'],
        data['mensaje'],
      );

      if  (_mensaje.codigo === 0) {
        this.openSnackBar(_mensaje.mensaje,_mensaje.codigo.toString());
        this.getCondomino();
      }

      if  (_mensaje.codigo === 1) {
        this.openSnackBar(_mensaje.mensaje,_mensaje.codigo.toString());
      }

    } );
  }
}

  getCondomino() {
      this.condominoService.getCondomino(this.codigoUsuario).subscribe(data => {
      for (const x of data) {
        this.CondominoForm.controls['codigoCondomino'].setValue(x.codigoUsuario);
        this.CondominoForm.controls['nombres'].setValue(x.nombres);
        this.CondominoForm.controls['apellidos'].setValue(x.apellidos);
        this.CondominoForm.controls['edad'].setValue(x.edad);
        this.CondominoForm.controls['fechaNacimiento'].setValue(x.fechaNStr);
        this.CondominoForm.controls['fechaAlta'].setValue(x.fechaAStr);
        this.CondominoForm.controls['fechaBaja'].setValue(x.fechaBStr);
        this.CondominoForm.controls['nit'].setValue(x.nit);
        this.CondominoForm.controls['dpi'].setValue(x.dpi);
        this.CondominoForm.controls['correo'].setValue(x.correo);
        this.CondominoForm.controls['telefono'].setValue(x.telefono);
        this.CondominoForm.controls['estado'].setValue(x.estado);
        this.CondominoForm.controls['tipo'].setValue(x.tipo);
      }
    });
  }

  gotoHome(){
    this.router.navigate(['CAPP/administracion/condominos']); 
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2000,});
  }

  EnableDisable() {
    if (this.CondominoForm.valid === true) {
      const _UsuarioReset: UsuarioReset = {
      codigoCondominio: +this.codigoCondominio,
      codigoUsuario: +this.CondominoForm.get('codigoCondomino')!.value,
      correo: this.CondominoForm.get('correo')!.value,
      estado: this.CondominoForm.get('estado')!.value,
    };
    this.condominoService.EnableDisable(_UsuarioReset).subscribe(data => {
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
    if (this.CondominoForm.valid === true) {
      const _UsuarioReset: UsuarioReset = {
      codigoCondominio: +this.codigoCondominio,
      codigoUsuario: +this.CondominoForm.get('codigoCondomino')!.value,
      correo: this.CondominoForm.get('correo')!.value,
      estado: this.CondominoForm.get('estado')!.value,
    };
    this.condominoService.ResetPassword(_UsuarioReset).subscribe(data => {
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
