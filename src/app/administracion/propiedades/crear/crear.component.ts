import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Propiedad } from '../../../../models/Propiedad';
import { Router } from '@angular/router';
import { PropiedadService } from '../../../../services/propiedad.service';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Condominio } from '../../../../models/Condominio';
import { CondominioService } from '../../../../services/condominio.service';
import { Condomino } from '../../../../models/Condomino';
import { CondominoService } from '../../../../services/condomino.service';
import { Mensaje } from '../../../../models/Mensaje';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  Propiedad: Propiedad [] = [];
  ListaCondomino: Condomino [] = [];
  ListaCondominio: Condominio[] = [];
  PropiedadForm!: FormGroup;
  CollapseGeneral: boolean;
  CollapsePropiedad: boolean;
  selectedDevice: string | undefined;
  error: string | undefined;
  CodigoCondominio = 0;

  constructor(public formBuilder: FormBuilder,
              public router: Router,
              public propiedadService: PropiedadService,
              public condominioService: CondominioService,
              public condominoService: CondominoService,
              private snackBar: MatSnackBar,
  ) {

    this.CollapseGeneral = true;
    this.CollapsePropiedad = false;
    this.CodigoCondominio = + sessionStorage.getItem('CondominioID');

    this.PropiedadForm = this.formBuilder.group (
      {
      numeroCasa: ['', [Validators.required]],
      codigoCondominio: ['', [Validators.required]],
      codigoUsuario: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      contador: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      lecturaInicial: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    this.GetCondominios();
    this.GetCondominos();
  }

  limpiarPropiedad() {
      this.PropiedadForm.controls['codigoUsuario'].setValue('');
      this.PropiedadForm.controls['codigoCondominio'].setValue('');
      this.PropiedadForm.controls['numeroCasa'].setValue('');
      this.PropiedadForm.controls['direccion'].setValue('');
      this.PropiedadForm.controls['estado'].setValue('');
      this.PropiedadForm.controls['contador'].setValue('');
      this.PropiedadForm.controls['telefono'].setValue('');
      this.PropiedadForm.controls['lecturaInicial'].setValue('');
  }

  savePropiedad() {

    if (this.PropiedadForm.valid === true) {
        const _Propiedad: Propiedad = {
        codigoPropiedad: 0,
        codigoUsuario: +this.PropiedadForm.get('codigoUsuario')!.value,
        codigoCondominio: +this.PropiedadForm.get('codigoCondominio')!.value,
        numeroCasa: this.PropiedadForm.get('numeroCasa')!.value,
        direccion: this.PropiedadForm.get('direccion')!.value,
        estado: this.PropiedadForm.get('estado')!.value,
        contador: this.PropiedadForm.get('contador')!.value,
        telefono: this.PropiedadForm.get('telefono')!.value,
        lecturaInicial: +this.PropiedadForm.get('lecturaInicial')!.value,
        nombreCondomino: '',
        nombreCondominio: '',
        estadoStr:'',
      };

      this.propiedadService.savePropiedad(_Propiedad).subscribe(data => {

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
      this.limpiarPropiedad();
    }
  }

  GetCondominios() {
    this.condominioService.getCondominios().subscribe((data) => {
      this.ListaCondominio = data;
      for (const x of data) {
        console.log(x.codigoCondominio);
      }
    });
  }

  GetCondominos() {
    this.condominoService.getCondominos(this.CodigoCondominio).subscribe((data) => {
      this.ListaCondomino = data;
    });
  }

  gotoHome(){
    this.router.navigate(['CAPP/administracion/propiedades']);  // define your component where you want to go
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2000,});
 }

}
