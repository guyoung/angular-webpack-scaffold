import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { Spotify } from '../../services/spotify';
import { status, json } from '../../utils/fetch'

@Component({
	selector: 'app-artist',
	template: `
		<section *ngIf="artist">
			<h3>{{artist.name}}</h3>
			<div>{{artist.genres}}</div>
			<div><img src="{{artist.image}}"></div>
		</section>
	`,
	providers: [Spotify]
})

export class Artist {

	artist: any = null;
	service: Spotify;

	routeParam: RouteParams;
	

	constructor(service: Spotify, routeParam: RouteParams) {
		this.service = service;
		this.routeParam = routeParam;
		this.getArtist();
	}
	getArtist() {
		this.service.getArtistById(this.routeParam.params.id)
			.then(status)
			.then(json)
			.then((response) => {

				this.artist = {
					id: response.id,
					name: response.name,				
					genres: response.genres.join(','),
					image: response.images[0].url
				}			
			})
	}
}