import { Routes } from '@angular/router';
import { LecturasModule } from './lecturas/lecturas.module';


export const MantenimientoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'lecturas', 
        loadChildren: () => import('app/mantenimiento/lecturas/lecturas.module').then(m => m.LecturasModule),
        data: {
          title: 'Lecturas',
        },
      }
    ],
  },
];
