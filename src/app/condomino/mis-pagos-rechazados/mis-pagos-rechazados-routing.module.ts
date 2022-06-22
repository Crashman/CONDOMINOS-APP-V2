import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MisPagosRechazadosComponent } from './mis-pagos-rechazados.component';

const routes: Routes = [
    {
        path: '',
        component: MisPagosRechazadosComponent,
        data: {
            title: 'Pagos rechazados',
        },
    }
    ,
    {
        path: 'mis-pagos-rechazados',
        component: MisPagosRechazadosComponent,
        data: {
            title: 'Pagos rechazados',
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MisPagosRechazadosRoutingModule {
}
