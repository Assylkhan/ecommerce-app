import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.scss']
})
export class BillingInfoComponent implements OnInit {

  billingInfoForm = this.fb.group({
    country: [''],
    firstName: [''],
    lastName: [''],
    companyName: [''],
    address: [''],
    city: [''],
    state: [''],
    zipCode: [''],
    phone: ['']
  })

  constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue) {
      this.billingInfoForm.setValue({
        country: this.authService.currentUserValue.billingInfo.country,
        firstName: this.authService.currentUserValue.billingInfo.firstName,
        lastName: this.authService.currentUserValue.billingInfo.lastName,
        companyName: this.authService.currentUserValue.billingInfo.companyName,
        address: this.authService.currentUserValue.billingInfo.address,
        city: this.authService.currentUserValue.billingInfo.city,
        state: this.authService.currentUserValue.billingInfo.state,
        zip: this.authService.currentUserValue.billingInfo.zip,
        phone: this.authService.currentUserValue.billingInfo.phone
      })
    }
  }

  onSubmit() {

  }
}
