import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesHolderService {
  private _http = inject(HttpClient)
  private baseurl = 'https://fakestoreapi.com'

  getUser<T>(): Observable<T[]> {
    return this._http.get<T[]>(`${this.baseurl}/`)
  }
}
