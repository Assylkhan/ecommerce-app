import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { User } from '@app/models';
import { AuthenticationService } from '@app/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [
      // Validators.required,
      // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]],
    password: ['']
  });
  loading = false;
  error = '';
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.authService.login(this.f.email.value, this.f.password.value)
    .pipe(first())
    .subscribe(
      () => {
        this.router.navigate([this.returnUrl])
      },
      error => {
        this.error = error
        this.loading = false
      }
    );
  }

}
