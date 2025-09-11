import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonTitle, IonInput, IonButton } from "@ionic/angular/standalone";
import { Conn } from '../services/conn';
import { UserRepository } from '../repository/userRespository';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  imports: [IonInput, IonTitle, IonContent, FormsModule, ReactiveFormsModule, IonButton],
})
export class FormsComponent {
  router = inject(Router);

  form = new FormGroup({
    name: new FormControl("", Validators.required),
    edad: new FormControl(0, Validators.required),
  });

  mensaje = signal("");

  getName(){
    return this.form.get('name') as FormControl;
  }

  getEdad(){
    return this.form.get('edad') as FormControl;
  }

  conn = inject(Conn);
  usuarioRepository = new UserRepository();

  guardarDatos(){
    if(this.form.invalid){
      this.mensaje.set("Los datos no ah sido llenados");
    }
    const {name, edad} = this.form.value;

    this.usuarioRepository.insert(
      this.conn,
      name?? "",
      Number(edad) ?? 0
    ).then(()=>{
      this.router.navigate(["/home"])
    });
  }

}
