import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Condominio } from '../../../../models/Condominio';
import { Router } from '@angular/router';
import { CondominioService } from '../../../../services/condominio.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class CrearComponent implements OnInit {
  condominio: Condominio[] = [];
  CondominioForm!: FormGroup;
  Loading: boolean;
  Submitted: boolean;
  CollapseGeneral: boolean;
  selectedDevice: string | undefined;
  error: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public condominioService: CondominioService
  ) {
    this.CollapseGeneral = false;
    this.Loading = false;
    this.Submitted = false;

    this.CondominioForm = this.formBuilder.group({
      codigoCondominio: [''],
      nombre: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      banco: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  
  saveCondominio() {
      if (this.CondominioForm.valid === true) {
        const _Condominio: Condominio = {
        // tslint:disable-next-line:no-non-null-assertion
        codigoCondominio: 0,
        // tslint:disable-next-line:no-non-null-assertion
        nombre: this.CondominioForm.get('nombre')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        nit: this.CondominioForm.get('nit')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        direccion: this.CondominioForm.get('direccion')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        telefono: this.CondominioForm.get('telefono')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        correo: this.CondominioForm.get('correo')!.value,
        banco: this.CondominioForm.get('banco')!.value,
      };

      this.condominioService.saveCondominio(_Condominio).subscribe(data => {
      } );
    }
  }
  gotoHome(){
    this.router.navigate(['CAPP/administracion/condominio']);  // define your component where you want to go
}

}
