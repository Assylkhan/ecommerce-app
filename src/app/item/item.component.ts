import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Item } from '@app/models';
import { ItemService } from '@app/services';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

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

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
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

}
