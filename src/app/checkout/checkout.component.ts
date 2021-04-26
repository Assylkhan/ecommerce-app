import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '@app/services';
import { CartService } from '@app/services/cart.service';
import { LocationService } from '@app/services/location.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  selectedCountry: string;
  currentStates: string[];
  sameShippingAndBillingAddress = true

  checkoutForm = this.fb.group({
    country: [''],
    firstName: [''],
    lastName: [''],
    email: [''],
    address: [''],
    city: [''],
    state: [''],
    zip: [''],
    phone: ['']
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    public locationService: LocationService,
    public cartService: CartService) { }

  ngOnInit(): void {
    this.checkoutForm.patchValue(this.authService.currentUserValue)
  }

  // convenience getter for easy access to form fields
  get f() { return this.checkoutForm.controls; }

  shppingEqualsBilling(e) {
    console.log(e.checked)
  }

  finalCheckout() {

  }

  countryChange(e) {
    if (this.f.country.value == 'United States of America') {
      this.currentStates = this.locationService.getUsStates()
    } else if (this.f.country.value == 'Canada') {
      this.currentStates = this.locationService.getCanadaStates()
    } else {
      this.currentStates = null;
      // this.f.state.disabled = true
    }
  }

  onSubmit() {

  }

}
