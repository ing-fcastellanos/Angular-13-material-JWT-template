import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component'

import { AuthGuard } from '../_helpers';
import { Role } from '../_models';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'main', component: MainComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventariosRoutingModule { }
