import { animate, sequence, state, style, transition, trigger } from '@angular/animations';
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
    trigger('anim', [
      // state('active',   style({opacity: 1, transform: 'translateX(0) scale(1)'})),
      transition('* => void', [
        style({ height: '*', opacity: '1', transform: 'translateX(0)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)'}),
        sequence([
          animate(".25s ease", style({ height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none'  })),
          animate(".1s ease", style({ height: '0', opacity: 0, transform: 'translateX(20px)', 'box-shadow': 'none'  }))
        ])
      ])
    ])
  ]
})
export class CartComponent implements OnInit {
  private subscriptions = new Subscription();
  positions: Position[];
  subtotal: number;
  total: number;

  constructor(
    public cartService: CartService,
    private itemService: ItemService,
    private positionService: PositionService,
    private router: Router) { }

  ngOnInit(): void {
    this.getItems()
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  updateTotals() {
    this.cartService.calculateTotals()
    this.subtotal = this.cartService.subtotal
    this.total = this.cartService.total
  }

  checkout() {
    this.positionService.positions = this.positions
    this.router.navigate(['/checkout'])
  }

  removeFromCart(position: Position) {
    console.log('position')
    console.log(position)
    this.cartService.removePositionFromCart(position.itemId).subscribe(resp => {
      // todo: understand why a change on service positions changes positions in here
      // var index = this.positions.findIndex(el => el.itemId == position.itemId)
      // this.positions.splice(index)
      this.updateTotals()
      console.log(resp)
    }, err => {
      console.log(err)
    })
  }

  quantityChange(position: Position, quantity) {
    if (quantity < 1) return;
    var inc = false;
    position.quantity = quantity
    position.sum = position.item.price * quantity
    this.positionService.positions = this.positions

    this.cartService.addItemToCart(position, inc).subscribe(res => {
      this.updateTotals()
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
              this.positions[index].sum = item.price * this.positions[index].quantity
            }
          });

          this.updateTotals()
          console.log('items')
          console.log(items)
          console.log('positions')
          console.log(this.positions)

        })
      );
    }
  }

}
