import { Component, OnInit } from '@angular/core';
import { Item } from '@app/models';
import { Position } from '@app/models/position.model';
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
  // items: Item[];
  positions: Position[];
  constructor(
    private cartService: CartService,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems()
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  checkout() {
  }

  removeFromCart(position: Position) {

  }

  getItems(): void {
    this.positions = this.cartService.positions
    var itemIds = []
    this.positions.forEach(position => {
      itemIds.push(position.itemId)
    })
    this.subscriptions.add(
      this.itemService.getItems(itemIds).subscribe(items => {

        items.forEach(item => {
          let index = this.positions.findIndex(el => el.itemId == item._id)
          if (index > -1) {
            this.positions[index].item = item
          }
        });

        console.log('items')
        console.log(items)
        console.log('positions')
        console.log(this.positions)

      })
    );
  }

}
