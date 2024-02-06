import { Routes } from '@angular/router';
import { authGuard } from './_helpers/auth.guard';
import { ErrorComponent } from './_utils/error/error.component';

export const routes: Routes = [

  {
    path: '',loadChildren: () =>import('./auth/auth.module')
    .then(m => m.AuthModule)
  },

  {
    path: 'home',loadChildren: () =>import('./home/home.module')
    .then(m => m.HomeModule),canActivate:[authGuard]
  },

  { path: '**',component: ErrorComponent},

];
