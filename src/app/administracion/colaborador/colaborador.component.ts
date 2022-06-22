import { Component, OnInit } from '@angular/core';
import { Colaborador } from '../../../models/Colaborador';
import { ColaboradorService } from '../../../services/colaborador.service';
import { Router } from '@angular/router';
import { Mensaje } from '../../../models/Mensaje';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.css']
})
export class ColaboradorComponent implements OnInit {

  _listaColaborador: Colaborador[] = [];
  _pagination = 0;
  _searchTerm = '';
  _cantidad = 0;
  _codigoCondominio = 0;

  constructor(
    private colaboradorSerive: ColaboradorService,
    public router: Router,
    private snackBar: MatSnackBar,
  ) {
    this._codigoCondominio = +sessionStorage.getItem('CondominioID');
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(val: string) {
    this._searchTerm = val;
    this._listaColaborador = this.filter(val);
  }

  ngOnInit(): void {
    this.GetColaboradores();
  }

  GetColaboradores() {
    this.colaboradorSerive.getColaboradores(this._codigoCondominio).subscribe((data) => {
      this._listaColaborador = data;
      for (const x of data) {
        this._cantidad++;
      }
    });
  }

  deleteColaborador(codigoUsuario: number) {
    if (confirm('¿Confirma que desea ELIMINAR el registro?') === true) {
      this.colaboradorSerive.deleteColaborador(codigoUsuario).subscribe(
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

          this.GetColaboradores();
        }
      );
    }
  }

  filter(v: string) {

    if  (v === '') {
      this.GetColaboradores();
    } else {
    return this._listaColaborador.filter(
      (x) =>
      x.nombres.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      x.apellidos.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      x.correo.toLowerCase().indexOf(v.toLowerCase()) !== -1 );
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2000,});
  }
}
