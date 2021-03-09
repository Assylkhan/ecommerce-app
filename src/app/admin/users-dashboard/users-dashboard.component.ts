import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.scss']
})
export class UsersDashboardComponent implements OnInit {

  menuItems:MenuItem[] = [
    {name: 'usersList', showName: 'Users List'},
    {name: 'add-user', showName: 'Add a New User'}]
  selectedUsers = ['Users']

  constructor() { }

  ngOnInit(): void {
  }

  changeMenuItem(e) {
    this.selectedUsers = [e.value]
  }
}

interface MenuItem {
  name: string;
  showName: string;
}
