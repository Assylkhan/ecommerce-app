import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
  isAddMode: boolean;
  id: String;
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
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.isAddMode = !this.id
    if (!this.isAddMode) {
      this.itemService.getItem(this.id)
        .subscribe({
          next: item => {
            if (!item) this.router.navigate(['/admin'])
            this.itemForm.patchValue(item)
          },
          error: error => {
            this.router.navigate(['/'])
            console.log(error)
          }
        });
    }
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

  onDelete() {
    this.itemService.delete(this.id)
      .subscribe({
        next: () => {
          this.router.navigate(['/admin'])
          console.log('deleted successfully')
        },
        error: error => {
          console.log(error)
        }
      })
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.itemForm.invalid) return;
    var dataToSave = this.itemForm.getRawValue()
    dataToSave['images'] = this.imagesToUpload
    if (this.id) dataToSave['_id'] = this.id
    if (this.isAddMode) {
      this.createItem(dataToSave, formDirective);
    } else {
      this.updateItem(dataToSave);
    }
  }

  private createItem(dataToSave, formDirective: FormGroupDirective) {
    this.itemService.create(dataToSave).subscribe({
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

  private updateItem(dataToSave) {
    this.itemService.update(dataToSave).subscribe({
      next: () => {
        this.showSnackBar('Item updated successfully', 'Success')
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
