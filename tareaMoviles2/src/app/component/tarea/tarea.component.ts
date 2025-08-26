import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarea } from '../../models/tarea';

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent {
  @Input({required: true}) tarea!: Tarea;
  @Output() eliminar = new EventEmitter<number>();
  
  borrar() {
    this.eliminar.emit(this.tarea.id);
  }
}
