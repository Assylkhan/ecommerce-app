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

  positions: Position[] = [];
  cartId: string;

  constructor(private http: HttpClient) {
    console.log('cartService')
    this.populateCart()
  }

  getCartId() {
    if (this.cartId == null) {
      if (localStorage.getItem('cart') != null) {
        var myCart = JSON.parse(localStorage.getItem('cart'))
        this.cartId = myCart['id']
        return this.cartId;
      }
      return null;
    }
    return this.cartId;
  }

  getPositions() {
    this.populateCart()
    return this.positions
  }

  setCart(cart: Cart) {
    this.positions = cart.positions
    this.cartId = cart._id
    console.log('this.cartId after login')
    console.log(this.cartId)
    var myCart = { 'positions': cart.positions, 'id': cart._id }
    localStorage.setItem('cart', JSON.stringify(myCart));
  }

  clearCart() {
    this.positions = []
    this.cartId = null
    localStorage.removeItem('cart')
    console.log('this.cartId')
    console.log(this.cartId)
  }

  updateCart() {
    if (localStorage.getItem('cart') != null) {
      var myCart = JSON.parse(localStorage.getItem('cart'))
      myCart['positions'] = this.positions
      localStorage.setItem('cart', JSON.stringify(myCart));
    }
  }

  populateCart() {
    if (localStorage.getItem('cart') != null) {
      var parsedCart = JSON.parse(localStorage.getItem('cart'));
      if (parsedCart != null) this.positions = parsedCart['positions'];
    }
  }

  removePositionFromCart(id: string): Observable<any> {
    return this.http.delete(`${this.rootURL}/removePositionFromCart/${id},${this.getCartId()}`).pipe(tap(resp => {
      var index = this.positions.findIndex(el => el.itemId == id)
      if (index > -1) {
        // this.positions.splice(index, 1);
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
          var newQuantity = this.positions[index].quantity + 1
          newPosition.quantity = newQuantity
        }
        this.positions[index] = newPosition
        console.log('newPosition quantity+1')
        console.log(newPosition)
      }
    } else {
      this.positions.push(newPosition)
    }
    this.updateCart()
    console.log('cartId')
    console.log(this.getCartId())

    if (this.getCartId() == null) {
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
