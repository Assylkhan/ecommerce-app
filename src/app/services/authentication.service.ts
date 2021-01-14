import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '@app/models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  rootURL = '/api'

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('token')));
    this.currentUser = this.currentUserSubject.asObservable();
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

  login(email: string, password: string) {
    return this.http.post<User>(`${this.rootURL}/users/login`, { email, password })
      .pipe(map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes, btoa: encode in base-64
        // user.authData = window.btoa(username + ':' + password);
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
