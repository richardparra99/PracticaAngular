import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonItemSliding, IonList,
  IonItem, IonLabel, IonItemOptions, IonItemOption,
  IonFabButton, IonThumbnail, IonImg } from '@ionic/angular/standalone';
import { SqliteServices } from '../services/sqlite-services';
import { Movie } from '../models/movie.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonImg, 
    IonFabButton, IonItemOption, IonItemOptions, IonLabel, IonItem, IonList, IonItemSliding,
    IonThumbnail, IonFab, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, CommonModule
  ],
})
export class HomePage implements OnInit{
  private db = inject(SqliteServices)

  @ViewChild('list', { read: IonList }) list?: IonList;

  fallback = 'assets/no-image.png';
  loading = signal<boolean>(false);
  movies  = signal<Movie[]>([]);
  error   = signal<string | null>(null);

  async ngOnInit() {
    await this.load();
  }

  async load() {
    try {
      this.loading.set(true);
      this.movies.set(await this.db.getAll());
    } catch (e) {
      console.error(e);
      this.error.set('No se pudo cargar la lista de películas');
    } finally {
      this.loading.set(false);
    }
  }

  async remove(m: Movie) {                     
    await this.db.remove(m.id!);
    await this.list?.closeSlidingItems();       
    await this.load();
  }


  normalizeUrl(v?: string | null) {
    v = (v ?? '').trim();
    if (!v) return '';                     
    if (!/^https?:\/\//i.test(v)) return '';
    return v;
  }

  ionViewWillEnter() {
    this.load();
  }


  onImgError(ev: Event) {
    const img = ev.target as HTMLImageElement;
    img.onerror = null;               
    img.src = this.fallback;
  }

  trackById(_: number, m: Movie) { return m.id; }
}
