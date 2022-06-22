import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropiedadComponent } from './propiedad.component';
import { EditarComponent } from './editar/editar.component';

const routes: Routes = [
    {
        path: '',
        component: PropiedadComponent,
        data: {
            title: 'Mis Propiedades',
        },
    }
    ,
    {
        path: 'propiedad',
        component: PropiedadComponent,
        data: {
            title: 'Mis Propiedades',
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
export class PropiedadRoutingModule {
}
