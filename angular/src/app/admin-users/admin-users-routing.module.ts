import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './lista/lista.component'
import { EditarComponent } from './editar/editar.component'


const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: ListaComponent },
    { path: 'addedit', component: EditarComponent },
    { path: 'addedit/:id', component: EditarComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsersRoutingModule { }
