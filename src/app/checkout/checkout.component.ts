import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Order } from '@app/models';
import { Shipping } from '@app/models/shipping.model';
import { AuthenticationService, OrderService } from '@app/services';
import { CartService } from '@app/services/cart.service';
import { LocationService } from '@app/services/location.service';
import { PositionService } from '@app/services/position.service';

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
  cardType: string;
  checkoutForm = this.fb.group({
    card_number: [''],
    exp_month: [''],
    exp_year: [''],
    cvv: [''],
    firstName: [''],
    lastName: [''],
    email: [''],
    country: [''],
    state: { value: '', disabled: true },
    city: [''],
    address: [''],
    zip: [''],
    shipping_country: [''],
    shipping_state: { value: '', disabled: true },
    shipping_city: [''],
    shipping_address: [''],
    shipping_zip: [''],
    phone: ['']
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    public locationService: LocationService,
    public cartService: CartService,
    private orderService: OrderService,
    private positionService: PositionService) { }

  ngOnInit(): void {
    this.checkoutForm.patchValue(this.authService.currentUserValue)
  }

  // convenience getter for easy access to form fields
  get f() { return this.checkoutForm.controls; }

  shppingEqualsBilling(e) {
    console.log(e.checked)
  }

  countryChange(field_name) {
    // todo: finish checkout
    var states: string[] = []
    var country = ''
    var currentStateField;

    if (field_name == 'shipping_country') {
      country = this.f.shipping_country.value
      currentStateField = this.f.shipping_state
    } else if (field_name == 'country') {
      country = this.f.country.value
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

  buildShippingFromForm() {
    var shipping = new Shipping()
    shipping.country = this.f.shipping_country.value
    shipping.city = this.f.shipping_city.value
    shipping.address = this.f.shipping_address.value
    shipping.zip = this.f.shipping_zip.value
    return shipping
  }

  onSubmit() {
    var order = new Order()
    order.positions = this.positionService.positions
    order.shipping = this.buildShippingFromForm()
    // order.positions =
    // this.orderService.create()
  }

  fillCardNumber(e) {
    this.cardType = this.getCardType(e)
  }

  getCardType(number) {
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
      return "Visa";

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
      return "Mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
      return "AMEX";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
      return "Discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
      return "Diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
      return "Diners - Carte Blanche";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
      return "JCB";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
      return "Visa Electron";

    return "";
  }

}
