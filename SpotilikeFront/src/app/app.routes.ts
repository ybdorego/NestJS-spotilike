import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',loadChildren: () =>import('./auth/auth.module')
    .then(m => m.AuthModule)
  },

  {
    path: 'home',loadChildren: () =>import('./home/home.module')
    .then(m => m.HomeModule)
  }
];
