import { Component, OnInit } from '@angular/core';
import { ItemService } from '@app/services';
import { Item } from '@app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Item[];
  constructor(
    private itemService: ItemService,
    private router: Router
    ) { }

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
