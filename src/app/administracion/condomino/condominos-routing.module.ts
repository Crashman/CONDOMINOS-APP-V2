import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CondominosComponent } from './condominos.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';

const routes: Routes = [
    {
        path: '',
        component: CondominosComponent,
        data: {
            title: 'Condominos',
        },
    }
    ,
    {
        path: 'condominos',
        component: CondominosComponent,
        data: {
            title: 'Condominos',
        },
    }
    ,
    {
        path: 'crear',
        component: CrearComponent,
        data: {
            title: 'Registro de Condominos',
        },
    }
    ,
    {
        path: 'editar/:codigoUsuario',
        component: EditarComponent,
        data: {
            title: 'Datos del Condomino',
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CondominosRoutingModule {
}
