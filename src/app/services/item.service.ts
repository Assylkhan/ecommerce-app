import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  rootURL = '/api'
  items: Observable<Item[]>

  constructor(private http: HttpClient) { }

  create(item: any): Observable<any> {
    return this.http.post(this.rootURL + '/items', item);
  }

  // postImage(image: File): Observable<boolean> {
  // const formData: FormData = new FormData();
  // formData.append('fileKey', image, image.name);
  // return this.http.post(`${this.rootURL}/dbx`, image)
  // .map(() => {return true})
  // }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.rootURL}/items/${id}`);
  }

  update(item: any): Observable<any> {
    return this.http.put(`${this.rootURL}/items/${item._id}`, item);
  }

  fetchAll(options: ViewOptions): Observable<Item[]> {
    if (this.items) {
      return this.items
    } else {
      this.items = this.http.get<Item[]>(`${this.rootURL}/items`).pipe(
        tap(items => {
          items = items.sort((a, b) => {
            const sortOrder = options.sortDirection === 'asc' ? -1 : 1;
            const valueA = a[options.sortField];
            const valueB = b[options.sortField];
            var result = (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
            return result * sortOrder;
          })
        }))
      return this.items
    }
  }

  fetchFeatured(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.rootURL}/items?featured=1`);
  }

  getItem(id: any): Observable<Item> {
    return this.http.get<Item>(`${this.rootURL}/items/${id}`)
  }
}
