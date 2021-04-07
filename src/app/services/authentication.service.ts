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
    var params = { email, password }

    if (this.cartService.positions.length > 0) {
      params['positions'] = this.cartService.positions
    }

    return this.http.post<User>(`${this.rootURL}/users/login`, params)
      .pipe(map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes, btoa: encode in base-64
        // user.authData = window.btoa(username + ':' + password);
        console.log('this.cartService.positions')
        console.log(this.cartService.positions)
        console.log('user.cart')
        console.log(user.cart)
        if (this.cartService.cartId == null) {
          this.cartService.setCart(user.cart)
        }

        // this.cartService.notifySubscribersOfUpdate()

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
