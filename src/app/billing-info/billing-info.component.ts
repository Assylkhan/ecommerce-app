import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
