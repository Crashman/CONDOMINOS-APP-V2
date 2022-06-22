import { Component, OnInit } from '@angular/core';
import { Propiedad } from '../../../models/Propiedad';
import { PropiedadService } from '../../../services/propiedad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-propiedad',
  templateUrl: './propiedad.component.html',
  styleUrls: ['./propiedad.component.css']
})
export class PropiedadComponent implements OnInit {

  _listaPropiedad: Propiedad[] = [];
  _pagination = 0;
  _cantidad = 0;
  _codigoCondominio = 0;
  _codigoUsuario = 0;
  _tipo = '';
  _searchTerm = '';
  filterArray: Propiedad[] | null = null;

  constructor(
    private propiedadService: PropiedadService,
    private router: Router
  ) {

    this._codigoCondominio = +sessionStorage.getItem('CondominioID');
    this._codigoUsuario = +sessionStorage.getItem('UsuarioID');
    this._tipo  = sessionStorage.getItem('Tipo');
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(val: string) {
    this._searchTerm = val;
    this._listaPropiedad = this.filter(val);
  }

  ngOnInit(): void {
    if (this._tipo == '3'  || this._tipo == '4') {
    this.GetPropiedades();
    }
  }

  GetPropiedades() {
    this.propiedadService.getPropiedadesPorCodigoCondomino(this._codigoUsuario).subscribe((data) => {
      this._listaPropiedad = data;
      for (const x of data) {
        this._cantidad++;
      }
      this._cantidad = this._cantidad * 2;
    });
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

}
