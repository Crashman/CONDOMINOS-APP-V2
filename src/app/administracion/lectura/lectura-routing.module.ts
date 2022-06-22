import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LecturaComponent } from './lectura.component';
import { CrearComponent } from './crear/crear.component';


const routes: Routes = [
    {
        path: '',
        component: LecturaComponent,
        data: {
            title: 'Lecturas',
        },
    }
    ,
    {
        path: 'lectura',
        component: LecturaComponent,
        data: {
            title: 'Lecturas',
        },
    }
    ,
    {
        path: 'crear/:codigoPropiedad',
        component: CrearComponent,
        data: {
            title: 'Lectura de consumo de agua',
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LecturaRoutingModule {
}
