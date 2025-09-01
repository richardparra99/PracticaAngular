import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonCardHeader, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";
import { PlacesHolderServices } from '../services/places-holder-services';
import { Post } from '../models/places-holder.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCard, IonCardHeader, CommonModule],
})
export class DetailComponent  implements OnInit {
  private _routerActive = inject(ActivatedRoute);
  private _placesHolderServices = inject(PlacesHolderServices);
  post: Post | null = null;

  ngOnInit() {
    let id = this._routerActive.snapshot.paramMap.get('id') ?? "";
    console.log(id)

    this._placesHolderServices.getPlacesHolderById<Post>(id)
    .subscribe((response: Post) => {
      this.post = response
    })
  }

}
