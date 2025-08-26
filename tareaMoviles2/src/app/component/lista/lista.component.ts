import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TareaComponent } from '../tarea/tarea.component';
import { Tarea } from '../../models/tarea';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, TareaComponent],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {
  @Input() tareas: Tarea[] = [];
  @Output() quitar = new EventEmitter<number>();

  tareaId = (_: number, t: Tarea) => t.id;
}
