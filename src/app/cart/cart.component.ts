import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Position } from '@app/models/position.model';
import { ItemService } from '@app/services';
import { CartService } from '@app/services/cart.service';
import { PositionService } from '@app/services/position.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('positionState', [
      state('active',   style({opacity: 1, transform: 'translateX(0) scale(1)'})),
      state('void',   style({opacity: 0, display: 'none', transform: 'translateX(0) scale(1)'})),
      transition('* => void', [
        animate('1s 8 ease-out', style({
          opacity: 0,
          transform: 'translateX(0) scale(0.5)'
        }))
      ])
    ])
  ]
})
export class CartComponent implements OnInit {
  private subscriptions = new Subscription();
  positions: Position[];
  constructor(
    private cartService: CartService,
    private itemService: ItemService,
    private positionService: PositionService,
    private router: Router) { }

  ngOnInit(): void {
    this.getItems()
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  checkout() {
    this.positionService.positions = this.positions
    this.router.navigate(['/checkout'])
  }

  removeFromCart(position: Position) {
    console.log('position')
    console.log(position)
    this.cartService.removePositionFromCart(position.itemId).subscribe(resp => {
      var index = this.positions.findIndex(el => el.itemId == position.itemId)
      this.positions.splice(index)
      console.log(resp)
    }, err => {
      console.log(err)
    })
  }

  quantityChange(position: Position, quantity) {
    if (quantity < 1) return;
    var inc = false;
    position.quantity = quantity
    this.positionService.positions = this.positions

    this.cartService.addItemToCart(position, inc).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

  getItems(): void {
    this.positions = this.cartService.getPositions()
    var itemIds = []
    this.positions.forEach(position => {
      itemIds.push(position.itemId)
    })
    if (itemIds.length) {
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

}
