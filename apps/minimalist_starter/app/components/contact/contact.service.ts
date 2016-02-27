import {Injectable} from 'angular2/core';

import {Http, Response} from 'angular2/http';

import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';


import {Contact} from '../../core/dto';
import {HttpUtil} from '../../core/http.util';
import {ObjectUtil} from '../../core/object.util';
import {BaseResourceService} from '../../core/base.service';
import {contacts, buildContact} from './contact.mock';



@Injectable()
/*
export class ContactService extends BaseResourceService<Contact> {

  constructor(httpUtil: HttpUtil) {
    super(httpUtil, 'contact');
  }

}
*/

export class ContactService {

  constructor(/*httpUtil: HttpUtil*/) {
    //super(httpUtil, 'contact');
  }

  saveOne(data: T): Observable<T> {
    const body = JSON.stringify(data);
    if (data._id) {
      	//return this.httpUtil.put(`${this.url}/${data._id}`, body, OPTS_REQ_JSON).map((res: Response) => res.json());
    	const index = this._findIndex(data._id);
    	const contact = contacts[index];
    	ObjectUtil.merge(contact, data);
    	return Observable.of(contact);
    }
    //return this.httpUtil.post(this.url, body, OPTS_REQ_JSON).map((res: Response) => res.json());

    const contact = buildContact(data);
    contacts.push(contact);
    return Observable.of(contact);
  }

  removeOneById(id: string): Observable<T> {
    //return this.httpUtil.delete(`${this.url}/${id}`).map((res: Response) => res.json());

    const index = this._findIndex(id);

    return Observable.of(contacts.splice(index, 1));
  }

  findOneById(id: string): Observable<T> {
    //return this.httpUtil.get(`${this.url}/${id}`).map((res: Response) => res.json());

    const index = this._findIndex(id);
    const contact = contacts[index];
    return Observable.of(contact);
  }

  find(): Observable<T[]> {
    //return this.httpUtil.get(`${this.url}/_find`).map((res: Response) => res.json());

    return Observable.of(contacts);
  }



  private _findIndex(id: string): number {
    const n = contacts.length;
    for (let i = 0; i < n; i++) {
      const it = contacts[i];
      if (it._id === id) {
        return i;
      }
    }
    return -1;
  }


}
