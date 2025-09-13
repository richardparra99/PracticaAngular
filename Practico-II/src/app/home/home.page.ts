import { Component, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonItemSliding, IonList, IonItem, IonAvatar, IonLabel, IonBadge, IonItemOptions, IonItemOption, IonIcon, IonFabButton } from '@ionic/angular/standalone';
import { SqliteServices } from '../services/sqlite-services';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonFabButton, IonIcon, IonItemOption, IonItemOptions, IonBadge, IonLabel, IonAvatar, IonItem, IonList, IonItemSliding, IonFab, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  private db = inject(SqliteServices)

  loading = signal<boolean>(false);
  movies = signal<Movie[]>([]);
  error = signal<string | null>(null);

  async load(){
    try {
      this.loading.set(true);
      this.movies.set(await this.db.getAll());
    } catch (e) {
      console.error(e);
      this.error.set('Nose pudo cargar la lista de peliculas')
    } finally {
      this.loading.set(false);
    }
  }

  async remove(m: Movie, sliding: HTMLIonItemSlidingElement){
    await this.db.remove(m.id!);
    await sliding.close();
    await this.load();
  }

  trackById(_: number, m: Movie) {
    return m.id;
  }
}
