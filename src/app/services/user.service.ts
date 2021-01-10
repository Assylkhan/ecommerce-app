import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  rootURL = '/api'

  constructor(private http: HttpClient) { }

  create(user: any): Observable<any> {
    return this.http.post(this.rootURL+'/users', user);
  }

  update(user: any): Observable<any> {
    return this.http.put(`${this.rootURL}/users/${user.id}`, user);
  }

  findByEmail(email: any): Observable<any> {
    return this.http.get<User>(`${this.rootURL}/users?email=${email}`);
  }
}