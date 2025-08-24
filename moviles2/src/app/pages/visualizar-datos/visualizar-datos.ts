import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-visualizar-datos',
  imports: [],
  templateUrl: './visualizar-datos.html',
  styleUrl: './visualizar-datos.css'
})
export class VisualizarDatos {
  readonly correo = signal<String>("Richardparra99@gmail.com");
  readonly fechaNacimiento = signal<String>("06-09-1999")
  readonly edad = signal<number>(25);
}
