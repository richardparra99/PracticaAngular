import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonButton } from '@ionic/angular/standalone';
import { UserRepository } from '../repository/userRespository';
import { Conn } from '../services/conn';
import { CommonModule } from '@angular/common';
import { Usuario } from '../models/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
    IonList,
    IonItem,
    IonButton
],
})
export class HomePage implements OnInit{
  userRepository = new UserRepository();
  conn = inject(Conn);
  listUsuario: Usuario[] = []
  router = inject(Router);

  ngOnInit(): void {
    this.getListUsuario();
  }

  getListUsuario(){
    this.userRepository.select(this.conn).then((response) => {
        if(response.rows.length >  0){
          for (let index = 0; index < response.rows.length; index++) {
            const element = response.rows.item(index);
            this.listUsuario.push(element);
          }
        }
      });
  }

  navegarUsuario(){
    this.router.navigate(["/forms"])
  }
}
