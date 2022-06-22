import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagosAprobadosComponent } from './pagos-aprobados.component';

const routes: Routes = [
    {
        path: '',
        component: PagosAprobadosComponent,
        data: {
            title: 'Pagos Aprobados',
        },
    }
    ,
    {
        path: 'pagos-aprobados',
        component: PagosAprobadosComponent,
        data: {
            title: 'Pagos Aprobados',
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagosAprobadosRoutingModule {
}
