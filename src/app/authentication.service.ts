import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  rootURL = '/api'

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('token')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }

  private getEmail() {
    return this.http.get(`${this.rootURL}/users/email`, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.rootURL}/users/login`, { username, password })
      .pipe(map(token => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes, btoa: encode in base-64
        // user.authData = window.btoa(username + ':' + password);
        localStorage.setItem('currentUser', JSON.stringify(token));
        this.currentUserSubject.next(token);
        return token;
      }))
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
