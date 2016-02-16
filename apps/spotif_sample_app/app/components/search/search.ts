import { Component } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';
import { Spotify } from '../../services/spotify';
import { status, json } from '../../utils/fetch'

@Component({
	selector: 'app-search',
	template: `
		
		<label for="search-string">Search for an artist</label>
		<input #searchvalue (keyup)="searchArtist($event, searchvalue.value)"/>
		<h2>Results</h2>
		<ul>
			<li *ngFor="#artist of artists">
				<h3>{{artist.name}}</h3>
				<a [routerLink]="['Artist', {id: artist.id}]">Read more about this artist</a>
			</li>
		</ul>

	`,
	providers: [Spotify],
	directives: [ROUTER_DIRECTIVES]	
})
export class Search {
	timeoutId: number;
	artists: any[] = [];
	service: Spotify;

	constructor(service: Spotify) {
		this.service = service;
	}
	searchArtist($event, value) {
		if (!value) {
			return;
		}
		if (this.timeoutId) clearTimeout(this.timeoutId);
		this.timeoutId = setTimeout(() => {
			this.service.searchArtist(value)
				.then(status)
				.then(json)
				.then((response) => {
					this.setResults(response.artists.items);
				})
		}, 250);
	}
	setResults(artists: Array<Object>) {
		this.artists = artists;
	}
}