import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonBadge, IonSpinner } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { PlacesHolderService } from '../services/places-holder-service';
import { Product } from '../models/places-holder.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonBadge, IonIcon, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule]
})
export class ProductDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(PlacesHolderService);

  product = signal<Product | null>(null);
  loading = signal<boolean>(false);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading.set(true);
    this.api.getProduct(id).subscribe({
      next: p => this.product.set(p),
      complete: () => this.loading.set(false),
    })
  }


  stars(rate = 0) {
    const res: string[] = [];
    const full = Math.floor(rate);
    const half = rate - full >= 0.5 ? 1 : 0;
    for (let i = 0; i < full; i++) res.push('star');
    if (half) res.push('star-half');
    while (res.length < 5) res.push('star-outline');
    return res;
  }

}
