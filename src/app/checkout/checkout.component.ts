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
  selectedShippingCountry: string;
  currentShippingStates: string[];
  sameShippingAndBillingAddress = true

  checkoutForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    country: [''],
    state: {value: '', disabled: true},
    city: [''],
    address: [''],
    zip: [''],
    shipping_country: [''],
    shipping_state: {value: '', disabled: true},
    shipping_city: [''],
    shipping_address: [''],
    shipping_zip: [''],
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

  countryChange(field_name) {
// todo: finish checkout
    var states:string[] = []
    var country = ''
    var currentStateField;

    if (field_name == 'shipping_country') {
      country = this.f.country.value
      currentStateField = this.f.shipping_state
    } else if (field_name == 'country') {
      country = this.f.shipping_country.value
      currentStateField = this.f.state
    }

    if (country == 'United States of America') {
      states = this.locationService.getUsStates()
      currentStateField.enable()
    } else if (country == 'Canada') {
      states = this.locationService.getCanadaStates()
      currentStateField.enable()
    } else {
      states = null;
      currentStateField.disable()
    }

    if (field_name == 'shipping_country') {
      this.currentShippingStates = states
    } else if (field_name == 'country') {
      this.currentStates = states
    }
  }

  onSubmit() {

  }

}
