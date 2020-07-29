import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';


import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { PagesRoutingModule } from './pages.routing.module';
import { CommonModule } from '@angular/common';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

// Temporal
// import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';

// Graficas temporal
import { ChartsModule } from 'ng2-charts';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        // IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        NopagefoundComponent,

    ],
    exports: [
        PagesComponent, // aumentado para nueva version AA
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        PagesRoutingModule,
        ComponentsModule, // Recien importado con la nueva version AA
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})

export class PagesModule { }