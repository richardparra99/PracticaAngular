import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesHolderServices {
  private _http = inject(HttpClient)
  private baseUrl = 'https://jsonplaceholder.typicode.com'

  getUsers<T>(): Observable<T[]>{
    return this._http.get<T[]>(`${this.baseUrl}/users`)
  }

  getUserById<T>(id: number): Observable<T>{
    return this._http.get<T>(`${this.baseUrl}/users/${id}`)
  }
}
