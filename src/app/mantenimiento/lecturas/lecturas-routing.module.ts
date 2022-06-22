import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LecturasComponent } from './lecturas.component';
import { CrearComponent } from './crear/crear.component';


const routes: Routes = [
    {
        path: '',
        component: LecturasComponent,
        data: {
            title: 'Lecturas',
        },
    }
    ,
    {
        path: 'lecturas',
        component: LecturasComponent,
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
export class LecturasRoutingModule {
}
