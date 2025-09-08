import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./product-detail/product-detail.page').then( m => m.ProductDetailPage),
  },
  {
    path: '**', redirectTo: '',
  }

];
