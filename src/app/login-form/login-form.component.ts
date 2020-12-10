import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

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

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
  }

}
