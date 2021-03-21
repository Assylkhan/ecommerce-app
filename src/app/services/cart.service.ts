import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Position } from '@app/models/position.model';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  rootURL = '/api'
  positions: Observable<Position[]>

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService) { }

  fillCart(position: Position): Observable<any> {
    return this.http.put(`${this.rootURL}/fillUserCart/${this.authService.currentUserValue.id}`, position);
  }
}