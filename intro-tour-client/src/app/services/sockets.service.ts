import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';

@Injectable()
export class SocketsService {
	public echo: Echo = null;

	constructor() { }

	public setupWithToken() {

		this.echo = new Echo({
			brodcaster: 'socket.io',
			host: 'http://intro-tour.local:6001'
		});

		window['echo'] = this.echo;

		this.listen();
	}

	public listen() {
		return this.echo.channel('App.User.{id}').listen('User', (e) => {
			console.log(e);
			alert('Recived TEST event via Sockets private, secured channel!');
		});
	}
}
