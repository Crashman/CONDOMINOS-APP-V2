import { Component, OnInit } from '@angular/core';
import { Pago } from '../../../../models/Pago';
import { Mensaje } from '../../../../models/Mensaje';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PagoService } from '../../../../services/pago.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Requerimiento } from '../../../../models/Requerimiento';
import { RequerimientoService } from '../../../../services/requerimiento.service';
import { RequerimientoStatus} from 'models/RequerimientoStatus';
import { MatSnackBar } from '@angular/material/snack-bar';


class ImageSnippet {
  constructor(public src: string, public file?: File) {}
}

@Component({
  selector: 'app-pago-requerimientos',
  templateUrl: './pago-requerimientos.component.html',
  styleUrls: ['./pago-requerimientos.component.css'],
})
export class PagoRequerimientosComponent implements OnInit {
  selectedFile: ImageSnippet;
  selectedFileRead: ImageSnippet;
  _pagoForm: FormGroup;
  _pago: Pago[] = [];
  _listaRequerimiento: Requerimiento[];
  _codigoRequerimiento = 0;
  _pagination = 0;
  _collapsePago: Boolean;
  _cantidad = 0;
  PagoRequerimientos: Array<Pago> = [];
  monto = 0;
  _requerimientoForm!: FormGroup;
  _codigoCondominio = 0;
  _codigoUsuario = 0;
  _tipo = '';
  selectedRowIds: Set<number> = new Set<number>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private pagoService: PagoService,
    private modalService: NgbModal,
    private requerimientoService: RequerimientoService,
    private snackBar: MatSnackBar,
  ) {


    this._codigoCondominio = +sessionStorage.getItem('CondominioID');
    this._codigoUsuario = +sessionStorage.getItem('UsuarioID');
    this._tipo = sessionStorage.getItem('Tipo');

    this._collapsePago = true;

    this._pagoForm = this.formBuilder.group({
      codigoPago: ['', [Validators.required]],
      banco: ['', [Validators.required]],
      comprobanteFecha: ['', [Validators.required]],
      comprobantePago: ['', [Validators.required]],
      comprobanteMonto: ['', [Validators.required]],
      fechaPago: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      montoTotal: ['', [Validators.required]],
    });

    this._requerimientoForm = this.formBuilder.group({
      codigoRequerimiento: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      monto: ['', [Validators.required]],
      saldo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    console.log(+this._codigoCondominio);
    this.getRequerimientos();
  }

  getRequerimientos() {

    const Requerimiento = new RequerimientoStatus(
      this._codigoUsuario,
      0 //Creados
    );

    this.requerimientoService.getRequerimientosPorCondominoYEstado(/*this._codigoUsuario, 0)*/ Requerimiento)
      .subscribe((data) => {
        this._listaRequerimiento = data;
        for (const x of data) {
          this._cantidad = 0;
        }
      });
  }

  getRequerimiento(content2: string, codigoRequerimiento: number) {
    this.requerimientoService
      .getRequerimiento(+codigoRequerimiento)
      .subscribe((data) => {
        for (const x of data) {
          this.modalService.open(content2, { size: 'lg' });
          this._requerimientoForm.controls['codigoRequerimiento'].setValue(x.codigoRequerimiento);
          this._requerimientoForm.controls['fecha'].setValue(x.fechaStr);
          this._requerimientoForm.controls['monto'].setValue(x.monto);
          this._requerimientoForm.controls['saldo'].setValue(x.saldo);
        }
      });
  }

  limpiarPago() {
    this._pagoForm.controls['codigoPago'].setValue('');
    this._pagoForm.controls['banco'].setValue('');
    this._pagoForm.controls['comprobanteFecha'].setValue('');
    this._pagoForm.controls['comprobantePago'].setValue('');
    this._pagoForm.controls['comprobanteMonto'].setValue('');
    this._pagoForm.controls['fechaPago'].setValue('');
    this._pagoForm.controls['estado'].setValue('');
    this._pagoForm.controls['montoTotal'].setValue('');
    this.monto = 0;
    this.selectedRowIds.clear();
  }

  savePago() {
    if (this._pagoForm.valid === true) {
      /*const _pago: Pago = {
        codigoCondominio: +this._codigoCondominio,
        codigoCondomino: +this._codigoUsuario,
        codigoRequerimiento: +0,
        codigoPago: +this._pagoForm.get('codigoPago')!.value,
        banco: this._pagoForm.get('banco')!.value,
        comprobanteFecha: this._pagoForm.get('comprobanteFecha')!.value,
        comprobantePago: this._pagoForm.get('comprobantePago')!.value,
        comprobanteMonto: +this._pagoForm.get('comprobanteMonto')!.value,
        fechaPago: this._pagoForm.get('fechaPago')!.value,
        estado: +this._pagoForm.get('estado')!.value,
        fechaPagoStr: '',
        fechaBoletaStr: '',
        montoTotal: +this._pagoForm.get('montoTotal')!.value,
        nombreCondomino: '',
        estadoStr:'',
        imagen: this.selectedFile.src,
      };*/

      for (const x of this.getSelectedRows()) {

        const _PagoRequerimientos = new Pago(
        +sessionStorage.getItem('CondominioID'),
        +this._pagoForm.get('codigoPago')!.value,
        +x.codigoRequerimiento,
        this._pagoForm.get('banco')!.value,
        this._pagoForm.get('comprobanteFecha')!.value,
        this._pagoForm.get('comprobantePago')!.value,
        +this._pagoForm.get('comprobanteMonto')!.value,
        this._pagoForm.get('fechaPago')!.value,
        +this._pagoForm.get('estado')!.value,
        '',
        '',
        '',
        +this._codigoUsuario,
        +this._pagoForm.get('montoTotal')!.value,
        '',
        this.selectedFile.src,
        );

        this.PagoRequerimientos.push(_PagoRequerimientos);
      }

      this.pagoService.savePagoRequerimientos(this.PagoRequerimientos).subscribe(data => {
        const _mensaje = new Mensaje (
          data['codigo'],
          data['mensaje'],
        );

        if  (_mensaje.codigo === 0) {
          this.openSnackBar(_mensaje.mensaje,_mensaje.codigo.toString());
        }

        if  (_mensaje.codigo === 1) {
          this.openSnackBar(_mensaje.mensaje,_mensaje.codigo.toString());
          this.limpiarPago();
        }

      });
    }

  }

  deletePago(codigoPago: number) {
    if (confirm('¿Confirma que desea ELIMINAR el registro?') === true) {
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
            this.limpiarPago();
          }

        });
    }

    this.getRequerimientos();
  }

  newPago(content1: string) {
    this.selectedRowIds.clear();
    this.pagoService.newPagoRequerimientos(this._codigoUsuario).subscribe((data) => {
      for (const x of data) {
        this.modalService.open(content1, { size: 'lg' });
        this._pagoForm.controls['codigoPago'].setValue(x.codigoPago);
        this._pagoForm.controls['banco'].setValue('');
        this._pagoForm.controls['comprobanteFecha'].setValue('');
        this._pagoForm.controls['comprobantePago'].setValue('');
        this._pagoForm.controls['comprobanteMonto'].setValue('');
        this._pagoForm.controls['fechaPago'].setValue(x.fechaPagoStr);
        this._pagoForm.controls['estado'].setValue(x.estado);
        this._codigoCondominio = x.codigoCondomino;
      }
    });
  }

  onRowClick(id: number, valor: number) {
    if (this.selectedRowIds.has(id)) {
      this.selectedRowIds.delete(id);
      this.monto = this.monto - valor;
       this._pagoForm.controls['montoTotal'].setValue(this.monto);
      // this.RequerimientoForm.controls['saldo'].setValue(this.monto);
    } else {
      this.selectedRowIds.add(id);
      this.monto = this.monto + valor;
      this._pagoForm.controls['montoTotal'].setValue(this.monto);
      // this.RequerimientoForm.controls['saldo'].setValue(this.monto);
    }
  }

  rowIsSelected(id: number) {
    return this.selectedRowIds.has(id);
  }

  getSelectedRows() {
    return this._listaRequerimiento.filter((x) =>
      this.selectedRowIds.has(x.codigoRequerimiento)
    );
  }

  gotoHome(){
    this.router.navigate(['CAPP/condomino/requerimientos-por-pagar']);  // define your component where you want to go
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
