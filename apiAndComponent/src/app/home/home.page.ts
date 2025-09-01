import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { PlacesHolderServices } from '../services/places-holder-services';
import { Post } from '../models/places-holder.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonList, IonLabel, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})
export class HomePage {
  private _placesHolderServices = inject(PlacesHolderServices)
  _postList: Post[] | null = null;
  private _router = inject(Router);

  ngOnInit(): void {
    this._placesHolderServices.getPlacesHolder<Post>()
    .subscribe((response: Post[]) =>{
      this._postList = response
    })
  }
  detail(id: number) {
    this._router.navigate(['detail', id])
  }
}
