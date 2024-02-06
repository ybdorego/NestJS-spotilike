import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistesComponent } from './artistes/artistes.component';
import { ArtisteDetailsComponent } from './artiste-details/artiste-details.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path: '', component: ArtistesComponent},
  {path: 'artiste-details/:id', component:ArtisteDetailsComponent},
  {path: 'add', component:AddComponent},
  {path: 'edit/:id', component:EditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtisteRoutingModule { }
