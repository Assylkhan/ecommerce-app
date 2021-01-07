import { Component, OnInit } from '@angular/core';
import { Item } from '@app/models';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  items: Item[];

  constructor() { }

  ngOnInit(): void {
  }

}
