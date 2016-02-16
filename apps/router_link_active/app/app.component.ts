//our root app component
import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

@Component({
  template: "<h1>First component</h1>"
})
export class FirstComponent { }



@Component({
  template: "<h1>Second component</h1>"
})
export class SecondComponent { }



@Component({
  template: "<h1>Third component</h1>"
})
export class ThirdComponent { }



@Component({
  selector: 'my-app',
  providers: [],
  template: `
    <div>
        <ul>
          <li>
            <a [routerLink]="['First']">First</a>
          </li>
          <li>
            <a [routerLink]="['Second']">Second</a>
          </li>
          <li>
            <a [routerLink]="['Third']">Third</a>
          </li>
        </ul>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [".router-link-active { background-color: red; }"],
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: "/first", name: "First", component: FirstComponent, useAsDefault: true },
  { path: "/second", name: "Second", component: SecondComponent },
  { path: "/third", name: "Third", component: ThirdComponent }
])
export class AppComponent { }