import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
{
  path: '',component: LayoutComponent,children: [

    { path: '', redirectTo: 'index', pathMatch: 'full' },

    { path: 'index',component: IndexComponent},

    { path: 'album', loadChildren: ()=>import('./album/album.module')
        .then(m=>m.AlbumModule)},

    { path: 'artist', loadChildren: ()=>import('./artiste/artiste.module')
        .then(m=>m.ArtisteModule)},

    { path: 'morceau', loadChildren: ()=>import('./morceau/morceau.module')
        .then(m=>m.MorceauModule)},
  ]

}





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
