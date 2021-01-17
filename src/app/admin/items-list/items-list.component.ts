import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';

import { Item } from '@app/models';
import { ItemService } from '@app/services';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  items: Item[];
  sortedItems: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.fetchAll().subscribe({
      next: (items) => {
        this.items = items
        this.sortedItems = this.items.slice()
      },
      error: error => {
        console.log(error)
      }
    })
  }

  sortData(sort: Sort) {
    const data = this.items.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedItems = data;
      return;
    }

    this.sortedItems = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'price': return compare(a.price, b.price, isAsc);
        case 'realPrice': return compare(a.realPrice, b.realPrice, isAsc);
        case 'count': return compare(a.count, b.count, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
