import {
AsyncTestCompleter,
TestComponentBuilder,
describe,
expect,
inject,
it,
beforeEach
} from 'angular2/testing_internal';
import {Component, View, provide} from 'angular2/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {ObjectUtil} from '../../core/object.util';
import {Contact} from '../../core/dto';
import {ContactFormComponent} from './contact-form.component';
import {ContactService} from './contact.service';
import {contacts, buildContact} from './contact.mock';

export function main() {

  describe('ContactFormComponent', () => {

    let contactService: ContactService;

    beforeEach(() => {

      contactService = new ContactService(null);

      spyOn(contactService, 'saveOne').and.callFake((contact: Contact) => {
        if (contact._id) {
          for (let i = 0; i < contacts.length; ++i) {
            if (contacts[i]._id === contact._id) {
              ObjectUtil.merge(contacts[i], contact);
              return Observable.of(contacts[i]);
            }
          }
        }
        const newContact = buildContact(contact);
        contacts.push(newContact);
        return Observable.of(newContact);
      });
    });


    it('should work',
      inject([TestComponentBuilder, AsyncTestCompleter], (tcb: TestComponentBuilder, async: AsyncTestCompleter) => {
        tcb.overrideProviders(ContactFormComponent, [provide(ContactService, { useValue: contactService })])
          .createAsync(ContactFormComponent).then((fixture) => {

            fixture.detectChanges();

            const originalLength = contacts.length;
            
            expect(originalLength).toBeGreaterThan(0);

            const cmp: ContactFormComponent = fixture.componentInstance;
            
            const newContact: Contact = { name: 'Test', email: 'test@example.com' };            
            
            cmp.contact = newContact;
            
            cmp.save();            

            fixture.detectChanges();
            
            const createdContact = contacts[originalLength];
            
            expect(contacts.length).toBe(originalLength + 1);            
            expect(createdContact.name).toEqual(newContact.name);
            expect(createdContact.email).toEqual(newContact.email);        
            expect(cmp.contact).toEqual({});

            async.done();
          });
      }));

  });
}
