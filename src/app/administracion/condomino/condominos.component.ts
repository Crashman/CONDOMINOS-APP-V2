import { Component, OnInit } from '@angular/core';
import { Condomino } from '../../../models/Condomino';
import { CondominoService } from '../../../services/condomino.service';
import { Mensaje } from '../../../models/Mensaje';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-condominos',
  templateUrl: './condominos.component.html',
  styleUrls: ['./condominos.component.css'],
})
export class CondominosComponent implements OnInit {

  _listaCondominos: Condomino[] = [];
  _pagination = 0;
  _searchTerm = '';
  _cantidad = 0;
  _codigoCondominio = 0;

  constructor(
    private condominosSerive: CondominoService,
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
    this._listaCondominos = this.filter(val);
  }

  ngOnInit(): void {
    this.GetCondominos();
  }

  GetCondominos() {
    this.condominosSerive.getCondominos(this._codigoCondominio).subscribe(data => {
      this._listaCondominos = data;
      for (const x of data) {
        this._cantidad++;
      }
    });
  }

  deleteCondomino(codigoUsuario: number) {
    if (confirm('¿Confirma que desea ELIMINAR el registro?') === true) {
      this.condominosSerive.deleteCondomino(codigoUsuario).subscribe(
        data => {

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

          this.GetCondominos();
        }
      );
    }
  }

  filter(v: string) {

    if  (v === '') {
      this.GetCondominos();
    } else {
    return this._listaCondominos.filter(
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
