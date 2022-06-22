import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequerimientoAprobacionComponent } from './requerimiento-aprobacion.component';
import { DetalleComponent } from './detalle/detalle.component';
import { PagoComponent } from './pago/pago.component';

const routes: Routes = [
    {
        path: '',
        component: RequerimientoAprobacionComponent,
        data: {
            title: 'Requerimientos de cobro pendientes de aprobación',
        },
    }
    ,
    {
        path: 'requerimientos-por-aprobar',
        component: RequerimientoAprobacionComponent,
        data: {
            title: 'Requerimientos de cobro pendientes de aprobación',
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RequerimientoAprobacionRoutingModule {
}
