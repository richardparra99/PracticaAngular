import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ListaComponent } from './component/lista/lista.component';
import { Tarea } from './models/tarea';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ListaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mis tarea';
  nueva = '';
  tareas: Tarea[] = [];
  private siguienteId = 1;

  agregar(){
    const nombre = this.nueva.trim();
    if(!nombre) return;
    this.tareas = [...this.tareas, {id: this.siguienteId++, nombre}]
    this.nueva = '';
  }

  quitar = (id: number) => {
    this.tareas = this.tareas.filter(t => t.id !== id);
  };
}
