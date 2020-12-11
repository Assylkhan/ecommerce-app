import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnDestroy {
  subscription: Subscription;
  currentUser: User;
  signupForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    email: ['', [
      // Validators.required,
      // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]],
    password: [''],
    retypePassword: [''],
    // password: ['', [Validators.required,
    // Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
    // retypePassword: ['', Validators.required],
    address: this.fb.group({
      country: [''],
      state: [''],
      city: [''],
      street: [''],
      zip: ['']
    }),
  });

  get password() {
    return this.signupForm.get('password');
  }

  updateForm() {
    this.signupForm.patchValue({
      firstName: 'John',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.signupForm.invalid) return;
    this.subscription = this.userService.create(this.signupForm.getRawValue()).subscribe({
      next: () => {
        console.log('signed up successfully')
      },
      error: error => {
        console.log(error)
      }
    }
    );
    // console.warn(this.signupForm.getRawValue());
  }

}
