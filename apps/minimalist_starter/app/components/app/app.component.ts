import {Component, ViewEncapsulation} from 'angular2/core';
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';

import {HomeComponent} from '../home/home.component';
import {ContactComponent} from '../contact/contact.component';
import {HttpUtil} from '../../core/http.util';
import {Notification} from '../../core/dto';


@Component({
  selector: 'my-app',
  templateUrl: 'app/components/app/app.component.html',
  styleUrls: ['app/components/app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  encapsulation: ViewEncapsulation.None
})
@RouteConfig([
  { path: '/', component: HomeComponent, as: 'Home' },
  { path: '/contact', component: ContactComponent, as: 'Contact' }
])
export class AppComponent {

  loading: boolean;
  
  constructor(private httpUtil: HttpUtil) {
    
    let numReqStarted = 0;
    let numReqCompleted = numReqStarted;
    
    this.httpUtil.requestNotifier.subscribe((notification: Notification) => {
      
      if (notification.type === 'start') {
        ++numReqStarted;
      } else if (notification.type === 'complete') {
        ++numReqCompleted;
      }
      
      this.loading = numReqStarted > numReqCompleted;            
    });
  }
}
