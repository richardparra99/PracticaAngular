import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonInput,
  IonButtons, IonBackButton, IonItem, IonLabel, IonButton
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { SqliteServices } from 'src/app/services/sqlite-services';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.page.html',
  styleUrls: ['./movie-form.page.scss'],
  standalone: true,
  imports: [
    IonButton, IonLabel, IonItem, IonBackButton, IonButtons, IonContent,
    IonHeader, IonTitle, ReactiveFormsModule, IonToolbar, CommonModule, FormsModule, IonInput
  ]
})
export class MovieFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private db = inject(SqliteServices);

  isNew = signal<boolean>(true);
  id?: number;

  form = this.fb.group({
    name:        ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
    image:       ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/i)]],
  });

  async ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    this.isNew.set(param === 'new' || param === null);

    if (!this.isNew()) {
      this.id = Number(param);
      const movie = await this.db.getById(this.id);
      if (movie) this.form.patchValue(movie);
    }
  }

  // --- Fallback y normalización para la previsualización ---
  fallback = 'assets/no-image.png';

  private normalizeUrl(v?: string | null) {
    v = (v ?? '').trim();
    return /^https?:\/\//i.test(v) ? v : '';
  }

  get previewSrc() {
    const v = this.form.value.image ?? '';
    return this.normalizeUrl(v) || this.fallback;
  }

  imgFallback(ev: Event) {
    const img = ev.target as HTMLImageElement;
    img.onerror = null;
    img.src = this.fallback;
  }

  async save() {
    if (this.form.invalid) return;

    const r = this.form.getRawValue();
    const value = {
      name: (r.name ?? '').trim(),
      description: (r.description ?? '').trim(),
      image: (r.image ?? '').trim(),
    } as Omit<Movie, 'id'>;

    if (this.isNew()) {
      await this.db.insert(value);
    } else {
      await this.db.update({ id: this.id!, ...value });
    }

    this.router.navigate(['/home']);
  }
}
