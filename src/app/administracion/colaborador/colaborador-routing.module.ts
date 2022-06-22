import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColaboradorComponent } from './colaborador.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';

const routes: Routes = [
    {
        path: '',
        component: ColaboradorComponent,
        data: {
            title: 'Colaboradores',
        },
    }
    ,
    {
        path: 'colaborador',
        component: ColaboradorComponent,
        data: {
            title: 'Colaboradores',
        },
    }
    ,
    {
        path: 'crear',
        component: CrearComponent,
        data: {
            title: 'Registro de Colaborador',
        },
    }
    ,
    {
        path: 'editar/:codigoUsuario',
        component: EditarComponent,
        data: {
            title: 'Datos del Colaborador',
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ColaboradorRoutingModule {
}
