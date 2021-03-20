import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '@app/models';
import { ItemService } from '@app/services';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss']
})

export class AddItemFormComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isAddMode: boolean;
  id: String;
  item: Item;
  imageUrls: String[] = [];
  currentItemSubject: BehaviorSubject<Item>;
  currentItem: Observable<Item>;
  itemForm = this.fb.group({
    name: ['', [Validators.required]],
    realPrice: [''],
    price: [''],
    description: [''],
    count: [''],
    featured: [false]
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
      this.subscriptions.add(
        this.itemService.getItem(this.id)
          .subscribe({
            next: item => {
              if (!item) this.router.navigate(['/admin'])
              this.item = item
              // this.currentItemSubject = new BehaviorSubject(item);
              // this.currentItem = this.currentItemSubject.asObservable();
              // this.currentItemSubject.next(item);
              this.itemForm.patchValue(item)
              this.imageUrls = item.imageUrls
            },
            error: error => {
              this.router.navigate(['/'])
              console.log(error)
            }
          })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  showSnackBar(msg, status) {
    this.snackBar.open(msg, status, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    })
  }

  onImgDelete(imageUrl) {
    this.imageUrls = this.imageUrls.filter(item => item != imageUrl)
  }

  onDelete() {
    this.subscriptions.add(
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
    )
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.itemForm.invalid) return;
    var dataToSave = this.itemForm.getRawValue()
    dataToSave['imageUrls'] = this.imageUrls
    if (this.id) dataToSave['_id'] = this.id
    if (this.isAddMode) {
      this.createItem(dataToSave, formDirective);
    } else {
      this.updateItem(dataToSave);
    }
  }

  private createItem(dataToSave, formDirective: FormGroupDirective) {
    this.subscriptions.add(
      this.itemService.create(dataToSave).subscribe({
        next: () => {
          this.showSnackBar('Item added successfully', 'Success')
        },
        error: error => {
          console.log(error)
        }
      })
    )
  }

  private updateItem(dataToSave) {
    this.subscriptions.add(
      this.itemService.update(dataToSave).subscribe({
        next: () => {
          this.showSnackBar('Item updated successfully', 'Success')
        },
        error: error => {
          console.log(error)
        }
      })
    )
  }
}
