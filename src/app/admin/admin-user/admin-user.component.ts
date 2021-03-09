import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/models';
import { UserService } from '@app/services';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  userForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: [''],
    email: ['', [Validators.required]],
    role: ['']
  })
  isAddMode: boolean;
  id: String;
  user: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.isAddMode = !this.id
    if (!this.isAddMode) {
      this.userService.findById(this.id)
        .subscribe({
          next: user => {
            if (!user) this.router.navigate(['/admin'])
            this.user = user
            this.userForm.patchValue(user)
          },
          error: error => {
            this.router.navigate(['/'])
            console.log(error)
          }
        });
    }
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.userForm.invalid) return;
    var dataToSave = this.userForm.getRawValue()
    if (this.id) dataToSave['_id'] = this.id
    if (this.isAddMode) {
      this.createUser(dataToSave, formDirective);
    } else {
      this.updateUser(dataToSave);
    }
  }

  private createUser(dataToSave, formDirective: FormGroupDirective) {
    this.userService.create(dataToSave).subscribe({
      next: () => {
        // this.itemForm.reset()
        // formDirective.resetForm()
        this.showSnackBar('Item added successfully', 'Success')
      },
      error: error => {
        console.log(error)
      }
    })
  }

  private updateUser(dataToSave) {
    this.userService.update(dataToSave).subscribe({
      next: () => {
        this.showSnackBar('Item updated successfully', 'Success')
      },
      error: error => {
        console.log(error)
      }
    })
  }

  showSnackBar(msg, status) {
    this.snackBar.open(msg, status, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    })
  }

}
