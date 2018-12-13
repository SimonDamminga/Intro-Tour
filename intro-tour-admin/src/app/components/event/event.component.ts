import { Component, OnInit } from '@angular/core';
// classes

import { Event } from '../../event';
import { Location } from '../../location';

//services
import { LocationService } from '../../services/location.service';
import { AdminService } from '../../services/admin.service';
import { EventService } from '../../services/event.service';

import * as $ from 'jquery';

import { Time } from 'src/app/time';
import { Tour } from 'src/app/tour';
import { TourService } from 'src/app/services/tour.service';

import * as moment from 'moment';

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

	curPosition = {
		x: null,
		y: null
	}

	admin;

	chosen_lat = null;
	chosen_long = null;

	range = 12;
	name: string = 'Naam';
	description: string = 'Omschrijving';

	events = [];

	location: Location = {
		name: '',
		description: '',
		radius: { "data": 12, "type": "circle" },
		latitude: undefined,
		longitude: undefined
	}


	constructor(
		private locationService: LocationService,
		private adminService: AdminService,
		private eventService: EventService,
		private tourService: TourService
	) { }

	ngOnInit() {
		this.getLocation();
		this.getEventsByTour();
	}

	public dynamicSort(property) {
		var sortOrder = 1;
		if (property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a, b) {
			var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		}
	}


	public getEventsByTour() {
		this.events = [];
		// id is now static but has to be the one from the logged in admin
		this.adminService.getAdminById(1)
			.subscribe((admin) => {
				this.admin = admin[0];
				this.eventService.getEventsById(this.admin.tour.id)
					.subscribe((events) => {
						events.forEach(event => {
							this.locationService.getLocation(event.event.trigger.data.location_id)
								.subscribe((location) => {
									event.location = location[0];
									this.events.push(event);
								});
						});
					});
			});
	}

	public getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					this.curPosition.y = position.coords.longitude;
					this.curPosition.x = position.coords.latitude;
				},
				(err) => { console.error('ERROR(' + err.code + '): ' + err.message); },
				//{ maximumAge: 600000, timeout: 5000, enableHighAccuracy: true }
			);
		} else {
			alert("Je locatie kan helaas niet worden gevonden");
		}
	}

	public deleteLocation(id, event_id) {

		this.events.forEach((event, index) => {
			if (event.location.id == id) {
				this.events.splice(index, 1);

				this.eventService.deleteEventTour(event_id)
					.subscribe(() => { });

				this.locationService.deleteLocation(id)
					.subscribe(() => { });
			}
		});

	}

	public getLocationOnMap(event) {
		this.chosen_lat = event.coords.lat;
		this.chosen_long = event.coords.lng;
	}

	public saveLocation() {
		this.location.name = this.name;
		this.location.description = this.description;
		this.location.radius = { "data": this.range, "type": "circle" };
		this.location.latitude = this.chosen_lat;
		this.location.longitude = this.chosen_long;

		this.locationService.createLocation(this.location)
			.subscribe((location) => {

				let event: Event = {
					trigger: { "data": { "location_id": location.id }, "type": "location" },
					action: { "data": { "points": 500, "devider": 2, "timeLimit": 240, "question_id": 1 }, "type": "question" }
				}

				this.eventService.createEvent(event)
					.subscribe((made_event) => {

						let event_tour = {
							tour_id: this.admin.tour.id,
							event_id: made_event.id
						}

						this.eventService.createEventTour(event_tour)
							.subscribe(() => {
								this.getEventsByTour();
							});

					});

			}, (err) => { console.log(err) });
	}
	public time: Time = {
		h: undefined,
		m: undefined,
		s: undefined,
		ms: undefined
	}

	private totalTime() {
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

	public makeTour() {
		let tour: Tour = new Tour;

		tour = {
			name: 'Test Tour',
			description: 'New tour',
			team_limit: 5,
			time_limit: this.totalTime(),
			time_start: undefined,
			tour_code: 776655
		}

		this.tourService.createTeam(tour)
			.subscribe(
				(res: Response) => {
					console.log(res);
				},
				err => {
					console.error(err);
				});
	}

}
