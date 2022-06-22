import { Component, OnInit } from '@angular/core';
import { Requerimiento } from '../../../models/Requerimiento';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { Router } from '@angular/router';
import { Condominio } from '../../../models/Condominio';
import { CondominioService } from '../../../services/condominio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequerimientoStatus} from 'models/RequerimientoStatus';

@Component({
  selector: 'app-requerimientos-por-aprobar',
  templateUrl: './requerimientos-por-aprobar.component.html',
  styleUrls: ['./requerimientos-por-aprobar.component.css'],
})
export class RequerimientosPorAprobarComponent implements OnInit {
  _listaRequerimiento: Requerimiento[];
  _listaCondominio: Condominio[] = [];
  _pagination = 0;
  _requerimientoForm!: FormGroup;
  _codigoCondominio = 0;
  _codigoUsuario = 0;
  _tipo = '';
  _searchTerm = '';
  _cantidad = 0;

  constructor(
    private formBuilder: FormBuilder,
    private requerimientoService: RequerimientoService,
    private condominioService: CondominioService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this._codigoCondominio = +sessionStorage.getItem('CondominioID');
    this._codigoUsuario = +sessionStorage.getItem('UsuarioID');
    this._tipo = sessionStorage.getItem('Tipo');

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
    if (this._tipo == '3'  || this._tipo == '4') {
      this.getRequerimientos();
      this.getCondominios();
    }
  }

  generarRequerimientos() {
    if (this._requerimientoForm.valid === true) {
      const _Requerimiento: Requerimiento = {
        codigoCondominio: +this._codigoCondominio,
        // tslint:disable-next-line:no-non-null-assertion
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

      this.requerimientoService
        .generateRequerimientos(_Requerimiento)
        .subscribe((data) => {
          alert(data.toString());
        });
    }
  }

  getRequerimientos() {

    const Requerimiento = new RequerimientoStatus(
      this._codigoUsuario,
      1 //Pendiente de aprobar
    );

    this.requerimientoService
      .getRequerimientosPorCondominoYEstado(/*this._codigoUsuario, 1)*/ Requerimiento)
      .subscribe((data) => {
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
      this.requerimientoService
        .deleteRequerimiento(codigoRequerimiento)
        .subscribe((data) => {
          this.getRequerimientos();
        });
    }
  }

  getCondominios(): Requerimiento[] {
    this.condominioService.getCondominios().subscribe((data) => {
      this._listaCondominio = data;
    });

    return;
  }

  filter(v: string) {
    if (v === '') {
      this.getRequerimientos();
    } else {
      return this._listaRequerimiento.filter(
        (x) =>
          x.numeroCasa.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.nombreCondomino.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.fechaStr.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.estadoStr.toLowerCase().indexOf(v.toLowerCase()) !== -1
      );
    }
  }
}
