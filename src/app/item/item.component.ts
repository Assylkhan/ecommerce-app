import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '@app/models';
import { ItemService } from '@app/services';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

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
export class ItemComponent implements OnInit {
  item: Item;
  tiles: Tile[] = [
    {name: 'Details', cols: 3, rows: 1, color: 'lightblue'},
    {name: 'Info', cols: 1, rows: 2, color: 'lightgreen'},
    {name: 'Recommended', cols: 3, rows: 1, color: '#DDBDF1'},
  ];

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.getItem()
  }

  getItem(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.itemService.getItem(id).subscribe(item => {
      this.item = item
    });
  }

}
