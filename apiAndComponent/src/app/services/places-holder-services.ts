
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesHolderServices {
  private _http = inject(HttpClient)
  private baseUrl = "https://jsonplaceholder.typicode.com"

  getPlacesHolder<T>(): Observable<T[]>{
    return this._http.get<T[]>(`${this.baseUrl}/posts`)
  }
  getPlacesHolderById<T>(id: string): Observable<T>{
    return this._http.get<T>(`${this.baseUrl}/posts/${id}`)
  }
}
