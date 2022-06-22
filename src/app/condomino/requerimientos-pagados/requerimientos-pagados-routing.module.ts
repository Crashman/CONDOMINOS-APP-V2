import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RquerimientosPagadosComponent } from './requerimientos-pagados.component';
import { DetalleComponent } from './detalle/detalle.component';
import { PagoComponent } from './pago/pago.component';

const routes: Routes = [
    {
        path: '',
        component: RquerimientosPagadosComponent,
        data: {
            title: 'Requerimientos de cobro pagados',
        },
    }
    ,
    {
        path: 'mis-requerimiento-pagados',
        component: RquerimientosPagadosComponent,
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
export class RequerimientosPagadosRoutingModule {
}
