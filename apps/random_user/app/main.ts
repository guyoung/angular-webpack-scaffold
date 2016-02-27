import {Component} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser'
import {UserCard} from './user-card';
import {RandomUser} from './RandomUser';

@Component({
	selector: 'main',
	template: `
    <div class="new-user-button">
      <button class="ru-button --primary" autofocus (click)="getRandomUser()">
        <i class="fa fa-user"></i>
        {{buttonText}}
      </button>
    </div>
       <user-card [user]="user" [loading]="loading">
      <div loading>
        <i class="fa fa-refresh fa-2x fa-spin"></i>
      </div>
      <div no-user>
        <small>please click on "{{buttonText}}"</small>
      </div>
    </user-card>
  `,
	directives: [UserCard],
	providers: [RandomUser]
})
export class App {
	constructor(randomUser: RandomUser) {
		this.buttonText = 'Get New User';
		this.getUser = randomUser.getUser;
	}

	getRandomUser() {
		this.loading = true;
		this.getUser().then(user => {
			this.user = user;
			this.loading = false;
		}).catch(() => this.loading = false);
	}
}

bootstrap(App);