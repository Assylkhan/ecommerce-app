import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
  signupForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    email: ['', Validators.required],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });

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
    // this.userService.create(user)
    console.warn(this.signupForm.value);
  }

}
