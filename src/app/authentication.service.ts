import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from './models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  rootURL = '/api'

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.rootURL}/users/authenticate`, { username, password })
      .pipe(map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes, btoa: encode in base-64
        user.authData = window.btoa(username + ':' + password);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }))
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
