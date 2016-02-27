import {ObjectUtil} from '../../core/object.util';
import {Contact} from '../../core/dto';

export const contacts: Contact[] = [
  buildContact({ name: 'Michael Jackson', email: 'michael_jackson@example.com' }),
  buildContact({ name: 'Madonna', email: 'madonna@example.com' }),
  buildContact({ name: 'The Beatles', email: 'the_beatles@example.com' }),
  buildContact({ name: 'Adelle', email: 'adelle@example.com' })
];

export function buildContact(data?: Contact, generateId = true): Contact {
  const contact: Contact = {};
  const now = Date.now();
  contact.createdAt = now;
  contact.updatedAt = now;
  ObjectUtil.merge(contact, data);
  if (generateId) {
    contact._id = ObjectUtil.nextId();
  }
  return contact;
}
