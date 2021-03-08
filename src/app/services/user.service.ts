import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@app/models';
import { tap } from 'rxjs/operators';
import { ViewOptions } from '@app/helpers/view-options';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  rootURL = '/api'
  users: Observable<User[]>

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

  fetchAllWithOptions(options: ViewOptions): Observable<User[]> {
    if (this.users) {
      return this.users.pipe(
        tap(users => {
          users = users.sort((a, b) => {
            const sortOrder = options.sortDirection === 'asc' ? -1 : 1;
            const valueA = a[options.sortField];
            const valueB = b[options.sortField];
            var result = (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
            return result * sortOrder;
          })
        }),
        tap(users => {
          const start = options.page * options.pageSize;
          const end = start + options.pageSize;
          users = users.slice(start, end)
        }))
    } else {
      this.users = this.http.get<User[]>(`${this.rootURL}/users`).pipe(
        tap(users => {
          users = users.sort((a, b) => {
            const sortOrder = options.sortDirection === 'asc' ? -1 : 1;
            const valueA = a[options.sortField];
            const valueB = b[options.sortField];
            var result = (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
            return result * sortOrder;
          })
        }),
        tap(users => {
          const start = options.page * options.pageSize;
          const end = start + options.pageSize;
          users = users.slice(start, end)
        }))
      return this.users
    }
  }

  fetchAll(): Observable<any[]> {
    return this.http.get<User[]>(`${this.rootURL}/users`);
  }
}
