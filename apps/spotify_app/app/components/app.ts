import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import { Search } from '../components/search/search';
import { Artist } from '../components/artist/artist';

@Component({
	selector: 'app',
	template: `
		<header>
			<nav>
				<ul>
					<li>
						<a [routerLink]="['Search']">Search</a>
					</li>	
				</ul>
			</nav>
		</header>
		
		<main>
			<h1>{{title}}</h1>
			<router-outlet></router-outlet>
		</main>
	`,
	directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
	{ path: '/search', name: 'Search', component: Search, useAsDefault: true },
	{ path: '/artist/:id', name: 'Artist', component: Artist }
])

export class App {
	title: string;
	constructor() {
		this.title = 'App title';
	}
}