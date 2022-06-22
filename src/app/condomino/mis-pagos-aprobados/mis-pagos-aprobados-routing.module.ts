import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MisPagosAprobadosComponent } from './mis-pagos-aprobados.component';

const routes: Routes = [
    {
        path: '',
        component: MisPagosAprobadosComponent,
        data: {
            title: 'Pagos Aprobados',
        },
    }
    ,
    {
        path: 'mis-pagos-aprobados',
        component: MisPagosAprobadosComponent,
        data: {
            title: 'Pagos Aprobados',
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MisPagosAprobadosRoutingModule {
}
