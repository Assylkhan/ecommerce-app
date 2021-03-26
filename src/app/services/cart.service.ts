import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Position } from '@app/models/position.model';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  rootURL = '/api/cart'
  positions: Observable<Position[]>
  cartId: string;

  constructor(
    private http: HttpClient) { }

  fillCart(itemId: string): Observable<any> {
    let position = new Position()
    position.itemId = itemId
    position.quantity = 1
    return this.http.put(`${this.rootURL}/fillUserCart/${this.cartId}`, position);
  }
}
