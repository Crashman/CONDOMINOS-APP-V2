import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagosRechazadosComponent } from './pagos-rechazados.component';

const routes: Routes = [
    {
        path: '',
        component: PagosRechazadosComponent,
        data: {
            title: 'Pagos rechazados',
        },
    }
    ,
    {
        path: 'pagos-rechazados',
        component: PagosRechazadosComponent,
        data: {
            title: 'Pagos rechazados',
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagosRechazadosRoutingModule {
}
