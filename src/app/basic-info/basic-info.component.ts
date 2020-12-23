import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  basicInfoForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: ['', [
      // Validators.required,
      // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]]
  })

  constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue) {
      this.basicInfoForm.setValue({
        firstName: this.authService.currentUserValue.firstName,
        lastName: this.authService.currentUserValue.lastName,
        email: this.authService.currentUserValue.email,
      })
    }
  }

  onSubmit() {

  }
}
