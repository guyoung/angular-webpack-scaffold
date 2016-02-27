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

import {ContactComponent} from './contact.component';
import {ContactService} from './contact.service';
import {contacts} from './contact.mock';

export function main() {

  describe('ContactComponent', () => {

    let contactService: ContactService;

    beforeEach(() => {

      contactService = new ContactService(null);

      spyOn(contactService, 'find').and.callFake(() => Observable.of(contacts));

      spyOn(contactService, 'findOneById').and.callFake((id: string) =>
        Observable.of(contacts.find(it => it._id === id))
      );

      spyOn(contactService, 'removeOneById').and.callFake((id: string) => {
        let pos: number;
        for (let i = 0; i < contacts.length; ++i) {
          if (contacts[i]._id === id) {
            pos = i;
            break;
          }
        }
        return Observable.of(contacts.splice(pos, 1));
      });
    });


    it('should work',
      inject([TestComponentBuilder, AsyncTestCompleter], (tcb: TestComponentBuilder, async: AsyncTestCompleter) => {
        tcb.overrideProviders(ContactComponent, [provide(ContactService, { useValue: contactService })])
          .createAsync(ContactComponent).then((fixture) => {

            fixture.detectChanges();

            const cmp: ContactComponent = fixture.componentInstance;

            const compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('h2').textContent).toEqual('Contacts!');

            const itemsSelector = 'tbody tr';

            function obtainContactsLenght() {
              return compiled.querySelectorAll(itemsSelector).length;
            }

            const originalLength = obtainContactsLenght();
            let newLength = originalLength;
            
            expect(originalLength).toBeGreaterThan(0);            
            expect(originalLength).toBe(contacts.length);

            const existingContact = ObjectUtil.clone(contacts[0]);

            cmp.select(existingContact._id);

            fixture.detectChanges();

            const selectedContact = cmp.selectedContact;

            expect(selectedContact._id).toBe(existingContact._id);
            expect(selectedContact.name).toBe(existingContact.name);

            cmp.remove(new Event('mock'), existingContact);

            fixture.detectChanges();

            newLength--;

            expect(obtainContactsLenght()).toBe(newLength);

            async.done();
          });
      }));

  });
}
