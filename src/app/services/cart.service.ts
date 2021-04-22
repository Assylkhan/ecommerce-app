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
  shipping: number = 15;
  subtotal: number;
  total: number;
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
    var myCart = { 'positions': cart.positions, 'id': cart._id }
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
      localStorage.setItem('cart', JSON.stringify(myCart));
    }
  }

  populateCart() {
    if (localStorage.getItem('cart') != null) {
      var parsedCart = JSON.parse(localStorage.getItem('cart'));
      if (parsedCart != null) this.positions = parsedCart['positions'];
    }
  }

  calculateTotals() {
    var subtotal = 0;
    this.positions.forEach(el => {
      subtotal += (el.quantity * el.item.price)
    })
    this.subtotal = subtotal
    this.total = this.subtotal + this.shipping
  }

  removePositionFromLocalStorage(id: string) {
    var index = this.positions.findIndex(el => el.itemId == id)
    if (index > -1) {
      this.positions.splice(index, 1)
      this.updateCart()
    }
  }

  removePositionFromCart(id: string): Observable<any> {
    if (this.getCartId() == null) {
      return new Observable(observer => {
        this.removePositionFromLocalStorage(id)
        observer.next('deleted');
      })
    } else {
      return this.http.delete(`${this.rootURL}/removePositionFromCart/${id},${this.getCartId()}`).pipe(tap(resp => {
        this.removePositionFromLocalStorage(id)
      }))

    }
  }

  addItemToCart(newPosition: Position, inc: boolean): Observable<any> {
    if (this.positions.length > 0) {
      var index = this.positions.findIndex(el => el.itemId == newPosition.itemId)
      if (index < 0) {
        this.positions.push(newPosition)
      } else {
        if (inc) {
          var newQuantity = this.positions[index].quantity + 1
          newPosition.quantity = newQuantity
        }
        this.positions[index] = newPosition
      }
    } else {
      this.positions.push(newPosition)
    }
    this.updateCart()

    if (this.getCartId() == null) {
      return new Observable(observer => {

        var myCart = { 'positions': this.positions }
        localStorage.setItem('cart', JSON.stringify(myCart));
        var cart = new Cart()
        cart.positions = this.positions
        observer.next(cart);
      })
    } else {
      return this.http.put(`${this.rootURL}/fillUserCart/${this.cartId}`, newPosition)
    }
  }
}
