import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonList, IonItem } from '@ionic/angular/standalone';
import { PlacesHolderServices } from '../services/places-holder-services';
import { User } from '../models/places-holder.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonItem, IonList, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})
export class HomePage {
  private _placesHolderService = inject(PlacesHolderServices)
  userList: User[] = [];
  private _route = inject(Router);

  ngOnInit(): void {

    this._placesHolderService.getUsers<User>()
    .subscribe((response) =>{
      this.userList = response;
    })
  }
}
