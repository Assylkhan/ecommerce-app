import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items-dashboard',
  templateUrl: './items-dashboard.component.html',
  styleUrls: ['./items-dashboard.component.scss']
})
export class ItemsDashboardComponent implements OnInit {
  menuItems:MenuItem[] = [
    {name: 'itemsList', showName: 'Items List'},
    {name: 'add-item', showName: 'Add a New Item'}]
  selectedItems = ['Items']

  constructor() { }

  ngOnInit(): void {
  }

  changeMenuItem(e) {
    this.selectedItems = [e.value]
  }
}

interface MenuItem {
  name: string;
  showName: string;
}
