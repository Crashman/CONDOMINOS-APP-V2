import { Component, OnInit } from '@angular/core';
import { Requerimiento } from '../../../models/Requerimiento';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { Router } from '@angular/router';
import { Condominio } from '../../../models/Condominio';
import { CondominioService } from '../../../services/condominio.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Mensaje } from '../../../models/Mensaje';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-requerimiento-aprobacion',
  templateUrl: './requerimiento-aprobacion.component.html',
  styleUrls: ['./requerimiento-aprobacion.component.css']
})
export class RequerimientoAprobacionComponent implements OnInit {

  _listaRequerimiento: Requerimiento[];
  _listaCondominio: Condominio[] = [];
  _pagination = 0;
  _requerimientoForm!: FormGroup;
  _codigoCondominio = +sessionStorage.getItem('CondominioID');
  _searchTerm = '';
  _cantidad = 0;

  constructor(
    private formBuilder: FormBuilder,
    private requerimientoService: RequerimientoService,
    private condominioService: CondominioService,
    private router: Router,
    private modalService: NgbModal,
    private snackBar: MatSnackBar,
  ) {
    this._requerimientoForm = this.formBuilder.group({
      fecha: ['', [Validators.required]],
    });

  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(val: string) {
    this._searchTerm = val;
    this._listaRequerimiento = this.filter(val);
  }


  ngOnInit(): void {
    this.getRequerimientos();
    this.getCondominios();
  }

  generarRequerimientos() {

    if (this._requerimientoForm.valid === true) {
      const _Requerimiento: Requerimiento = {
      codigoCondominio:  +this._codigoCondominio,
      fecha: this._requerimientoForm.get('fecha')!.value,
      codigoUsuario: 0,
      codigoPropiedad: 0,
      codigoRequerimiento: 0,
      saldo: 0,
      monto: 0,
      saldoAnterior: 0,
      fechaStr: '',
      estado: 0,
      numeroCasa: '',
      nombreCondomino: '',
      estadoStr: '',
    };

    this.requerimientoService.generateRequerimientos(_Requerimiento).subscribe(data => {
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

  getRequerimientos () {
    this.requerimientoService.getRequerimientosPorCondominioYEstado(this._codigoCondominio, 1).subscribe((data) => {
       this._listaRequerimiento = data;
       for (const x of data) {
         this._cantidad++;
       }
    });
  }

  RequerimientoModal(content1: string) {
    this.modalService.open(content1, { size: 'lg' });
  }


  deleteRequerimiento(codigoRequerimiento: number) {
    if (confirm('¿Confirma que desea ELIMINAR el registro?') === true) {
      this.requerimientoService.deleteRequerimiento(codigoRequerimiento).subscribe(
        (data) => {

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

          this.getRequerimientos();
        }
      );
    }
  }

  getCondominios(): Requerimiento[] {

    this.condominioService.getCondominios().subscribe((data) => {
      this._listaCondominio = data;
    });

    return ;
  }

  filter(v: string) {

    if  (v === '') {
      this.getRequerimientos();
    } else {
    return this._listaRequerimiento.filter(
      (x) =>
      x.numeroCasa.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      x.nombreCondomino.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      x.fechaStr.toLowerCase().indexOf(v.toLowerCase()) !== -1);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2000,});
  }
}
