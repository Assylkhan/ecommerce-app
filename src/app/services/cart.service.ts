import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '@app/models/cart.model';
import { Position } from '@app/models/position.model';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  rootURL = '/api/cart'

  // positionsSubject: Subject<Position[]>;
  positions: Position[] = [];
  cartId: string;

  constructor(private http: HttpClient) {
    console.log('cartService')
    // this.positionsSubject = new Subject();
    this.populateCart()
  }

  setCart(cart: Cart) {
    this.positions = cart.positions
    this.cartId = cart._id
    var myCart = {'positions': cart.positions}
    localStorage.setItem('cart', JSON.stringify(myCart));
  }

  clearCart() {
    this.positions = []
    this.cartId = null
    localStorage.removeItem('cart')
  }

  // notifySubscribersOfUpdate() {
    // this.positionsSubject.next(this.positions);
  // }

  populateCart() {
    // localStorage.setItem('cart', JSON.stringify(cart));
    if (localStorage.getItem('cart') != null) {
      var parsedCart = JSON.parse(localStorage.getItem('cart'));
      if (parsedCart != null) this.positions = parsedCart['positions'];
    }
  }

  addItemToCart(itemId: string): Observable<any> {
    let newPosition = new Position()
    newPosition.itemId = itemId
    newPosition.quantity = 1
    if (this.cartId == null) {
      return new Observable(observer => {
        if (this.positions.length > 0) {
          var index = this.positions.findIndex(el => el.itemId == itemId)
          if (index < 0) {
            this.positions.push(newPosition)
          } else {
            this.positions[index].quantity += 1
          }
        } else {
          this.positions.push(newPosition)
        }
        var myCart = {'positions': this.positions}
        localStorage.setItem('cart', JSON.stringify(myCart));
        var cart = new Cart()
        cart.positions = this.positions
        observer.next(cart);
      })
    } else {
      return this.http.put(`${this.rootURL}/fillUserCart/${this.cartId}`, newPosition).pipe(
        tap(position => {
          var index = this.positions.findIndex(el => el.itemId == position.itemId)
          if (this.positions.length == 0 || index == null || index < 0) this.positions.push(position)
          else this.positions[index].quantity += 1;
          console.log(this.positions)
          console.log('this.positions')
        })
      );
    }
  }
}
