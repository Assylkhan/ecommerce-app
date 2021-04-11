import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '@app/services';

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.scss']
})
export class BillingInfoComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

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

  loading = false;
  error = '';

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private userService: UserService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue?.billingInfo) {
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

  showSnackBar(msg, status) {
    this.snackBar.open(msg, status, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    })
  }

  // convenient getter for easy access to form fields
  get f() { return this.billingInfoForm.controls; }

  onSubmit() {
    var currentUser = this.authService.currentUserValue
    currentUser.billingInfo.country = this.f.country.value
    currentUser.billingInfo.firstName = this.f.firstName.value
    currentUser.billingInfo.lastName = this.f.lastName.value
    currentUser.billingInfo.companyName = this.f.companyName.value
    currentUser.billingInfo.address = this.f.address.value
    currentUser.billingInfo.state = this.f.state.value
    currentUser.billingInfo.city = this.f.city.value
    currentUser.billingInfo.zip = this.f.zip.value
    currentUser.billingInfo.phone = this.f.phone.value
    this.userService.update(currentUser).subscribe({
      next: () => {
        this.showSnackBar('Basic Information Updated', 'Success')
      },
      error: error => {
        console.log(error)
        this.error = error
        this.loading = false
      }
    })
  }
}
