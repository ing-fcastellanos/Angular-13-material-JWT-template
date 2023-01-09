import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AvisoprivacidadComponent } from './avisoprivacidad/avisoprivacidad.component';

import { AuthGuard } from './_helpers';
import { Role } from './_models';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const adminUsers = () => import('./admin-users/admin-users.module').then(x => x.AdminUsersModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);
const facturacionModule = () => import('./facturacion/facturacion.module').then(x => x.FacturacionModule);
const inventarioModule = () => import('./inventarios/inventarios.module').then(x => x.InventariosModule);
const puntoVentaModule = () => import('./puntoventa/puntoventa-routing.module').then(x => x.PuntoventaRoutingModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'aviso_privacidad', component: AvisoprivacidadComponent },
    { path: 'account', loadChildren: accountModule },
    { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'admin_users', loadChildren: adminUsers, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'facturacion', loadChildren: facturacionModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'inventarios', loadChildren: inventarioModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'puntoventa', loadChildren: puntoVentaModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
