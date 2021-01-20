import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '@app/models';
import { ItemService } from '@app/services';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  // item: Item;
  private currentItemSubject: BehaviorSubject<Item>;
  public currentItem$: Observable<Item>;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {
    this.currentItemSubject = new BehaviorSubject(new Item());
    this.currentItem$ = this.currentItemSubject.asObservable();
  }

  ngOnInit(): void {
    this.getItem()
  }

  getItem(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.itemService.getItem(id).subscribe(item => {
      // this.item = item
      this.currentItemSubject.next(item);
      console.log(item)
    });
  }

}
