import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem } from '@ionic/angular/standalone';
import { UserRepository } from '../repository/userRepository';
import { Conn } from '../services/conn';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {
  userRepository = new UserRepository();
  conn = inject(Conn);
  listUsuario: Usuario[] = []

  ngOnInit(): void {
    this.userRepository.insert(this.conn, "Juan Jose", 22).then(() => {
      this.getListUsuario();
    });
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
}
