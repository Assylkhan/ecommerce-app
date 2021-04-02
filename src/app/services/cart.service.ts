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

  constructor(private http: HttpClient, private authService: AuthenticationService) {
      console.log('cartService')
      this.populateCart()
  }

  populateCart() {
    // localStorage.setItem('cart', JSON.stringify(cart));
    if (localStorage.getItem('cart') != null) {
      var parsedCart = JSON.parse(localStorage.getItem('cart'));
      if (this.authService.currentUserValue == null) {
        this.cartId = parsedCart['id']
        this.positions = parsedCart['positions']
      } else {
        this.positions = [...this.positions, ...parsedCart['positions']]
      }
    }
  }

  addItemToCart(itemId: string): Observable<any> {
    let newPosition = new Position()
    newPosition.itemId = itemId
    newPosition.quantity = 1
    return this.http.put(`${this.rootURL}/fillUserCart/${this.cartId}`, newPosition).pipe(
      tap(position => {
        var index = this.positions?.findIndex(el => el.itemId == position.itemId)
        if (this.positions.length == 0 || index == null || index < 0) this.positions.push(position)
        else this.positions[index].quantity += 1;
        console.log(this.positions)
        console.log('this.positions')
      })
    );
  }
}
