import {COMMON_DIRECTIVES, COMMON_PIPES, Validators, ControlGroup, Control} from 'angular2/common';
import {Component, Input, Output, EventEmitter} from 'angular2/core';


import {Observable} from 'rxjs/Observable';

import {validateEmail} from '../../core/web.util';
import {Contact} from '../../core/dto';
import {ContactService} from './contact.service';
import {Autofocus} from '../../directives/Autofocus';

@Component({
  selector: 'contact-form',
  templateUrl: 'app/components/contact/contact-form.component.html',
  directives: [Autofocus, COMMON_DIRECTIVES],
  pipes: [COMMON_PIPES],
  providers: []
})
export class ContactFormComponent {

  form: ControlGroup;

  @Input()
  contact: Contact;

  @Output()
  saved = new EventEmitter<Contact>();

  constructor(private contactService: ContactService) {
    this.clear();
    this.form = new ControlGroup({
      _id: new Control(''),
      name: new Control('', Validators.required),
      email: new Control('', validateEmail)
    });
  }

  save() {
    this.contactService.saveOne(this.contact)
      .subscribe((res: Contact) => {
        this.clear();
        this.saved.emit(res);
      });
  }

  clear() {
    this.contact = {};
  }
}