import { Directive, HostListener, Output, EventEmitter  } from '@angular/core';

@Directive({
  selector: '[appDropzone]'
})
export class DropzoneDirective {

  @Output() dropped =  new EventEmitter<FileList>();
  @Output() hovered =  new EventEmitter<boolean>();

  @HostListener('drop', ['$event'])
  onDrop($event): void {
    console.log('onDrop');
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event): void {
    console.log('onDragOver');
    $event.preventDefault();
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event): void {
    console.log('onDragLeave');
    $event.preventDefault();
    this.hovered.emit(false);
  }
}
