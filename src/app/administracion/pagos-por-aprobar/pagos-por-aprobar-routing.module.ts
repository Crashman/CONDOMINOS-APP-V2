import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagosPorAprobarComponent } from './pagos-por-aprobar.component';

const routes: Routes = [
    {
        path: '',
        component: PagosPorAprobarComponent,
        data: {
            title: 'Aprobación de pagos',
        },
    }
    ,
    {
        path: 'pagos-por-aprobar',
        component: PagosPorAprobarComponent,
        data: {
            title: 'Aprobación de pagos',
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagosPorAprobarRoutingModule {
}
