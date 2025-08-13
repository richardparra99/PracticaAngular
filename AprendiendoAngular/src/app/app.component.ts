import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MiComponente } from './components/mi-components/mi-componentes.components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MiComponente],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Aprendiendo Angular';
}
