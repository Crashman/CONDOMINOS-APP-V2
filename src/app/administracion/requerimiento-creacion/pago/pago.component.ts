import { Component, OnInit } from '@angular/core';
import { Pago } from '../../../../models/Pago';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PagoService } from '../../../../services/pago.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Mensaje } from '../../../../models/Mensaje';
import { Router, ActivatedRoute } from '@angular/router';
import { RequerimientoService } from '../../../../services/requerimiento.service';
import { RequerimientoValidate } from '../../../../models/RequerimientoValidate';
import { MatSnackBar } from '@angular/material/snack-bar';

class ImageSnippet {
  constructor(public src: string, public file?: File) {}
}

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
})
export class PagoComponent implements OnInit {

  selectedFile: ImageSnippet;
  selectedFileRead: ImageSnippet;

  _pagoForm: FormGroup;
  _pago: Pago[] = [];
  _listaPagos: Pago[];
  _codigoRequerimiento = 0;
  _pagination = 0;
  _collapsePago: Boolean;
  _codigoUsuario;
  _codigoCondominio;
  _codigoCondomino;
  _RequerimientoValidacion: RequerimientoValidate;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private pagoService: PagoService,
    private requerimientoService: RequerimientoService,
    private activateRoute: ActivatedRoute,
    private modalService: NgbModal,
    private snackBar: MatSnackBar,
  ) {
    this._codigoUsuario = +sessionStorage.getItem('UsuarioID');
    this._codigoCondominio = +sessionStorage.getItem('CondominioID');
    this._collapsePago = true;
    this.activateRoute.params.subscribe((params) => {
    this._codigoRequerimiento = params['codigoRequerimiento'];
    });

    this._pagoForm = this.formBuilder.group({
      codigoRequerimiento: ['', [Validators.required]],
      codigoPago: ['', [Validators.required]],
      banco: ['', [Validators.required]],
      comprobanteFecha: ['', [Validators.required]],
      comprobantePago: ['', [Validators.required]],
      comprobanteMonto: ['', [Validators.required]],
      fechaPago: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getPagos();
  }

  getPagos() {
    this.pagoService.getPagosPorRequerimiento(this._codigoRequerimiento).subscribe((data) => {
      this._listaPagos = data;
    });
  }

  getPago(content2: string, codigoPago: number) {
    const pago: Pago = {
      codigoCondominio: +this._codigoCondominio,
      codigoCondomino: +this._codigoUsuario,
      codigoRequerimiento: +this._codigoRequerimiento,
      codigoPago: +codigoPago,
      comprobanteMonto: +0,
      banco: '',
      comprobantePago: '',
      estadoStr: '',
      estado:0,
      comprobanteFecha: new Date(),
      fechaPago: new Date(),
      fechaPagoStr: '',
      fechaBoletaStr: '',
      montoTotal: +0,
      nombreCondomino: '',
      imagen:'',
    };

    this.pagoService.getPago(pago).subscribe((data) => {
      for (const x of data) {
        this.modalService.open(content2, { size: 'lg' });
        this._pagoForm.controls['codigoRequerimiento'].setValue(x.codigoRequerimiento);
        this._pagoForm.controls['codigoPago'].setValue(x.codigoPago);
        this._pagoForm.controls['comprobanteMonto'].setValue(x.comprobanteMonto);
        this._pagoForm.controls['banco'].setValue(x.banco);
        this._pagoForm.controls['comprobantePago'].setValue(x.comprobantePago);
        this._pagoForm.controls['estado'].setValue(x.estado);
        this._pagoForm.controls['comprobanteFecha'].setValue(x.fechaBoletaStr);
        this._pagoForm.controls['fechaPago'].setValue(x.fechaPagoStr);
        this.selectedFileRead = new ImageSnippet(x.imagen);
      }
    });
  }

  limpiarPago() {
    this._pagoForm.controls['codigoRequerimiento'].setValue('');
    this._pagoForm.controls['codigoPago'].setValue('');
    this._pagoForm.controls['banco'].setValue('');
    this._pagoForm.controls['comprobanteFecha'].setValue('');
    this._pagoForm.controls['comprobantePago'].setValue('');
    this._pagoForm.controls['comprobanteMonto'].setValue('');
    this._pagoForm.controls['fechaPago'].setValue('');
    this._pagoForm.controls['estado'].setValue('');
  }

  savePago() {
    
    if (this._pagoForm.valid === true) {
      const pago: Pago = {
        codigoCondominio: +this._codigoCondominio,
        codigoCondomino: +this._codigoCondomino,
        codigoRequerimiento: +this._codigoRequerimiento,       
        codigoPago: +this._pagoForm.get('codigoPago')!.value,       
        banco: this._pagoForm.get('banco')!.value,       
        comprobanteFecha: this._pagoForm.get('comprobanteFecha')!.value,       
        comprobantePago: this._pagoForm.get('comprobantePago')!.value,        
        comprobanteMonto: +this._pagoForm.get('comprobanteMonto')!.value,        
        fechaPago: this._pagoForm.get('fechaPago')!.value,        
        estado: this._pagoForm.get('estado')!.value,
        fechaPagoStr: '',
        fechaBoletaStr: '',
        montoTotal: +0,
        nombreCondomino: '',
        estadoStr: '',
        imagen: this.selectedFile.src,
      };
      this.pagoService.savePago(pago).subscribe(data => {
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
    this.limpiarPago();
  }

  deletePago(codigoPago: number) {
    if (confirm('??Confirma que desea ELIMINAR el registro?') === true) {
      this.pagoService
        .deletePago(this._codigoRequerimiento, codigoPago)
        .subscribe(data => {

          const _mensaje = new Mensaje (
            data['codigo'],
            data['mensaje'],
          );
  
          if  (_mensaje.codigo === 0) {
            this.openSnackBar(_mensaje.mensaje,_mensaje.codigo.toString());
          }
  
          if  (_mensaje.codigo === 1) {
            this.openSnackBar(_mensaje.mensaje,_mensaje.codigo.toString());
            this.getPagos();
            this.limpiarPago();
          }
        });
    }

    this.getPagos();
  }

  newPago(content1: string) {

    const Requerimiento = new RequerimientoValidate(
      this._codigoRequerimiento,
      0,
    );

    this.requerimientoService.ValidateRequerimiento(Requerimiento).subscribe(data => {

      const Requerimiento = new RequerimientoValidate (
        data['codigoRequerimiento'],
        data['estado'],
       );

       if(Requerimiento.estado == 0 || Requerimiento.estado == 1)
       {
        this.pagoService.newPago(this._codigoRequerimiento).subscribe((data) => {
          for (const x of data) {
              this.modalService.open(content1, { size: 'lg' });
              this._pagoForm.controls['codigoRequerimiento'].setValue(this._codigoRequerimiento);
              this._pagoForm.controls['codigoPago'].setValue(x.codigoPago);
              this._pagoForm.controls['banco'].setValue('');
              this._pagoForm.controls['comprobanteFecha'].setValue('');
              this._pagoForm.controls['comprobantePago'].setValue('');
              this._pagoForm.controls['comprobanteMonto'].setValue('');
              this._pagoForm.controls['fechaPago'].setValue(x.fechaPagoStr);
              this._pagoForm.controls['estado'].setValue(x.estado);
              this._codigoCondomino = x.codigoCondomino;
          }
        });
       } else {
          this.openSnackBar('??Requerimiento con saldo 0, no es posible aplicar pago!','0');
       }
    });

  }

  gotoHome(){
    this.router.navigate(['CAPP/administracion/requerimiento-creacion']);  // define your component where you want to go
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
