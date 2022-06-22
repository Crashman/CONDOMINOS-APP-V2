import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequerimientoPagadoComponent } from './requerimiento-pagado.component';
import { DetalleComponent } from './detalle/detalle.component';
import { PagoComponent } from './pago/pago.component';

const routes: Routes = [
    {
        path: '',
        component: RequerimientoPagadoComponent,
        data: {
            title: 'Requerimientos de cobro pagados',
        },
    }
    ,
    {
        path: 'requerimiento-pagado',
        component: RequerimientoPagadoComponent,
        data: {
            title: 'Requerimientos de cobro pagados',
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
export class RequerimientoPagadoRoutingModule {
}
