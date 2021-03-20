import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemService } from '@app/services';
import { Item } from '@app/models';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  items: Item[];
  constructor(
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  ngOnInit(): void {
    this.subscriptions.add(this.itemService.fetchAll().subscribe({
      next: (items) => {
        this.items = items
      },
      error: error => {
        console.log(error)
      }
    })
    )
  }
}
