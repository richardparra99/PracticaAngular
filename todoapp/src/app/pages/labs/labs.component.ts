import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'hola soy yo de nuevo';
  listas = [
    'Instalar el angular',
    'Crear Proyecto',
    'Crear Componentes'
  ]
}
