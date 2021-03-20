import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar'

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { User } from '@app/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  basicInfoForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: ['', [
      // Validators.required,
      // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]]
  })
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
    private snackBar: MatSnackBar) { }

  // convenient getter for easy access to form fields
  get f() { return this.basicInfoForm.controls; }

  ngOnInit(): void {
    if (this.authService.currentUserValue) {
      this.basicInfoForm.setValue({
        firstName: this.authService.currentUserValue.firstName,
        lastName: this.authService.currentUserValue.lastName,
        email: this.authService.currentUserValue.email,
      })
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  showSnackBar(msg, status) {
    this.snackBar.open(msg, status, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    })
  }

  onSubmit() {
    var currentUser = this.authService.currentUserValue
    currentUser.firstName = this.f.firstName.value
    currentUser.lastName = this.f.lastName.value
    currentUser.email = this.f.email.value
    this.subscriptions.add(
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
    )
  }
}
