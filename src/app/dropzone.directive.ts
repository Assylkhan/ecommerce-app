import { Directive, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Directive({
  selector: '[appDropzone]'
})
export class DropzoneDirective {

  @Output() dropped = new EventEmitter<FileList>()

  constructor() { }

}
