import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MorceauxComponent } from './morceaux/morceaux.component';
import { MorceauDetailsComponent } from './morceau-details/morceau-details.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path: '', component: MorceauxComponent},
  {path: 'morceau-details/:id', component:MorceauDetailsComponent},
  {path: 'add/:idartiste', component:AddComponent},
  {path: 'edit/:id', component:EditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MorceauRoutingModule { }
