import {Injectable, EventEmitter} from 'angular2/core';
import {Http, RequestOptionsArgs, Response} from 'angular2/http';

import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/subject/ReplaySubject';

import {Notification} from './dto';


@Injectable()
export class HttpUtil {

  requestNotifier = new ReplaySubject<Notification>(1);

	constructor(private http: Http) {
	}

	get(url: string, options?: RequestOptionsArgs): Observable<Response> {
		return this._request('get', url, options);
	}

	post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
		return this._request('post', url, body, options);		
	}

	put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
		return this._request('put', url, body, options);		
	}

	delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
		return this._request('delete', url, options);		
	}

  patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
		return this._request('patch', url, body, options);		    
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
		return this._request('head', url, options);		        
  }

	private _request(method: string, ...httpParams: any[]): Observable<Response> {
    
    this._notify({type: 'start'});
    
    return this.http[method].apply(this.http, httpParams)
      .do((res: any) => this._notify({type: 'done'}),
        (err: any) => this._notify({type: 'error', data: err}),
        () => this._notify({type: 'complete'}));
	}
  
  private _notify(notification: Notification) {
		this.requestNotifier.next(notification);    
  }

}
