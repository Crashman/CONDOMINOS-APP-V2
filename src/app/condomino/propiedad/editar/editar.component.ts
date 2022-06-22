import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Propiedad } from '../../../../models/Propiedad';
import { Router, ActivatedRoute } from '@angular/router';
import { PropiedadService } from '../../../../services/propiedad.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Condominio } from '../../../../models/Condominio';
import { CondominioService } from '../../../../services/condominio.service';
import { Condomino } from '../../../../models/Condomino';
import { CondominoService } from '../../../../services/condomino.service';
import { Lectura } from '../../../../models/Lectura';
import { LecturaService } from '../../../../services/lectura.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Mensaje } from '../../../../models/Mensaje';
import { MatSnackBar } from '@angular/material/snack-bar';

class ImageSnippet {
  constructor(public src: string, public file?: File) {}
}

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {
  
  selectedFile: ImageSnippet;
  selectedFileRead: ImageSnippet;
  ListaPropiedad: Propiedad[] = [];
  ListaCondomino: Condomino[] = [];
  ListaCondominio: Condominio[] = [];
  ListaLecturas: Lectura[] = [];
  PropiedadForm!: FormGroup;
  LecturaForm!: FormGroup;
  CollapseGeneral: boolean;
  CollapseLectura: boolean;
  codigoPropiedad = 0;
  pagination = 0;
  CodigoCondominio = 0;

  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public propiedadService: PropiedadService,
    public condominioService: CondominioService,
    public propietarioService: CondominoService,
    public lecturaService: LecturaService,
    private activateRoute: ActivatedRoute,
    private modalService: NgbModal,
    private snackBar: MatSnackBar,
  ) {
    this.CollapseGeneral = true;
    this.CollapseLectura = false;
    this.CodigoCondominio = +sessionStorage.getItem('CondominioID');

    this.activateRoute.params.subscribe((params) => {
      this.codigoPropiedad = params['codigoPropiedad'];
    });

    this.PropiedadForm = this.formBuilder.group({
      codigoPropiedad: [''],
      numeroCasa: ['', [Validators.required]],
      codigoCondominio: ['', [Validators.required]],
      codigoCondomino: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      contador: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      lecturaInicial: ['', [Validators.required]],
    });

    this.PropiedadForm.controls['codigoCondomino'].disable();
    this.PropiedadForm.controls['codigoCondominio'].disable();
    this.PropiedadForm.controls['estado'].disable();

    this.LecturaForm = this.formBuilder.group({
      codigoLectura: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      lectura: ['', [Validators.required]],
      lecturaAnterior: ['', [Validators.required]],
      consumoMes: ['', [Validators.required]],
      exceso: ['', [Validators.required]],
      cantidadMetroCubico: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.GetCondominios();
    this.GetCondominos();
    this.getPropiedad();
    this.getLecturas();

    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
  }

  getPropiedad() {
    this.propiedadService.getPropiedad(this.codigoPropiedad).subscribe(data => {
    for (const x of data) {
      this.PropiedadForm.controls['codigoPropiedad'].setValue(x.codigoPropiedad);
      this.PropiedadForm.controls['numeroCasa'].setValue(x.numeroCasa);
      this.PropiedadForm.controls['codigoCondominio'].setValue(x.codigoCondominio);
      this.PropiedadForm.controls['codigoCondomino'].setValue(x.codigoUsuario);
      this.PropiedadForm.controls['direccion'].setValue(x.direccion);
      this.PropiedadForm.controls['estado'].setValue(x.estado);
      this.PropiedadForm.controls['contador'].setValue(x.contador);
      this.PropiedadForm.controls['telefono'].setValue(x.telefono);
      this.PropiedadForm.controls['lecturaInicial'].setValue(x.lecturaInicial);
    }
  });
}

  savePropiedad() {

    if (this.PropiedadForm.valid === true) {
        const _Propiedad: Propiedad = {
        codigoPropiedad:  +this.PropiedadForm.get('codigoPropiedad')!.value,
        codigoUsuario: +this.PropiedadForm.get('codigoCondomino')!.value,
        codigoCondominio: +this.PropiedadForm.get('codigoCondominio')!.value,
        numeroCasa: this.PropiedadForm.get('numeroCasa')!.value,
        direccion: this.PropiedadForm.get('direccion')!.value,
        estado: this.PropiedadForm.get('estado')!.value,
        contador: this.PropiedadForm.get('contador')!.value,
        telefono: this.PropiedadForm.get('telefono')!.value,
        lecturaInicial: this.PropiedadForm.get('lecturaInicial')!.value,
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
    }
  }

  GetCondominios() {
    this.condominioService.getCondominios().subscribe((data) => {
      this.ListaCondominio = data;
      for (const x of data) {
      }
    });
  }

  GetCondominos() {
    this.propietarioService.getCondominos(this.CodigoCondominio).subscribe((data) => {
      this.ListaCondomino = data;
    });
  }

  getLecturas() {
    this.lecturaService.getLecturas(this.codigoPropiedad).subscribe((data) => {
      this.ListaLecturas = data;
    });
  }

  getLectura(content3: string, codigoLectura: number) {

    const lectura: Lectura = {
      codigoPropiedad: +this.codigoPropiedad,
      codigoLectura: +codigoLectura,
      fecha: new Date(),
      lectura: 0,
      lecturaAnterior: 0,
      consumoMes: 0,
      exceso: 0,
      contador: '',
      fechaStr: '',
      cantidadMetroCubico: 0,
      estado: '',
      imagen: '',
    };

    this.lecturaService.getLectura(lectura).subscribe((data) => {
      for (const x of data) {
        this.modalService.open(content3, { size: 'lg' });
        this.LecturaForm.controls['codigoLectura'].setValue(x.codigoLectura);
        this.LecturaForm.controls['fecha'].setValue(x.fechaStr);
        this.LecturaForm.controls['lectura'].setValue(x.lectura);
        this.LecturaForm.controls['lecturaAnterior'].setValue(x.lecturaAnterior);
        this.LecturaForm.controls['consumoMes'].setValue(x.consumoMes);
        this.LecturaForm.controls['exceso'].setValue(x.exceso);
        this.LecturaForm.controls['cantidadMetroCubico'].setValue(x.cantidadMetroCubico);
        this.selectedFileRead = new ImageSnippet(x.imagen);
      }
    });

  }

  gotoHome(){
    this.router.navigate(['CAPP/condomino/propiedad']);  // define your component where you want to go
  }

  processFile(imageInput: any) {

    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
        this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2000,});
 }
}
