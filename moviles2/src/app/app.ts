import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./pages/home/home";
import { ComponenteImagen } from "./pages/componente-imagen/componente-imagen";
import { DatosPersonales } from "./pages/datos-personales/datos-personales";
import { VisualizarDatos } from "./pages/visualizar-datos/visualizar-datos";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, ComponenteImagen, DatosPersonales, VisualizarDatos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bienvenido a angular');
  

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
}
