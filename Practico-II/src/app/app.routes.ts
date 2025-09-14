import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'movie/new',
    loadComponent: () => import('./movies-forms/movie-form/movie-form.page').then(m => m.MovieFormPage),
  },
  {
    path: 'movie/:id',
    loadComponent: () => import('./movies-forms/movie-form/movie-form.page').then(m => m.MovieFormPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'movie-form',
    loadComponent: () => import('./movies-forms/movie-form/movie-form.page').then( m => m.MovieFormPage)
  },
];
