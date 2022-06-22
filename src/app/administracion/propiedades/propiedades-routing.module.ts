import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropiedadesComponent } from './propiedades.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';

const routes: Routes = [
    {
        path: '',
        component: PropiedadesComponent,
        data: {
            title: 'Propiedades',
        },
    }
    ,
    {
        path: 'Propiedades',
        component: PropiedadesComponent,
        data: {
            title: 'Propiedades',
        },
    }
    ,
    {
        path: 'crear',
        component: CrearComponent,
        data: {
            title: 'Registro de Propiedad',
        },
    }
    ,
    {
        path: 'editar/:codigoPropiedad',
        component: EditarComponent,
        data: {
            title: 'Datos de Propiedad',
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PropiedadesRoutingModule {
}
