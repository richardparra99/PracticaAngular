import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MiComponente } from './components/mi-componente/mi-componente.component';
import { Peliculas } from './components/peliculas/peliculas';
import { Pruebas } from './components/pruebas/pruebas';

@NgModule({
  declarations: [
    App,
    Peliculas,
    Pruebas
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MiComponente
],
  providers: [
    BrowserModule
  ],
  bootstrap: [App]
})
export class AppModule { }
