import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  rootURL = '/api'

  constructor(private http: HttpClient) { }

  create(order: any): Observable<any> {
    return this.http.post(this.rootURL+'/orders', order);
  }

  update(order: any): Observable<any> {
    return this.http.put(`${this.rootURL}/users/${order.id}`, order);
  }

  findAllByUserId(id: any): Observable<any> {
    return this.http.get<Order>(`${this.rootURL}/orders/users/${id}`);
  }

}
