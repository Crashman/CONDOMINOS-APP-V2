import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequerimientosPorPagarComponent } from './requerimientos-por-pagar.component';
import { DetalleComponent } from './detalle/detalle.component';
import { PagoComponent } from './pago/pago.component';
import { PagoRequerimientosComponent } from './pago-requerimientos/pago-requerimientos.component';

const routes: Routes = [
    {
        path: '',
        component: RequerimientosPorPagarComponent,
        data: {
            title: 'Requerimientos de cobro pendientes de pago',
        },
    }
    ,
    {
        path: 'mis-requerimientos-pendientes-pago',
        component: RequerimientosPorPagarComponent,
        data: {
            title: 'Requerimientos de cobro pendientes de pago',
        },
    }
    ,
    {
        path: 'detalle/:codigoRequerimiento',
        component: DetalleComponent,
        data: {
            title: 'Detalle de requerimiento',
        },
    }
    ,
    {
        path: 'pago/:codigoRequerimiento',
        component: PagoComponent,
        data: {
            title: 'Pago de requerimiento',
        },
    }
    ,
    {
        path: 'pago-requerimientos',
        component: PagoRequerimientosComponent,
        data: {
            title: 'Pago de requerimientos',
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RequerimientosPorPagarRoutingModule {
}
