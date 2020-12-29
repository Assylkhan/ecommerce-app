import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Item[];
  constructor(private itemService: ItemService) { }

  onClick(item: Item) {
    console.log(`{item.name} clicked`)
  }

  ngOnInit(): void {
    this.itemService.fetchAll().subscribe({
      next: (items) => {
        this.items = items
      },
      error: error => {
        console.log(error)
      }
    })
  }

}
