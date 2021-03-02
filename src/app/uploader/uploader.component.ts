import { Component, Input, OnInit } from '@angular/core';
import { Item } from '@app/models';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

  isHovering: boolean;
  @Input() item: Item;
  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event
    console.log(event)
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i))
    }
  }

  ngOnInit(): void {
    console.log('this.item')
    console.log(this.item)
  }


}
