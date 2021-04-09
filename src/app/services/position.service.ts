import { Injectable } from '@angular/core';
import { Position } from '@app/models/position.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  positions: Position[];

  constructor() { }
}
