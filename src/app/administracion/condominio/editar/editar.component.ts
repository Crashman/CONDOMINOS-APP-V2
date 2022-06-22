import { Component, OnInit, Input } from '@angular/core';
import { Condominio } from '../../../../models/Condominio';
import { CondominioService } from '../../../../services/condominio.service';
import { ServicioService } from '../../../../services/servicio.service';
import { DetcondominioService } from '../../../../services/detcondominio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Servicio } from '../../../../models/Servicio';
import { DetCondominio } from '../../../../models/DetCondominio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Mensaje } from '../../../../models/Mensaje';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {
  CondominioData: Condominio[] = [];

  CondominioForm!: FormGroup;
  ServicioForm!: FormGroup;
  DetCondominioForm!: FormGroup;

  CollapseGeneral: boolean;
  CollapseServicio: boolean;
  CollapseDetCondominio: boolean;

  error: string | undefined;
  codigoCondominio = 0;
  codigoDetCondominio = 0;

  ListaServicio: Servicio[] = [];
  pagination = 0;

  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public condominioService: CondominioService,
    public servicioService: ServicioService,
    public detcondominioService: DetcondominioService,
    private activateRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.CollapseGeneral = false;
    this.CollapseServicio = false;
    this.CollapseDetCondominio = false;

    this.activateRoute.params.subscribe((params) => {
      this.codigoCondominio = params['codigoCondominio'];
    });

    this.CondominioForm = this.formBuilder.group({
      codigoCondominio: [''],
      nombre: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      banco: ['', [Validators.required]],
    });

    this.ServicioForm = this.formBuilder.group({
      codigoServicio: [''],
      nombreServicio: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
    });

    this.DetCondominioForm = this.formBuilder.group({
      cantidadMetroCubico: ['', [Validators.required]],
      costoMetroCubico: ['', [Validators.required]],
      costoMetroCubicoExcedente: ['', [Validators.required]],
      smtpServer: ['', [Validators.required]],
      smtpPassword: ['', [Validators.required]],
      fechaPago: ['', [Validators.required]],
      fechaLectura: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getCondominio();
    this.getServicios();
    this.getDetCondominio(this.codigoCondominio);

    setTimeout(() => (this.staticAlertClosed = true), 20000);

    this._success.subscribe((message) => (this.successMessage = message));
    this._success
      .pipe(debounceTime(5000))
      .subscribe(() => (this.successMessage = ''));
  }

  gotoHome(){
    console.log('CAPP/administracion/condominio');
    this.router.navigate(['CAPP/administracion/condominio']);  // define your component where you want to go
}


  updateCondominio() {
    if (this.CondominioForm.valid === true) {
      const _Condominio: Condominio = {       
        codigoCondominio: this.CondominioForm.get('codigoCondominio')!.value,       
        nombre: this.CondominioForm.get('nombre')!.value,       
        nit: this.CondominioForm.get('nit')!.value,       
        direccion: this.CondominioForm.get('direccion')!.value,       
        telefono: this.CondominioForm.get('telefono')!.value,       
        correo: this.CondominioForm.get('correo')!.value,
        banco: this.CondominioForm.get('banco')!.value,
      };

      this.condominioService.saveCondominio(_Condominio).subscribe((data) => {
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
      });
    }
  }

  getCondominio() {
    this.condominioService
      .getCondominio(this.codigoCondominio)
      .subscribe((data) => {
        for (const x of data) {
          this.CondominioForm.controls['codigoCondominio'].setValue(x.codigoCondominio);
          this.CondominioForm.controls['nombre'].setValue(x.nombre);
          this.CondominioForm.controls['nit'].setValue(x.nit);
          this.CondominioForm.controls['direccion'].setValue(x.direccion);
          this.CondominioForm.controls['telefono'].setValue(x.telefono);
          this.CondominioForm.controls['correo'].setValue(x.correo);
          this.CondominioForm.controls['banco'].setValue(x.banco);
        }
      });
  }

  getServicios() {
    this.servicioService
      .getServicios(this.codigoCondominio)
      .subscribe((data) => {
        this.ListaServicio = data;
      });
  }

  getServicio(codigoServicio: number) {
    this.servicioService.getServicio(this.codigoCondominio,codigoServicio).subscribe((data) => {
      for (const x of data) {
        this.ServicioForm.controls['codigoServicio'].setValue(x.codigoServicio);
        this.ServicioForm.controls['nombreServicio'].setValue(x.nombreServicio);
        this.ServicioForm.controls['valor'].setValue(x.valor);
        this.ServicioForm.controls['tipo'].setValue(x.tipo);
      }
    });
  }

  limpiarServicio() {
        this.ServicioForm.controls['codigoServicio'].setValue('');
        this.ServicioForm.controls['nombreServicio'].setValue('');
        this.ServicioForm.controls['valor'].setValue('');
        this.ServicioForm.controls['tipo'].setValue('');
    }

  saveServicio() {
   
     if (this.ServicioForm.valid === true) {
        const servicio: Servicio = {
        codigoServicio: +this.ServicioForm.get('codigoServicio')!.value,
        codigoCondominio: +this.codigoCondominio,
        nombreServicio: this.ServicioForm.get('nombreServicio')!.value,
        valor: +this.ServicioForm.get('valor')!.value,
        tipo: this.ServicioForm.get('tipo')!.value,
      };

      this.servicioService.saveServicio(servicio).subscribe((data) => {
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
        this.limpiarServicio();
        this.getServicios();
      });
     }
  }

  deleteServicio(codigoservicio: number) {
    if (confirm('¿Confirma que desea ELIMINAR el registro?') === true) {
      this.servicioService.deleteServicio(codigoservicio).subscribe((data) => {
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

        this.getServicios();
      });
    }
  }

  getDetCondominio(codigoCondominio: number) {
    this.detcondominioService.getDetCondominio(codigoCondominio).subscribe((data) => {
      for (const x of data) {
        this.codigoDetCondominio  = x.codigoDetCondominio;
        this.DetCondominioForm.controls['cantidadMetroCubico'].setValue(x.cantidadMetroCubico);
        this.DetCondominioForm.controls['costoMetroCubico'].setValue(x.costoMetroCubico);
        this.DetCondominioForm.controls['costoMetroCubicoExcedente'].setValue(x.costoMetroCubicoExcedente);
        this.DetCondominioForm.controls['smtpServer'].setValue(x.smtpServer);
        this.DetCondominioForm.controls['smtpPassword'].setValue(x.smtpPassword);
        this.DetCondominioForm.controls['fechaPago'].setValue(x.fechaPago);
        this.DetCondominioForm.controls['fechaLectura'].setValue(x.fechaLectura);
      }
    });
  }

  saveDetCondominio() {
       if (this.DetCondominioForm.valid === true) {
        const detCondominio: DetCondominio = {
        codigoCondominio: +this.codigoCondominio,       
        codigoDetCondominio: +this.codigoDetCondominio,       
        cantidadMetroCubico: +this.DetCondominioForm.get('cantidadMetroCubico')!.value,       
        costoMetroCubico: +this.DetCondominioForm.get('costoMetroCubico')!.value,       
        costoMetroCubicoExcedente: +this.DetCondominioForm.get('costoMetroCubicoExcedente')!.value,       
        smtpServer: this.DetCondominioForm.get('smtpServer')!.value,       
        smtpPassword: this.DetCondominioForm.get('smtpPassword')!.value,       
        fechaPago: +this.DetCondominioForm.get('fechaPago')!.value,       
        fechaLectura: +this.DetCondominioForm.get('fechaLectura')!.value,
      };

      this.detcondominioService.saveDetCondominio(detCondominio).subscribe((data) => {
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
      });
     }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2000,});
  }
}
