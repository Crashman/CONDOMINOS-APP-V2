import { Component, OnInit } from '@angular/core';
import { Propiedad } from '../../../models/Propiedad';
import { PropiedadService } from '../../../services/propiedad.service';
import { Mensaje } from '../../../models/Mensaje';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css']
})
export class PropiedadesComponent implements OnInit {

  _listaPropiedad: Propiedad[] = [];
  _pagination = 0;
  _cantidad = 0;
  _codigoCondominio = 0;

  _searchTerm = '';
  filterArray: Propiedad[] | null = null;

  constructor(
    private propiedadService: PropiedadService,
    private snackBar: MatSnackBar,
  ) {
    this._codigoCondominio = +sessionStorage.getItem('CondominioID');
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(val: string) {
    this._searchTerm = val;
    this._listaPropiedad = this.filter(val);
  }

  ngOnInit(): void {
    this.GetPropiedades();
  }

  GetPropiedades() {
    this.propiedadService.getPropiedades(this._codigoCondominio).subscribe((data) => {
      this._listaPropiedad = data;
      for (const x of data) {
        this._cantidad++;
      }
    });
  }

  deletePropiedad(codigoPropiedad: number) {
    if (confirm('¿Confirma que desea ELIMINAR el registro?') === true) {
      this.propiedadService.deletePropiedad(codigoPropiedad).subscribe(
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
        });
          
        this.GetPropiedades();
    }
  }

  filter(v: string) {

    if  (v === '') {
      this.GetPropiedades();
    } else {
    return this._listaPropiedad.filter(
      (x) =>
      x.numeroCasa.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      x.nombreCondomino.toLowerCase().indexOf(v.toLowerCase()) !== -1);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2000,});
  }
}
