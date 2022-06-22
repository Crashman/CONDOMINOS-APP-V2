import { Component, OnInit } from '@angular/core';
import { Propiedad } from '../../../models/Propiedad';
import { LecturaService } from '../../../services/lectura.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lecturas',
  templateUrl: './lecturas.component.html',
  styleUrls: ['./lecturas.component.css']
})
export class LecturasComponent implements OnInit {

  _listaPropiedad: Propiedad[] = [];
  _searchTerm = '';
  _filterArray: Propiedad[] | null = null;
  _pagination = 0;
  _cantidad = 0;

  constructor(
    private lecturaService: LecturaService,
    public router: Router
  ) {}

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

  GetPropiedades(codigoCondominio?: number ) {
    this.lecturaService.getContadores(codigoCondominio).subscribe((data) => {
      this._listaPropiedad = data;
      for (const x of data) {
        this._cantidad++;
      }
    });
  }

  filter(v: string) {
    if  (v === '') {
      this.GetPropiedades();
    } else {
    return this._listaPropiedad.filter(
      (x) =>
      x.numeroCasa.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      x.contador.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      x.estadoStr.toLowerCase().indexOf(v.toLowerCase()) !== -1  );
    }
  }

}
