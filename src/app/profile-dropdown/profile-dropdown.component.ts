import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services';
import { CartService } from '@app/services/cart.service';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})
export class ProfileDropdownComponent implements OnInit {
  showDropdown: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
    this.cartService.clearCart()
    this.router.navigate(['/'])
  }

}
