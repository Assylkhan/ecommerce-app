import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

const usersUrl = 'http://localhost:8080/api/users'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(user: User): Observable<any> {
    return this.http.post(usersUrl, user);
  }

  findByEmail(email: any): Observable<any> {
    return this.http.get<User>(`${usersUrl}?email=${email}`);
  }
}
