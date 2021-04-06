import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '@app/models';
import { CartService } from './cart.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  rootURL = '/api'

  constructor(private http: HttpClient, private cartService: CartService) {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getEmail() {
    return this.http.get(`${this.rootURL}/users/email`, {
      observe: 'body',
      params: new HttpParams().append('currentUser', localStorage.getItem('currentUser'))
    })
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<User>(`${this.rootURL}/users/login`, { email, password })
      .pipe(map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes, btoa: encode in base-64
        // user.authData = window.btoa(username + ':' + password);
        console.log('this.cartService.positions')
        console.log(this.cartService.positions)
        console.log('user.cart')
        console.log(user.cart)
        if (localStorage.getItem('cart') != null) {
          var parsedCart = JSON.parse(localStorage.getItem('cart'));

          if (this.cartService.positions.length > 0 && user.cart?.positions?.length > 0) {
            user.cart.positions.forEach((part, i) => {
              var index = this.cartService.positions.findIndex(el => el.itemId == part.itemId)
              if (index < 0) {
                this.cartService.positions.push(part)
              } else {
                var quantity = this.cartService.positions[index].quantity
                quantity += 1
                this.cartService.positions[index].quantity = quantity
              }
            })
          } else {
            this.cartService.positions = [...parsedCart['positions'], ...user.cart?.positions];
          }
        } else {
          this.cartService.positions = user.cart?.positions
        }
        this.cartService.cartId = user.cart?._id

        this.cartService.fillFromDB()

        this.cartService.notifySubscribersOfUpdate()

        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }),
      catchError(err => {
        console.log('caught login error and rethrowing', err);
        return throwError(err);
      })
    )
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
