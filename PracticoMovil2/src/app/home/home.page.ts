import { Component, computed, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonSearchbar, IonRefresherContent, IonChip, IonLabel, IonText, IonGrid, IonCol, IonRow, IonCard, IonSkeletonText, IonCardHeader, IonCardContent, IonIcon, IonBadge, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { PlacesHolderService } from '../services/places-holder-service';
import { Product } from '../models/places-holder.model';
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCardTitle, IonCardSubtitle, IonBadge, IonIcon, IonCardContent, IonCardHeader, 
    IonSkeletonText, IonCard, IonRow, IonCol, IonGrid, IonText, IonLabel, IonChip, 
    IonRefresherContent, IonSearchbar, IonRefresher, IonHeader, IonToolbar, IonTitle, 
    IonContent, NgOptimizedImage, RouterLink, CommonModule],
})
export class HomePage {
  private api = inject(PlacesHolderService);

  categories = signal<string[]>([]);
  selected = signal<string>('Todos');
  products = signal<Product[]>([]);
  search = signal<string>('');
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  filtered = computed(()=> {
    const q = this.search().trim().toLowerCase();
    if(!q) return this.products();
    return this.products().filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(){
    this.api.getCategories().subscribe({
      next: cats => this.categories.set(['Todos', ...cats]),
      error: () => this.error.set('Nose pudieron cargar las categorias'),
    });
  }

  onSelect(cat: string) {
    this.selected.set(cat);
    this.loadProducts(cat === 'Todos' ? undefined : cat);
  }

  loadProducts(category?: string){
    this.loading.set(true);
    this.error.set(null);
    this.api.getProducts(category).subscribe({
      next: prods => this.products.set(prods),
      error: () => this.error.set('No se pudo cargar los productos'),
      complete: () => this.loading.set(false),
    })
  }

  onSearch(ev: CustomEvent) {
    this.search.set((ev.detail as any).value ?? '');
  }

  trackById(_i: number, p: Product) { return p.id; }

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
