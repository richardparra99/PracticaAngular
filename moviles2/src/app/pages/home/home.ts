import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  readonly nombre = signal<String>("Richard");
  readonly apellido = signal<String>("Parra");
  readonly edad = signal<number>(30);
}
