import { Component, OnInit } from '@angular/core';
import { Time } from 'src/app/time';

import * as moment from 'moment';

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

	constructor() { }

	public time: Time = {
		h: undefined,
		m: undefined,
		s: undefined,
		ms: undefined
	}

	public totalTime() {
		let time: Time = new Time;

		for (var key in this.time) {
			if (this.time.hasOwnProperty(key)) {
				if (this.time[key] === undefined || parseInt(this.time[key]) < 0 || this.time[key] === '') {
					time[key] = 0;
				}
				else {
					let thisTime = this.time[key].replace(/[^0-9]/g, '');
					time[key] = parseInt(thisTime);
				}
			}
		}
		return (time.h * 3600) + (time.m * 60) + time.s;
	}

	ngOnInit() {
	}

}
