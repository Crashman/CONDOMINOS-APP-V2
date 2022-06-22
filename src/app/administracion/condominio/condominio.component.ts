import { Component, OnInit } from '@angular/core';
import { Condominio } from '../../../models/Condominio';
import { CondominioService } from '../../../services/condominio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-condominio',
  templateUrl: './condominio.component.html',
  styleUrls: ['./condominio.component.css']
})
export class CondominioComponent implements OnInit {

  _listaCondominio: Condominio[] = [];
  _pagination = 0;
  _searchTerm = '';
  _cantidad = 0;
  panelOpenState = false;

  constructor(
    private CondominioSerive: CondominioService,
    public router: Router
  ) {}

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(val: string) {
    this._searchTerm = val;
    this._listaCondominio = this.filter(val);
  }

  ngOnInit(): void {
    //debugger;
    this.GetCondominios();
  }

  GetCondominios() {
    this.CondominioSerive.getCondominios().subscribe((data) => {
      //debugger;
      this._listaCondominio = data;
      for (const x of data) {
        this._cantidad++;
      }
    });
  }

  deleteCondominio(codigoCondominio: number) {
    if (confirm('¿Confirma que desea ELIMINAR el registro?') === true) {
      this.CondominioSerive.deleteCondominio(codigoCondominio).subscribe(
        (data) => {
          this.GetCondominios();
        }
      );
    }
  }

  filter(v: string) {

    if  (v === '') {
      this.GetCondominios();
    } else {
    return this._listaCondominio.filter(
      (x) =>
      x.nombre.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      x.direccion.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      x.correo.toLowerCase().indexOf(v.toLowerCase()) !== -1 );
    }
  }

}
