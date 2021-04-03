import { Component, OnInit } from '@angular/core';
import { Position } from '@app/models/position.model';
import { CartService } from '@app/services/cart.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {

  positions: Position[];
  constructor(
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    console.log(this.cartService.positions)
    // this.cartService.positionsSubject.subscribe(positions => {
    //   this.positions = positions
    // })
  }

}
