
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
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';


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
          { path: 'busquedageneral/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas'} },

          // Mantenimientos
          { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Lista de Hospitales'} },
          { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Lista de Hospitales'} },
          { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos Registrados'} },
          { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Medicos Registrados'} },

          // Rutas Mantenimiento
          { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Usuarios registrados en la aplicacion'} },
        ]
      },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
