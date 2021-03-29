import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Item } from '@app/models';
import { ItemService } from '@app/services';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { CartService } from '@app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@app/confirmation-dialog/confirmation-dialog.component';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  name: string;
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  item: Item;
  featuredItems: Item[];
  additionalImageUrls: String[];
  tiles: Tile[] = [
    { name: 'Details', cols: 3, rows: 1, color: 'lightblue' },
    { name: 'Recommended', cols: 1, rows: 2, color: 'lightgreen' },
    { name: 'Info', cols: 3, rows: 1, color: '#DDBDF1' },
  ];
  loading = false;
  error = '';

  itemForm = this.fb.group({
    quantity: ['', [
      // Validators.required,
      // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]],
  });

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.additionalImageUrls = []
    this.route.params.subscribe((params: Params) => {
      this.getItem()
      this.getFeaturedItems()
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '370px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.router.navigate(['/cart'])
    });
  }

  getFeaturedItems(): void {
    this.subscriptions.add(
      this.itemService.fetchFeatured()
        .subscribe(items => {
          this.featuredItems = items
        })
    )
  }

  getItem(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.subscriptions.add(
      this.itemService.getItem(id).subscribe(item => {
        this.item = item
        if (item.imageUrls.length > 1)
          this.additionalImageUrls = item.imageUrls.slice(1, item.imageUrls.length)
        console.log(this.item.imageUrls)
      })
    );
  }

  addToCart() {
    this.subscriptions.add(
      this.cartService.fillCart(this.item._id).subscribe(
        (user) => {
          // this.router.navigate([this.returnUrl])
          this.openDialog()
        },
        error => {
          this.error = error
          this.loading = false
        }
      )
    )
  }

}
