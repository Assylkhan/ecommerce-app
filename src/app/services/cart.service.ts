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
    var myCart = { 'positions': cart.positions }
    localStorage.setItem('cart', JSON.stringify(myCart));
  }

  clearCart() {
    this.positions = []
    this.cartId = null
    localStorage.removeItem('cart')
  }

  updateCart() {
    if (localStorage.getItem('cart') != null) {
      var myCart = JSON.parse(localStorage.getItem('cart'))
      myCart['positions'] = this.positions
      this.setCart(myCart)
    }
  }


  populateCart() {
    if (localStorage.getItem('cart') != null) {
      var parsedCart = JSON.parse(localStorage.getItem('cart'));
      if (parsedCart != null) this.positions = parsedCart['positions'];
    }
  }

  removePositionFromCart(id: string): Observable<any> {
    return this.http.delete(`${this.rootURL}/removePositionFromCart/${id}`).pipe(tap(resp => {
      var index = this.positions.findIndex(el => el._id == id)
      if (index > -1) {
        this.positions.splice(index, 1);
        this.updateCart()
      }
    }))
  }

  updatePosition(position: Position): Observable<any> {
    return this.http.put(`${this.rootURL}/updatePosition/${position.cartId}`, position);
  }

  addItemToCart(newPosition: Position, inc: boolean): Observable<any> {
    if (this.positions.length > 0) {
      var index = this.positions.findIndex(el => el.itemId == newPosition.itemId)
      if (index < 0) {
        this.positions.push(newPosition)
      } else {
        console.log('newPosition')
        console.log(newPosition)
        if (inc) {
          var newQuantity = parseInt(newPosition.quantity.toString()) + 1
          newPosition.quantity = newQuantity
        }
        this.positions[index] = newPosition
        console.log('newPosition quantity+1')
        console.log(newPosition)
      }
    } else {
      this.positions.push(newPosition)
    }

    if (this.cartId == null) {
      return new Observable(observer => {

        var myCart = { 'positions': this.positions }
        localStorage.setItem('cart', JSON.stringify(myCart));
        var cart = new Cart()
        cart.positions = this.positions
        observer.next(cart);
      })
    } else {
      return this.http.put(`${this.rootURL}/fillUserCart/${this.cartId}`, newPosition).pipe(
        tap(position => {
          // var index = this.positions.findIndex(el => el.itemId == position.itemId)
          // if (this.positions.length == 0 || index == null || index < 0) this.positions.push(position)
          // else this.positions[index] = position;
          console.log(this.positions)
          console.log('this.positions')
        })
      );
    }
  }
}
