import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequerimientosPorAprobarComponent } from './requerimientos-por-aprobar.component';
import { DetalleComponent } from './detalle/detalle.component';
import { PagoComponent } from './pago/pago.component';

const routes: Routes = [
    {
        path: '',
        component: RequerimientosPorAprobarComponent,
        data: {
            title: 'Requerimientos pendientes de aprobación',
        },
    }
    ,
    {
        path: 'requerimientos-por-aprobar',
        component: RequerimientosPorAprobarComponent,
        data: {
            title: 'Requerimientos pendientes de aprobación',
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
export class RequerimientoPorAprobarRoutingModule {
}
