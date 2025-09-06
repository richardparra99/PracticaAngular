import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonInput } from "@ionic/angular/standalone";

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss'],
  imports: [IonInput, IonRow, IonContent, IonGrid, IonCol, FormsModule, ReactiveFormsModule],
})
export class CalculadoraComponent  implements OnInit {
  numero = new FormControl(0, Validators.required);

  // Estado interno
  private total = 0;            // Acumulado / operando izquierdo
  private operacion = "";       // Operador pendiente: '+', '-', 'x', '/'
  private isNewEntry = true;    // Controla si el siguiente dígito reemplaza (true) o concatena (false)

  ngOnInit() {}

  /** Agrega dígitos al input desde los botones (0-9). */
  setNumero(digito: number) {
    if (this.isNewEntry) {
      this.numero.setValue(digito);
      this.isNewEntry = false;
      return;
    }

    const actual = String(this.numero.value ?? 0);
    const next = actual === "0" ? String(digito) : actual + String(digito);
    this.numero.setValue(Number(next));
  }

  /** Define/encadena una operación. */
  setOperacion(operacion: string) {
    // Si lo último que se hizo fue elegir operador, solo actualizarlo
    if (this.isNewEntry) {
      this.operacion = operacion;
      return;
    }

    const valorActual = Number(this.numero.value ?? 0);

    if (this.operacion) {
      // Resolver operación pendiente antes de asignar la nueva
      this.total = this.applyOperation(this.total, valorActual, this.operacion);
    } else {
      // Primera operación: mover número actual a total
      this.total = valorActual;
    }

    this.operacion = operacion;
    this.isNewEntry = true;
    this.numero.setValue(this.total);
  }

  /** Calcula el resultado de la operación pendiente con el número actual. */
  resultado() {
    // Si no hay operador o no hay segundo número, no calcules
    if (!this.operacion || this.isNewEntry) {
      return;
    }

    const valorActual = Number(this.numero.value ?? 0);
    const res = this.applyOperation(this.total, valorActual, this.operacion);

    if (res === Infinity || Number.isNaN(res)) {
      this.clearAll();
      this.numero.setValue(0);
      this.isNewEntry = true;
      return;
    }

    this.total = res;
    this.operacion = "";
    this.numero.setValue(this.total);
    this.isNewEntry = true;
  }

  /** Limpia todo (como 'C'). */
  clearAll() {
    this.total = 0;
    this.operacion = "";
    this.isNewEntry = true;
    this.numero.setValue(0);
  }

  /** Utilidad para aplicar operación segura. */
  private applyOperation(a: number, b: number, op: string): number {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "x": return a * b;
      case "/": return b === 0 ? Infinity : a / b;
      default:  return b;
    }
  }
}
