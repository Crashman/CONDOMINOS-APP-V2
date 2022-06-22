import { Routes } from '@angular/router';
import { CondominioComponent } from './condominio/condominio.component';

export const CondominoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'condominio',
        component: CondominioComponent,
        data: {
          title: 'Condominio',
        }
      },
      {
        path: 'propietario', 
        //loadChildren: './propietario/propietario.module#PropietarioModule',
        data: {
          title: 'Mi Información',
        },
      },
      {
        path: 'propiedad', 
        loadChildren: () => import('app/condomino/propiedad/propiedad.module').then(m => m.PropiedadModule),
        data: {
          title: 'Mis Propiedades',
        },
      },
      {
        path: 'requerimientos-por-pagar', 
        loadChildren: () => import('app/condomino/requerimientos-por-pagar/requerimientos-por-pagar.module').then(m => m.RequerimientosPorPagarModule),
        data: {
          title: 'Requerimientos de Cobro Pendienres de Pago',
        },
      },
      {
        path: 'requerimientos-pagados', 
        loadChildren: () => import('app/condomino/requerimientos-pagados/requerimientos-pagados.module').then(m => m.RequerimientosPagadosModule),
        data: {
          title: 'Requerimientos de Cobro Pagados',
        },
      },
      {
        path: 'requerimientos-por-aprobar', 
        loadChildren: () => import('app/condomino/requerimientos-por-aprobar/requerimientos-por-aprobar.module').then(m => m.RequerimientosPorAprobarModule),
        data: {
          title: 'Requerimientos de Cobro por Aprobar',
        },
      },
      {
        path: 'mis-pagos-aprobados', 
        loadChildren: () => import('app/condomino/mis-pagos-aprobados/mis-pagos-aprobados.module').then(m => m.MisPagosAprobadosModule),
        data: {
          title: 'Pagos Aprobados',
        },
      },
      {
        path: 'mis-pagos-rechazados', 
        loadChildren: () => import('app/condomino/mis-pagos-rechazados/mis-pagos-rechazados.module').then(m => m.MisPagosRechazadosModule),
        data: {
          title: 'Pagos Rechazados',
        },
      },
    ],
  },
];
