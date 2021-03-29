import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Position } from '@app/models/position.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  rootURL = '/api/cart'
  positions: Position[] = [];
  cartId: string;

  constructor(
    private http: HttpClient) { }

  fillCart(itemId: string): Observable<any> {
    let newPosition = new Position()
    newPosition.itemId = itemId
    newPosition.quantity = 1
    return this.http.put(`${this.rootURL}/fillUserCart/${this.cartId}`, newPosition).pipe(
      tap(position => {
        var index = this.positions.findIndex(el => el.itemId == position.itemId)
        if (this.positions.length == 0 || index < 0) this.positions.push(position)
        else this.positions[index].quantity += 1;
        console.log(this.positions)
        console.log('this.positions')
      })
    );
  }
}
