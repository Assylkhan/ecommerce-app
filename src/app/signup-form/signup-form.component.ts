import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '@app/models';
import { UserService } from '@app/services';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnDestroy {
  subscriptions: Subscription;
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

  retypePassValidator(control: AbstractControl) {
    if (control && (control.value != null)) {
      const retypePassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== retypePassValue || passValue === '') {
          return {
            isError: true
          }
        }
      }
    }
    return null;
  }

  updateForm() {
    this.signupForm.patchValue({
      firstName: 'John',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    // validate retypePassword when password changes
    this.signupForm.controls.password.valueChanges
      .subscribe(x => this.signupForm.controls.retypePassword.updateValueAndValidity);
  }

  moveToLogin() {
    this.router.navigate(['../login'], {relativeTo: this.activatedRoute})
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    if (this.signupForm.invalid) return;
    this.subscriptions = this.userService.create(this.signupForm.getRawValue()).subscribe({
      next: () => {
        console.log('signed up successfully')
        this.moveToLogin()
      },
      error: error => {
        console.log(error)
      }
    }
    );
    // console.warn(this.signupForm.getRawValue());
  }

}
