import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // Asegúrate de que ReactiveFormsModule esté importado

import { AppComponent } from './app.component';
import { LoginComponent } from '@pages/login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule  // Importa ReactiveFormsModule aquí
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }