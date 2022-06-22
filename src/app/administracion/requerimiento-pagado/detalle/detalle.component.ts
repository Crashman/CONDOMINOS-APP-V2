import { Component, OnInit, Input } from '@angular/core';
import { DetRequerimiento } from '../../../../models/DetRequerimiento';
import { DetrequerimientoService } from '../../../../services/detrequerimiento.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Subject} from 'rxjs';
import { RequerimientoService } from '../../../../services/requerimiento.service';
import { Requerimiento } from '../../../../models/Requerimiento';
import { CondominoService } from '../../../../services/condomino.service';
import { CondominioService } from '../../../../services/condominio.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  _requerimientoForm!: FormGroup;
  _dataRequerimiento: Requerimiento[] = [];
  _collapDetRequerumiento: boolean;
  _codigoRequerimiento = 0;
  _listaDetRequerimiento: DetRequerimiento[] = [];
  _pagination = 0;

  _success = new Subject<string>();

  _staticAlertClosed = false;
  _successMessage = '';

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private requerimientoService: RequerimientoService,
    private detrequerimientoService: DetrequerimientoService,
    private activateRoute: ActivatedRoute,
    public condominoService: CondominoService,
    public condominioService: CondominioService) {

    this._collapDetRequerumiento = true;

    this.activateRoute.params.subscribe((params) => {
      this._codigoRequerimiento = params['codigoRequerimiento'];
    });

    this._requerimientoForm = this.formBuilder.group (
      {
      codigoRequerimiento: [''],
      fecha: ['', [Validators.required]],
      saldo: ['', [Validators.required]],
      monto: ['', [Validators.required]],
      saldoAnterior: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      nombreC: ['', [Validators.required]],
      nitC: ['', [Validators.required]],
      direccionC: ['', [Validators.required]],
      telefonoC: ['', [Validators.required]],
      correoC: ['', [Validators.required]],
      bancoC: ['', [Validators.required]],
    });

    this._requerimientoForm.controls['codigoRequerimiento'].disable();
    this._requerimientoForm.controls['fecha'].disable();
    this._requerimientoForm.controls['saldo'].disable();
    this._requerimientoForm.controls['monto'].disable();
    this._requerimientoForm.controls['saldoAnterior'].disable();
    this._requerimientoForm.controls['estado'].disable();
    this._requerimientoForm.controls['nombreC'].disable();
    this._requerimientoForm.controls['nitC'].disable();
    this._requerimientoForm.controls['direccionC'].disable();
    this._requerimientoForm.controls['telefonoC'].disable();
    this._requerimientoForm.controls['correoC'].disable();
    this._requerimientoForm.controls['bancoC'].disable();
  }

  ngOnInit(): void {
    this.getRequerimiento();
    this.getDetRequerimiento();
  }

  getRequerimiento() {
    this.requerimientoService.getRequerimiento(this._codigoRequerimiento).subscribe((data) => {
      for (const x of data) {
        this._requerimientoForm.controls['codigoRequerimiento'].setValue("#-" + x.codigoRequerimiento);
        this._requerimientoForm.controls['fecha'].setValue(x.fechaStr);
        this._requerimientoForm.controls['saldo'].setValue("(GTQ) " + x.saldo);
        this._requerimientoForm.controls['monto'].setValue("(GTQ) " + x.monto);
        this._requerimientoForm.controls['saldoAnterior'].setValue(x.saldoAnterior);
        this._requerimientoForm.controls['estado'].setValue(x.estadoStr);
        this.getCondomino(x.codigoUsuario);
        this.getCondominio(x.codigoCondominio);
      }
    });
  }

  getDetRequerimiento() {
    this.detrequerimientoService.getDetRequerimiento(this._codigoRequerimiento).subscribe(data => {
      this._listaDetRequerimiento = data;
  });
}

gotoHome(){
  this.router.navigate(['CAPP/administracion/requerimiento-pagado']);  // define your component where you want to go
}

getCondomino(codigoUsuario: number) {
  this.condominoService.getCondomino(codigoUsuario).subscribe(data => {
    for (const x of data) {
      this._requerimientoForm.controls['nombres'].setValue(x.nombres +" "+ x.apellidos);
      this._requerimientoForm.controls['nit'].setValue(x.nit);
      this._requerimientoForm.controls['correo'].setValue(x.correo);
      this._requerimientoForm.controls['telefono'].setValue(x.telefono);
    }
  });
}

getCondominio(codigoCondominio: number) {
  this.condominioService.getCondominio(codigoCondominio).subscribe((data) => {
      for (const x of data) {
        this._requerimientoForm.controls['nombreC'].setValue(x.nombre);
        this._requerimientoForm.controls['nitC'].setValue("Nit: "+x.nit);
        this._requerimientoForm.controls['direccionC'].setValue(x.direccion);
        this._requerimientoForm.controls['telefonoC'].setValue("Tel.: "+x.telefono);
        this._requerimientoForm.controls['correoC'].setValue(x.correo);
        this._requerimientoForm.controls['bancoC'].setValue(x.banco);
      }
    });
}

}





