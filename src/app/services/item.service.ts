import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  rootURL = '/api'

  constructor(private http: HttpClient) { }

  create(item: any): Observable<any> {
    return this.http.post(this.rootURL+'/items', item);
  }

  update(item: any): Observable<any> {
    return this.http.put(`${this.rootURL}/items/${item.id}`, item);
  }

  fetchAll(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.rootURL}/items`);
  }
}
