import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 // import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Rutas
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

// Modulos
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

// Servicios
import { ServiceModule } from './services/service.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    ServiceModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

