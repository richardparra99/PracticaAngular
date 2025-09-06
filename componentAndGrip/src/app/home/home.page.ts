import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenu, IonMenuButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, IonMenuButton, RouterLink],
})
export class HomePage {
  constructor() {}
}
