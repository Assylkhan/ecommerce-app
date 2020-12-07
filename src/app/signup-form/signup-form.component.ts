import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
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

  onSubmit() {
    if (this.signupForm.invalid) return;
    this.userService.create(this.signupForm.getRawValue()).subscribe();
    // console.warn(this.signupForm.getRawValue());
  }

}
