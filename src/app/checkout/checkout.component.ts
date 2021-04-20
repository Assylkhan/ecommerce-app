import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '@app/services';
import { LocationService } from '@app/services/location.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  selectedCountry: string;

  billingInfoForm = this.fb.group({
    country: [''],
    firstName: [''],
    lastName: [''],
    companyName: [''],
    address: [''],
    city: [''],
    state: [''],
    zip: [''],
    phone: ['']
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    public locationService: LocationService) { }

  ngOnInit(): void {
    this.billingInfoForm.patchValue(this.authService.currentUserValue)
  }

  onSubmit() {

  }

}
