import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})
export class ProfileDropdownComponent implements OnInit {
  showDropdown: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  logout() {

  }

}
