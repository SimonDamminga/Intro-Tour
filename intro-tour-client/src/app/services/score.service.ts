import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, UrlTree } from '@angular/router';
import { environment } from '../../environments/environment'
import { Observable, Observer } from 'rxjs';
import { MessageTypes } from '../message-types';
import { MessagesService } from './messages.service';
import { SocketsService } from './sockets.service';

import * as socketIo from 'socket.io-client';

import { Socket } from '../shared/interfaces';

import { Team } from '../team';

declare var io: {
	connect(url: string): Socket;
};

@Injectable()
export class ScoreService {
	private socket: Socket;
	private observer: Observer<Team>;

	constructor(private http: HttpClient, private router: Router, private messagesServices: MessagesService, private socketService: SocketsService) { }

	public getTeamsByTourID(): Observable<Team> {
		this.socketService.setupWithToken();
		this.socket = socketIo('http://intro-tour.local:6001');

		this.socket.on('data', (res) => {
			this.observer.next(res.data);
		});

		return this.createObservable();
	}

	public createObservable(): Observable<Team> {
		return new Observable<Team>(observer => {
			this.observer = observer;
		});
	}

	private handleError(error) {
		console.error('server error:', error);
		if (error.error instanceof Error) {
			let errMessage = error.error.message;
			return Observable.throw(errMessage);
		}
		return Observable.throw(error || 'Socket.io server error');
	}

	//private apiUrl = environment.API_URL;

	// 	public getTeamsByTourID(tourID): Observable < Team > {
	// 	return this.http.get(this.apiUrl + 'teams?tour=' + tourID);
	// }
}
