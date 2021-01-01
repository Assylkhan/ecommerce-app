import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss']
})

export class AddItemFormComponent implements OnInit {
  itemForm = this.fb.group({
    name: [''],
    realPrice: [''],
    price: [''],
    description: [''],
    count: [''],
    imageUrl: [''],
    imageFileName: ['']
  })

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.itemService.create(this.itemForm.getRawValue()).subscribe({
      next: () => {
        console.log('item added successfully')
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
