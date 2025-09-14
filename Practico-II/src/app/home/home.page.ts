import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonItemSliding, IonList, IonItem, IonAvatar, IonLabel, IonBadge, IonItemOptions, IonItemOption, IonIcon, IonFabButton } from '@ionic/angular/standalone';
import { SqliteServices } from '../services/sqlite-services';
import { Movie } from '../models/movie.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonFabButton, IonIcon, IonItemOption, IonItemOptions, 
    IonBadge, IonLabel, IonAvatar, IonItem, IonList, IonItemSliding, 
    IonFab, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, CommonModule],
})
export class HomePage implements OnInit{
  private db = inject(SqliteServices)

  @ViewChild('list', { read: IonList }) list?: IonList; // 👈 referencia al IonList

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

  async remove(m: Movie) {                       // 👈 sin el parámetro "sliding"
    await this.db.remove(m.id!);
    await this.list?.closeSlidingItems();        // 👈 cierra cualquier sliding abierto
    await this.load();
  }

  normalizeUrl(v?: string | null) {
    v = (v ?? '').trim();
    if (!v) return '';                     // fuerza placeholder si viene vacío
    if (!/^https?:\/\//i.test(v)) return '';// si no empieza con http/https usa placeholder
    return v;
  }

  onImgError(ev: Event) {
    const img = ev.target as HTMLImageElement;
    img.onerror = null;               // evita loops si falla también el placeholder
    img.src = this.fallback;
  }

  trackById(_: number, m: Movie) { return m.id; }
}
