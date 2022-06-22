import { Component, OnInit } from '@angular/core';
import { Anuncio } from '../../../models/Anuncio';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Mensaje } from '../../../models/Mensaje';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnuncioService } from '../../../services/anuncio.service';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

class ImageSnippet {
  constructor(public src: string, public file?: File) {}
}

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit {

  selectedFile: ImageSnippet;
  selectedFileRead: ImageSnippet;
  _anuncioForm!: FormGroup;
  _listaAnuncio: Anuncio[] = [];
  _panelOpenState = false;
  _codigoCondominio = 0;
  pagination = 0;

  constructor(
    private formBuilder: FormBuilder,
    private anuncioService: AnuncioService,
    private snackBar: MatSnackBar,
    private modalService: NgbModal,
  ) 
  {
    this._codigoCondominio = +sessionStorage.getItem('CondominioID');

    this._anuncioForm = this.formBuilder.group({
      codigoAnuncio: [''],
      descripcion: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.getAnuncios();
  }

  getAnuncios() {
    this.anuncioService
      .getAnuncios(this._codigoCondominio)
      .subscribe((data) => {
        this._listaAnuncio = data;
      });
  }

  getAnuncio(content3: string, codigoAnuncio: number) {
      const _anuncio: Anuncio = {
        codigoCondominio: +this._codigoCondominio,
        codigoAnuncio: +codigoAnuncio,       
        descripcion: this._anuncioForm.get('descripcion')!.value,       
        estado: +this._anuncioForm.get('estado')!.value,       
        estadoStr: '',       
        imagen: '',
      };
      this.anuncioService.getAnuncio(_anuncio).subscribe((data) => {
        for (const x of data) {
          this.modalService.open(content3, { size: 'lg' });
          this.selectedFileRead = new ImageSnippet(x.imagen);
        }
      });
  }

  editAnuncio(codigoAnuncio: number) {

      const _anuncio: Anuncio = {
        codigoCondominio: +this._codigoCondominio,
        codigoAnuncio: +codigoAnuncio,       
        descripcion: this._anuncioForm.get('descripcion')!.value,       
        estado: +this._anuncioForm.get('estado')!.value,       
        estadoStr: '',       
        imagen: '',
      };
      this.anuncioService.getAnuncio(_anuncio).subscribe((data) => {
        for (const x of data) {
          this._anuncioForm.controls['codigoAnuncio'].setValue(x.codigoAnuncio);
          this._anuncioForm.controls['descripcion'].setValue(x.descripcion);
          this._anuncioForm.controls['estado'].setValue(x.estado);
          this.selectedFileRead = new ImageSnippet(x.imagen);
        }
      });
  }

  limpiarAnuncio() {
        this._anuncioForm.controls['codigoAnuncio'].setValue('');
        this._anuncioForm.controls['descripcion'].setValue('');
        this._anuncioForm.controls['estado'].setValue('');
    }

  saveAnuncio() {
   
    if (this._anuncioForm.valid === true) {
      const _anuncio: Anuncio = {
        codigoCondominio: +this._codigoCondominio,
        codigoAnuncio: +this._anuncioForm.get('codigoAnuncio')!.value,       
        descripcion: this._anuncioForm.get('descripcion')!.value,       
        estado: +this._anuncioForm.get('estado')!.value,       
        estadoStr: '',       
        imagen: this.selectedFile.src,
      };

      this.anuncioService.saveAnuncio(_anuncio).subscribe((data) => {
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
        this.limpiarAnuncio();
        this.getAnuncios();
      });
     }
  }

  deleteAnuncio(codigoAnuncio: number) {
      const _anuncio: Anuncio = {
        codigoCondominio: +this._codigoCondominio,
        codigoAnuncio: +codigoAnuncio,       
        descripcion: this._anuncioForm.get('descripcion')!.value,       
        estado: +this._anuncioForm.get('estado')!.value,       
        estadoStr: '',       
        imagen:'',
      };

      if (confirm('¿Confirma que desea ELIMINAR el registro?') === true) {
        this.anuncioService.deleteAnuncio(_anuncio).subscribe((data) => {
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

          this.getAnuncios();
        });
    }
    this.getAnuncios();
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
