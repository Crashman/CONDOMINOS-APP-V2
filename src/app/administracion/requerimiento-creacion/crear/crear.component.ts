import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio } from '../../../../models/Servicio';
import { ServicioService } from '../../../../services/servicio.service';
import { Condomino } from '../../../../models/Condomino';
import { CondominoService } from '../../../../services/condomino.service';
import { Propiedad } from '../../../../models/Propiedad';
import { PropiedadService } from '../../../../services/propiedad.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Requerimiento } from '../../../../models/Requerimiento';
import { RequerimientoService } from '../../../../services/requerimiento.service';
import { DetRequerimiento } from '../../../../models/DetRequerimiento';
import { DetrequerimientoService } from '../../../../services/detrequerimiento.service';
import { Mensaje } from '../../../../models/Mensaje';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class CrearComponent implements OnInit {

  CodigoCondominio = 0;
  chosenMod: number;
  ListaServicio: Servicio[] = [];
  ListaCondomino: Condomino[] = [];
  ListaPropiedad: Propiedad[] = [];
  Requerimiento: Requerimiento[] = [];
  DetRequerimiento: DetRequerimiento[] = [];
  DetRequerimientoA: Array<DetRequerimiento> = [];
  lista: Array<any> = [];
  monto = 0;
  RequerimientoForm!: FormGroup;
  Pagination = 0;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  CollapseGeneral = false;
  name = 'Angular';
  selectedId: string;
  selectedRowIds: Set<number> = new Set<number>();

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public servicioService: ServicioService,
    public condominoService: CondominoService,
    public propiedadService: PropiedadService,
    public requerimientoService: RequerimientoService,
    public detRequerumientoService: DetrequerimientoService,
    private snackBar: MatSnackBar,
  ) {
    this.CollapseGeneral = true;
    this.CodigoCondominio = +sessionStorage.getItem('CondominioID');

    this.RequerimientoForm = this.formBuilder.group({
      codigoRequerimiento: ['', [Validators.required]],
      codigoUsuario: ['', [Validators.required]],
      codigoPropiedad: [''],//, [Validators.required]],
      fecha: ['', [Validators.required]],
      monto: ['', [Validators.required]],
      saldo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getLastRequerimiento();
    this.GetCondominos();
    this.getServicios();

    setTimeout(() => (this.staticAlertClosed = true), 20000);

    this._success.subscribe((message) => (this.successMessage = message));
    this._success
      .pipe(debounceTime(5000))
      .subscribe(() => (this.successMessage = ''));
  }

  getLastRequerimiento() {
    this.requerimientoService
      .getLastRequerimiento(this.CodigoCondominio)
      .subscribe((data) => {
        for (const x of data) {
          this.RequerimientoForm.controls['codigoRequerimiento'].setValue(x.codigoRequerimiento);
          this.RequerimientoForm.controls['fecha'].setValue(x.fechaStr);
        }
      });
  }

  GetCondominos() {
    this.condominoService.getCondominos(this.CodigoCondominio).subscribe((data) => {
      this.ListaCondomino = data;
    });
  }

  GetPropiedades() {
    this.propiedadService.getPropiedadesPorCodigoCondomino(+this.RequerimientoForm.get('codigoUsuario')!.value).subscribe((data) => {
      this.ListaPropiedad = data;
    });
  }

  saveRequerimiento() {
    
    if (this.RequerimientoForm.valid === true) {
      const _Requerimiento: Requerimiento = {       
        codigoCondominio: +this.CodigoCondominio,        
        codigoUsuario: +this.RequerimientoForm.get('codigoUsuario')!.value,        
        codigoPropiedad: +this.RequerimientoForm.get('codigoPropiedad')!.value,        
        codigoRequerimiento: +this.RequerimientoForm.get('codigoRequerimiento')!.value,        
        fecha: this.RequerimientoForm.get('fecha')!.value,       
        monto: +this.RequerimientoForm.get('monto')!.value,       
        saldo: +this.RequerimientoForm.get('saldo')!.value,       
        saldoAnterior: +0,
        nombreCondomino: '',
        numeroCasa: '',
        estado: 0,
        fechaStr: '',
        estadoStr: '',
      };

      for (const x of this.getSelectedRows()) {
        const _DetRequerimiento = new DetRequerimiento(
          0,
          +this.RequerimientoForm.get('codigoRequerimiento')!.value,
          x.nombreServicio,
          x.valor
        );

        this.DetRequerimientoA.push(_DetRequerimiento);
      }

      this.requerimientoService.saveRequerimiento(_Requerimiento).subscribe(data => {

         const _mensaje = new Mensaje (
            data['codigo'],
            data['mensaje'],
          );

          if  (_mensaje.codigo === 0) {
            this.openSnackBar(_mensaje.mensaje,_mensaje.codigo.toString());
          }

          if  (_mensaje.codigo === 1) {
            console.log(_mensaje.mensaje);
            this.requerimientoService.saveDetRequerimiento(this.DetRequerimientoA).subscribe((data) => { });
            this.openSnackBar(_mensaje.mensaje,_mensaje.codigo.toString());

            this.RequerimientoForm.controls['codigoUsuario'].setValue('');
            this.RequerimientoForm.controls['codigoPropiedad'].setValue('');
            this.RequerimientoForm.controls['saldo'].setValue('');
            this.RequerimientoForm.controls['monto'].setValue('');

            this.getLastRequerimiento();
          }
      });
    }
  }

  getServicios() {
    this.servicioService
      .getServicios(this.CodigoCondominio)
      .subscribe((data) => {
        this.ListaServicio = data;
      });
  }

  onRowClick(id: number, valor: number) {
    if (this.selectedRowIds.has(id)) {
      this.selectedRowIds.delete(id);
      this.monto = this.monto - valor;
      this.RequerimientoForm.controls['monto'].setValue(this.monto);
      this.RequerimientoForm.controls['saldo'].setValue(this.monto);
    } else {
      this.selectedRowIds.add(id);
      this.monto = this.monto + valor;
      this.RequerimientoForm.controls['monto'].setValue(this.monto);
      this.RequerimientoForm.controls['saldo'].setValue(this.monto);
    }
  }

  rowIsSelected(id: number) {
    return this.selectedRowIds.has(id);
  }

  getSelectedRows() {
    return this.ListaServicio.filter((x) =>
      this.selectedRowIds.has(x.codigoServicio)
    );
  }

  gotoHome(){
    this.router.navigate(['CAPP/administracion/requerimiento-creacion']);  // define your component where you want to go
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2000,});
  }
 
}
