import {Directive, ElementRef} from 'angular2/core';
// Simple example directive that fixes autofocus problem with multiple views
@Directive({
  selector: '[autofocus]' // using [ ] means selecting attributes
})
export class Autofocus {
  constructor(private el: ElementRef) {
    // autofocus fix for multiple views
    this.el.nativeElement.focus();
  }
}
