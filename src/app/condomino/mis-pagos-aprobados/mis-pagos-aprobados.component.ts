import { Component, OnInit, Input } from '@angular/core';
import { Pago } from '../../../models/Pago';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PagoService } from '../../../services/pago.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { Mensaje } from '../../../models/Mensaje';
import { Router } from '@angular/router';

class ImageSnippet {
  constructor(public src: string, public file?: File) {}
}

@Component({
  selector: 'app-mis-pagos-aprobados',
  templateUrl: './mis-pagos-aprobados.component.html',
  styleUrls: ['./mis-pagos-aprobados.component.css']
})
export class MisPagosAprobadosComponent implements OnInit {
  selectedFile: ImageSnippet;
  selectedFileRead: ImageSnippet; 
  private notifier: NotifierService;
  _pagoForm: FormGroup;
  _pago: Pago[] = [];
  _listaPagos: Pago[];
  _codigoRequerimiento = 0;
  _pagination = 0;
  _collapsePago: Boolean;
  _codigoUsuario;
  _codigoCondominio;
  _searchTerm = '';

  constructor(
    private formBuilder: FormBuilder,
    private pagoService: PagoService,
    private activateRoute: ActivatedRoute,
    private modalService: NgbModal,
    notifier: NotifierService,
    public router: Router,
  ) {
    this.notifier = notifier;
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

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(val: string) {
    this._searchTerm = val;
    this._listaPagos = this.filter(val);
  }

  ngOnInit(): void {
    this.getPagos();
  }
  
  /*Aprobado */
  getPagos() {
    this.pagoService.getPagosPorCondomino(this._codigoUsuario, 1).subscribe((data) => {
      this._listaPagos = data;
    });
  }

  getPago(content2: string, codigoCondominio: number, codigoCondomino: number, codigoPago: number, codigoRequerimiento: number) {
    const pago: Pago = {
      codigoCondominio: +codigoCondominio,
      codigoCondomino: +codigoCondomino,
      codigoRequerimiento: +codigoRequerimiento,
      codigoPago: +codigoPago,
      comprobanteMonto: +0,
      banco: '',
      comprobantePago: '',
      estado: 0,
      estadoStr: '',
      comprobanteFecha: new Date(),
      fechaPago: new Date(),
      fechaPagoStr: '',
      fechaBoletaStr: '',
      montoTotal: +0,
      nombreCondomino: '',
      imagen:''
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

  approvePago(codigoPago: number, codigoRequerimiento: number) {
    if (confirm('Desea aprobar el pago?') === true) {
      this.pagoService
        .approvePago(codigoRequerimiento, codigoPago)
        .subscribe(data => {

          const _mensaje = new Mensaje (
            data['codigo'],
            data['mensaje'],
          );

          if  (_mensaje.codigo === 0) {
            this.showNotification('error', _mensaje.mensaje );
          }

          if  (_mensaje.codigo === 1) {
            this.showNotification('success', _mensaje.mensaje );
            this.limpiarPago();
          }

        });
    }
    this.getPagos();
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

  deletePago(codigoPago: number, codigoRequerimiento: number) {
    if (confirm('¿Confirma que desea ELIMINAR el registro?') === true) {
      this.pagoService
        .deletePago(codigoRequerimiento, codigoPago)
        .subscribe(data => {

          const _mensaje = new Mensaje (
            data['codigo'],
            data['mensaje'],
          );

          if  (_mensaje.codigo === 0) {
            this.showNotification('error', _mensaje.mensaje );
          }

          if  (_mensaje.codigo === 1) {
            this.showNotification('success', _mensaje.mensaje );
            this.limpiarPago();
          }

        });
    }
    this.getPagos();
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  public hideOldestNotification(): void {
    this.notifier.hideOldest();
  }

  public hideNewestNotification(): void {
    this.notifier.hideNewest();
  }

  public hideAllNotifications(): void {
    this.notifier.hideAll();
  }

  public hideSpecificNotification(id: string): void {
    this.notifier.hide(id);
  }

  filter(v: string) {

    if  (v === '') {
      this.getPagos();
    } else {
    return this._listaPagos.filter(
      (x) =>
      x.nombreCondomino.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      x.comprobantePago.toLowerCase().indexOf(v.toLowerCase()) !== -1 );
    }
  }

  gotoHome(){
    this.router.navigate(['CAPP/administracion/condominos']);  // define your component where you want to go
  }

  processFile(imageInput: any) {

    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
        this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
  }

}

