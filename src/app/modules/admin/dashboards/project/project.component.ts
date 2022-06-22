import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Anuncio } from '../../../../../models/Anuncio';
import { AnuncioService } from '../../../../../services/anuncio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HelpCenterService } from 'app/modules/admin/apps/help-center/help-center.service';
import { FaqCategory } from 'app/modules/admin/apps/help-center/help-center.type';

class ImageSnippet {
    constructor(public src: string, public file?: File) {}
  }

@Component({
    selector       : 'project',
    templateUrl    : './project.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit, OnDestroy
{
    selectedFile: ImageSnippet;
    selectedFileRead: ImageSnippet;
    _anuncioForm!: FormGroup;
    _listaAnuncio: Anuncio[] = [];
    _panelOpenState = false;
    _codigoCondominio = 0;
    _UsuarioForm!: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    faqCategory: FaqCategory;

    /**
     * Constructor
     */
    constructor(
        private _helpCenterService: HelpCenterService,
        private formBuilder: FormBuilder,
        private anuncioService: AnuncioService,
    )
    {
        this._codigoCondominio = +sessionStorage.getItem('CondominioID');

        this._UsuarioForm = this.formBuilder.group (
            {
            nombres: [''],
            correo: [''],
          });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._UsuarioForm.controls['nombres'].setValue(sessionStorage.getItem("Nombre"));
        this._UsuarioForm.controls['correo'].setValue(sessionStorage.getItem("Correo"));   
        
        this._UsuarioForm.controls['nombres'].disable();
        this._UsuarioForm.controls['correo'].disable();   

        this.GetAnuncio(); 

        this._helpCenterService.faqs$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((faqCategories) => {
                this.faqCategory = faqCategories[0];
            });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }


    GetAnuncio() {

        const _anuncio: Anuncio = {
          codigoCondominio: +this._codigoCondominio,
          codigoAnuncio: 1,       
          descripcion: "",       
          estado: 0,       
          estadoStr: '',       
          imagen: '',
        };
        this.anuncioService.getAnuncio(_anuncio).subscribe((data) => {
          for (const x of data) {
            this.selectedFileRead = new ImageSnippet(x.imagen);
          }
        });
    }

      processFile(imageInput: any) {

        const file: File = imageInput.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
            this.selectedFile = new ImageSnippet(event.target.result, file);
        });
        reader.readAsDataURL(file);
      }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

}
