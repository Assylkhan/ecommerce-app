import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  showFiller = false;
  menuItems = ['Basic Information', 'Billing Information', 'Change Password']
  selectedItems = ['Basic Information']
  constructor() { }

  ngOnInit(): void {
  }

  changeMenuItem(e) {
    this.selectedItems = [e.value]
  }
}
