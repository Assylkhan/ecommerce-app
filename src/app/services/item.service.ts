import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  // postImage(image: File): Observable<boolean> {
    // const formData: FormData = new FormData();
    // formData.append('fileKey', image, image.name);
    // return this.http.post(`${this.rootURL}/dbx`, image)
    // .map(() => {return true})
  // }

  update(item: any): Observable<any> {
    return this.http.put(`${this.rootURL}/items/${item.id}`, item);
  }

  fetchAll(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.rootURL}/items`);
  }

  fetchFeatured(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.rootURL}/items?featured=1`);
  }

  getItem(id: any): Observable<Item> {
    return this.http.get<Item>(`${this.rootURL}/items/${id}`)
  }
}
