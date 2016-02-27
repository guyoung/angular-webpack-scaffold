import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import { HNApi } from './services/hn-api';
import { HomePage } from './pages/home';
import { UserPage } from './pages/user';
import { ItemPage } from './pages/item';


@Component({
	selector: 'hacker-news',
	templateUrl: 'app/app.component.html',
	directives: [
		ROUTER_DIRECTIVES,
		HomePage,
		ItemPage,
		UserPage
	]
})
@RouteConfig([
	{ path: '/', component: HomePage, as: 'Home' },
	{ path: '/item/:id', component: ItemPage, as: 'Item' },
	{ path: '/user/:id', component: UserPage, as: 'User' }
])
export class HackerNewsApp { }