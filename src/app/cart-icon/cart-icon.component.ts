import { Component, OnInit } from '@angular/core';
import { CartService } from '@app/services/cart.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {

  constructor(
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    console.log(this.cartService.positions)
  }

}
