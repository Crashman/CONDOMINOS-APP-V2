import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LecturaComponent } from './lectura.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LecturaRoutingModule } from './lectura-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CrearComponent } from './crear/crear.component';
import { NotifierModule } from 'angular-notifier';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { helpCenterRoutes } from 'app/modules/admin/apps/help-center/help-center.routing';
import { MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [LecturaComponent, CrearComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    LecturaRoutingModule,
    NgxPaginationModule,
    NotifierModule,
    RouterModule.forChild(helpCenterRoutes),
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FuseAlertModule,
    SharedModule,
    MatSnackBarModule
  ]
})

export class LecturaModule { }
