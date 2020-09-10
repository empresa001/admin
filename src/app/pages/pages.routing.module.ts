
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

// Mantenimiento
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';


const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
          { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas'} },
          { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'} },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema'} },
          { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de Usuario'} },

          // Mantenimientos
          { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios registrados en la aplicacion'} },
          { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Lista de Hospitales'} },
          { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Lista de Hospitales'} },
          { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos Registrados'} },
          { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Medicos Registrados'} },
        ]
      },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
