import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ItemService } from '@app/services';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss']
})

export class AddItemFormComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  imagesToUpload: File[];
  itemForm = this.fb.group({
    name: ['', [Validators.required]],
    realPrice: [''],
    price: [''],
    description: [''],
    count: [''],
    imageUrl: [''],
    imageFileName: ['']
  })

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  showSnackBar(msg, status) {
    this.snackBar.open(msg, status, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    })
  }

  handleImageInput(images: FileList) {
    this.imagesToUpload = Array.from(images)
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.itemForm.invalid) return;
    var dataToSend = this.itemForm.getRawValue()
    dataToSend['image'] = this.imagesToUpload
    this.itemService.create(dataToSend).subscribe({
      next: () => {
        this.itemForm.reset()
        formDirective.resetForm()
        this.showSnackBar('Item added successfully', 'Success')
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
