import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/places-holder.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesHolderService {
  private _http = inject(HttpClient)
  private baseurl = 'https://fakestoreapi.com'

  getCategories(): Observable<string[]> {
    return this._http.get<string[]>(`${this.baseurl}/products/categories`);
  }

  getProducts(category?: string): Observable<Product[]>{
    const url = category
    ? `${this.baseurl}/products/category/${encodeURIComponent(category)}`
    : `${this.baseurl}/products`;
    return this._http.get<Product[]>(url);
  }

  getProduct(id: number): Observable<Product> {
    return this._http.get<Product>(`${this.baseurl}/products/${id}`);
  }
}
