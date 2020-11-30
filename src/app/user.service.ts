import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './models/user.model';

const usersUrl = 'http://localhost:4200/api'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(user: User): Observable<any> {
    return this.http.post(usersUrl, user);
  }
}
