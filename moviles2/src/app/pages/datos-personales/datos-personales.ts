import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos-personales',
  imports: [FormsModule],
  template: `
  <div>Formulario</div>
  <div>
    <input [(ngModel)]=correo type="text" id="correo">
  </div>
  <div>
    <input [(ngModel)]=fechaNacimiento type="date" id="fechaNacimiento">
  </div>
  <div>
    <input [(ngModel)]=edad type="number" id="edad">
  </div>
  `,
  styleUrl: './datos-personales.css'
})
export class DatosPersonales {
  @Input() correo = "";
  @Input() fechaNacimiento = "";
  @Input() edad = 0;
}
