import { Routes } from '@angular/router';

export const AdministracionRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'condominio',
        loadChildren: () => import('app/administracion/condominio/condominio.module').then(m => m.CondominioModule),
        data: {
          title: 'Condominio',
        },
      },
      {
        path: 'colaborador',
        loadChildren: () => import('app/administracion/colaborador/colaborador.module').then(m => m.ColaboradorModule),
        data: {
          title: 'Colaboradores',
        },
      },
      {
        path: 'condominos',
        loadChildren: () => import('app/administracion/condomino/condominos.module').then(m => m.CondominosModule),
        data: {
          title: 'Condominos',
        },
      },
      {
        path: 'propiedades',
        loadChildren: () => import('app/administracion/propiedades/propiedades.module').then(m => m.PropiedadesModule),
        data: {
          title: 'Propiedades',
        },
      },
      {
        path: 'lectura',
        loadChildren: () => import('app/administracion/lectura/lectura.module').then(m => m.LecturaModule),
        data: {
          title: 'Lecturas',
        },
      },
      {
        path: 'anuncio',
        loadChildren: () => import('app/administracion/anuncio/anuncio.module').then(m => m.AnuncioModule),
        data: {
          title: 'Anuncios',
        },
      },
      {
        path: 'pagos-por-aprobar',
        loadChildren: () => import('app/administracion/pagos-por-aprobar/pagos-por-aprobar.module').then(m => m.PagosPorAprobarModule),
        data: {
          title: 'Aprobación de pagos',
        },
      },
      {
        path: 'pagos-aprobados',
        loadChildren: () => import('app/administracion/pagos-aprobados/pagos-aprobados.module').then(m => m.PagosAprobadosModule),
        data: {
          title: 'Pagos Aprobados',
        },
      },
      {
        path: 'pagos-rechazados',
        loadChildren: () => import('app/administracion/pagos-rechazados/pagos-rechazados.module').then(m => m.PagosRechazadosModule),
        data: {
          title: 'Pagos Rechazados',
        },
      },
      {
        path: 'requerimiento-creacion',
        loadChildren: () => import('app/administracion/requerimiento-creacion/requerimiento-creacion.module').then(m => m.RequerimientoCreacionModule),
        data: {
          title: 'Creación de requerimientos de cobro',
        },
      },
      {
        path: 'requerimiento-aprobacion',
        loadChildren: () => import('app/administracion/requerimiento-aprobacion/requerimiento-aprobacion.module').then(m => m.RequerimientoAprobacionModule),
        data: {
          title: 'Requerimientos de cobro pendientes de aprobacion',
        },
      },
      {
        path: 'requerimiento-pagado',
        loadChildren: () => import('app/administracion/requerimiento-pagado/requerimiento-pagado.module').then(m => m.RequerimientoPagadoModule),
        data: {
          title: 'Requerimientos de cobro pagados',
        },
      }
    ]
  }
];
