import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Lectura } from '../../../../models/Lectura';
import { LecturaService } from '../../../../services/lectura.service';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Mensaje } from '../../../../models/Mensaje';

class ImageSnippet {
  constructor(public src: string, public file?: File) {}
}

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class CrearComponent implements OnInit {
  selectedFile: ImageSnippet;
  selectedFileRead: ImageSnippet;
  ListaLecturas: Lectura[] = [];
  LecturaForm!: FormGroup;
  CollapseLectura: boolean;
  NuevaLectura: boolean;
  lecturaVal!: number;
  lecturaAnteriorVal!: number;
  consumoMesVal!: number;
  cantidadMetroCubicoVal!: number;
  val1!: number;
  val2!: number;
  val3!: number;
  codigoPropiedad = 0;
  pagination = 0;
  closeResult = '';
  private _success = new Subject<string>();
  staticAlertClosed = true;
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public lecturaService: LecturaService,
    private activateRoute: ActivatedRoute,
    private modalService: NgbModal,
    private snackBar: MatSnackBar,
  ) {

    this.CollapseLectura = true;
    this.NuevaLectura = true;

    this.activateRoute.params.subscribe((params) => {
      this.codigoPropiedad = params['codigoPropiedad'];
    });

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
    this.getLecturas();
    this.onChanges();

    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');

  }

  getLecturas() {
    this.lecturaService.getLecturas(this.codigoPropiedad).subscribe((data) => {
      this.ListaLecturas = data;
    });
  }


  limpiarLectura() {
    this.LecturaForm.controls['codigoLectura'].setValue('');
    this.LecturaForm.controls['fecha'].setValue('');
    this.LecturaForm.controls['lectura'].setValue('');
    this.LecturaForm.controls['lecturaAnterior'].setValue('');
    this.LecturaForm.controls['consumoMes'].setValue('');
    this.LecturaForm.controls['exceso'].setValue('');
    this.LecturaForm.controls['cantidadMetroCubico'].setValue('');
  }

  saveLectura() {
    
    if (this.LecturaForm.valid === true) {
      const lectura: Lectura = {
        codigoPropiedad: +this.codigoPropiedad,       
        codigoLectura: +this.LecturaForm.get('codigoLectura')!.value,       
        fecha: this.LecturaForm.get('fecha')!.value,        
        lectura: +this.LecturaForm.get('lectura')!.value,        
        lecturaAnterior: this.LecturaForm.get('lecturaAnterior')!.value,        
        consumoMes: this.LecturaForm.get('consumoMes')!.value,
        exceso: this.LecturaForm.get('exceso')!.value,
        contador: '',
        fechaStr: '',
        cantidadMetroCubico: 0,
        estado: '',
        imagen: this.selectedFile.src,
      };

      this.lecturaService.saveLectura(lectura).subscribe((data) => {
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
    this.limpiarLectura();
  }

  deleteLectura(codigoLectura: number) {
    if (confirm('¿Confirma que desea ELIMINAR el registro?') === true) {
      this.lecturaService.deleteLectura(codigoLectura).subscribe((data) => {
        const _mensaje = new Mensaje (
          data['codigo'],
          data['mensaje'],
        );

        if  (_mensaje.codigo === 0) {
          this.openSnackBar(_mensaje.mensaje,_mensaje.codigo.toString());
        }

        if  (_mensaje.codigo === 1) {
          this.openSnackBar(_mensaje.mensaje,_mensaje.codigo.toString());
          this.getLecturas();
        }
      });
    }
    this.getLecturas();
  }

  newLectura(content1: string) {
    this.limpiarLectura();
    this.lecturaService.newLectura(this.codigoPropiedad).subscribe((data) => {
      for (const x of data) {
        this.modalService.open(content1, { size: 'lg' });
        this.LecturaForm.controls['codigoLectura'].setValue(x.codigoLectura);
        this.LecturaForm.controls['fecha'].setValue(x.fechaStr);
        this.LecturaForm.controls['lecturaAnterior'].setValue(x.lecturaAnterior);
        this.LecturaForm.controls['consumoMes'].setValue(0);
        this.LecturaForm.controls['exceso'].setValue(0);
        this.LecturaForm.controls['cantidadMetroCubico'].setValue(x.cantidadMetroCubico);
        this.LecturaForm.controls['lectura'].setValue(x.lecturaAnterior + x.cantidadMetroCubico);
      }
    });
  }

  onChanges(): void {
    
    this.LecturaForm.get('lectura')!.valueChanges.subscribe((lectura) => {
      this.lecturaVal = lectura;
      this.lecturaAnteriorVal = this.LecturaForm.get('lecturaAnterior')!.value;
      this.cantidadMetroCubicoVal = this.LecturaForm.get('cantidadMetroCubico')!.value;
      this.consumoMesVal = this.LecturaForm.get('consumoMes')!.value;
      this.val1 = this.lecturaVal - this.lecturaAnteriorVal;
      this.LecturaForm.controls['consumoMes'].setValue(this.val1);
      if  (this.consumoMesVal >= this.cantidadMetroCubicoVal) {
        this.val2 = 0 + this.consumoMesVal - this.cantidadMetroCubicoVal;
      this.LecturaForm.controls['exceso'].setValue(this.val2);
      }
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

  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  gotoHome(){
    this.router.navigate(['CAPP/mantenimiento/lecturas']);  // define your component where you want to go
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
