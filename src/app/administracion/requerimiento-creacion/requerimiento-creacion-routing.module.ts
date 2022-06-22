import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequerimientoCreacionComponent } from './requerimiento-creacion.component';
import { DetalleComponent } from './detalle/detalle.component';
import { PagoComponent } from './pago/pago.component';
import { CrearComponent } from './crear/crear.component';

const routes: Routes = [
    {
        path: '',
        component: RequerimientoCreacionComponent,
        data: {
            title: 'Creación de requerimientos de cobro',
        },
    }
    ,
    {
        path: 'requerimientos-creacion',
        component: RequerimientoCreacionComponent,
        data: {
            title: 'Creación de requerimientos de cobro',
        },
    }
    ,
    {
        path: 'crear',
        component: CrearComponent,
        data: {
            title: 'Crear Requerimiento de Cobro',
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
export class RequerimientoCreacionRoutingModule {
}
