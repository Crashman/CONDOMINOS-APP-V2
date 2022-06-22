import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CondominioComponent } from './condominio.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';

const routes: Routes = [
    {
        path: '',
        component: CondominioComponent,
        data: {
            title: 'Condominios',
        },
    }
    ,
    {
        path: 'condominio',
        component: CondominioComponent,
        data: {
            title: 'Condominios',
        },
    }
    ,
    {
        path: 'crear',
        component: CrearComponent,
        data: {
            title: 'Registro de Condominio',
        },
    }
    ,
    {
        path: 'editar/:codigoCondominio',
        component: EditarComponent,
        data: {
            title: 'Datos del Condomninio',
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CondominioRoutingModule {
}
