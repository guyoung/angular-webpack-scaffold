import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import {OPTS_REQ_JSON} from './web.util';
import {BaseDto} from './dto';
import {HttpUtil} from './http.util';


export abstract class BaseResourceService<T extends BaseDto> {

  protected url: string;

  constructor(protected httpUtil: HttpUtil, resourceName: string) {
    this.url = `/api/${resourceName}`;


  }

  saveOne(data: T): Observable<T> {
    const body = JSON.stringify(data);
    if (data._id) {
      return this.httpUtil.put(`${this.url}/${data._id}`, body, OPTS_REQ_JSON).map((res: Response) => res.json());
    }
    return this.httpUtil.post(this.url, body, OPTS_REQ_JSON).map((res: Response) => res.json());
  }

  removeOneById(id: string): Observable<T> {
    return this.httpUtil.delete(`${this.url}/${id}`).map((res: Response) => res.json());
  }

  findOneById(id: string): Observable<T> {
    return this.httpUtil.get(`${this.url}/${id}`).map((res: Response) => res.json());
  }

  find(): Observable<T[]> {
    return this.httpUtil.get(`${this.url}/_find`).map((res: Response) => res.json());
  }

}

