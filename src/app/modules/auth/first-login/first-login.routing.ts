import { Route } from '@angular/router';
import { AuthFirstLoginComponent } from 'app/modules/auth/first-login/first-login.component';

export const authFirstLoginRoutes: Route[] = [
    {
        path     : '',
        component: AuthFirstLoginComponent
    }
];
