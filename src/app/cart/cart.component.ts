import { Component, OnInit } from '@angular/core';
import { Item } from '@app/models';
import { ItemService } from '@app/services';
import { CartService } from '@app/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private subscriptions = new Subscription();
  items: Item[];
  constructor(
    private cartService: CartService,
    private itemService: ItemService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  getItem(): void {

    this.cartService.positions.forEach(position => {

    });
    this.subscriptions.add(
      this.itemService.getItem(id).subscribe(item => {
        this.item = item
        if (item.imageUrls.length > 1)
          this.additionalImageUrls = item.imageUrls.slice(1, item.imageUrls.length)
        console.log(this.item.imageUrls)
      })
    );
  }

}
