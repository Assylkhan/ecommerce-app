import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

}
