import { Component, OnInit, Input } from '@angular/core';
import { Pago } from '../../../../models/Pago';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { PagoService } from '../../../../services/pago.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  _success = new Subject<string>();
  _staticAlertClosed = false;
  _successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private pagoService: PagoService,
    private activateRoute: ActivatedRoute,
    private modalService: NgbModal,
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

  gotoHome(){
    this.router.navigate(['CAPP/administracion/requerimiento-pagado']);  // define your component where you want to go
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
