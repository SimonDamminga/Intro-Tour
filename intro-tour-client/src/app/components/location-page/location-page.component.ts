import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { QuestionService } from '../../services/question.service';
import { LocationService } from '../../services/location.service';
import { TeamService } from '../../services/team.service';
import { LocalstorageService } from '../../services/localstorage.service'

@Component({
	selector: 'app-location-page',
	templateUrl: './location-page.component.html',
	styleUrls: ['./location-page.component.css']
})
export class LocationPageComponent implements OnInit {
	z: number;
	icons: Array<any>;
	private given_answer;
	public question;
	public locations = [];
	public answerd = [];
	public totalPoints: number = 0;
	public timeLimit: number;
	public timeRemaining: number = 0;
	private timer;

	ky; kx; dy; dx; km;

	public events;

	curLocation = {
		id: null,
		x: null,
		y: null
	}

	options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	}

	isTracking = false;

	constructor(private _eventService: EventService, private _questionService: QuestionService, private _locationService: LocationService, private teamService: TeamService, private localstorageService: LocalstorageService) {
		this.getEvents();
	}


	ngOnInit() {
		this.trackMe();
		this.z = 18;
		this.icons = [
			{
				url: '/assets/images/marker.png',
				scaledSize: { height: 40, width: 40 }
			},
			{
				url: '/assets/images/marker-q.png',
				scaledSize: { height: 40, width: 40 }
			},
			{
				url: '/assets/images/marker-q-done.png',
				scaledSize: { height: 40, width: 40 }
			}
		];
	}

	//de gebruiker zijn locatie ophalen en laten zien op de kaart
	private trackMe() {
		if (navigator.geolocation) {
			this.isTracking = true;
			navigator.geolocation.watchPosition(
				(position) => { this.showTrackingPosition(position); },
				(err) => { console.error('ERROR(' + err.code + '): ' + err.message); },
				{ maximumAge: 600000, timeout: 5000, enableHighAccuracy: true }
			);
		} else {
			alert("Je locatie kan helaas niet worden gevonden");
		}
	}

	public showTrackingPosition(position) {
		this.curLocation.x = position.coords.latitude;
		this.curLocation.y = position.coords.longitude;
	}

	//de popup van het event laten zien bij het juiste event
	public showHidePopup() {
		this.locations.forEach(location => {
			if (this.arePointsNear(location)) {
				if (location.map_icon == 1) {
					this.showWindow(location);
				}
			} else if (!this.arePointsNear(location)) {
				this.hideWindow(location.id);
			}
		});
	}

	//check of je in de radius van de vraag bent (d.m.v de stelling van pithagoras)
	public arePointsNear(location) {
		this.km = location.radius.data / 1000;

		this.ky = 40000 / 360;
		this.kx = Math.cos(Math.PI * location.latitude / 180.0) * this.ky;

		this.dx = Math.abs(location.longitude - this.curLocation.y) * this.kx;
		this.dy = Math.abs(location.latitude - this.curLocation.x) * this.ky;

		return Math.sqrt(this.dx * this.dx + this.dy * this.dy) <= this.km;
	}


	public showWindow(location) {
		this._questionService.getQuestion(location.question_id)
			.subscribe((question) => {
				this.question = question[0];
				this.startTimer(location.id);
				document.getElementById(`popup-${location.id}`).style.display = 'block';
			});
	}
	public hideWindow(id) {
		document.getElementById(`popup-${id}`).style.display = 'none';
	}

	//alle events ophalen
	public getEvents() {
		this._eventService.getEvents()
			.subscribe((res: any) => {
				this.getLocation(res);
			});
	}
	//vraag bij een event ophalen
	public getQuestion(id) {
		this._questionService.getQuestion(id).subscribe(question => this.question = question[0]);
	}
	//de locatie van elk event krijgen
	public getLocation(events) {
		events.forEach(event => {
			this._locationService.getLocation(event.event.trigger.data.location_id)
				.subscribe((res: any) => {

					if(this.localstorageService.getItem('team') != null){
						let questions_answerd_team = this.localstorageService.getItem('team').questions_answerd;
						this.answerd = questions_answerd_team;

						if(questions_answerd_team != undefined){
							if(questions_answerd_team.includes(event.event.action.data.question_id)){
								res[0].map_icon = 2;
							}else{
								res[0].map_icon = 1;
							};
						}else{
							res[0].map_icon = 1;
						}
					}else{
						res[0].map_icon = 1;
					}

					this.timeLimit = event.event.action.data.timeLimit;

					res[0].question_id = event.event.action.data.question_id;
					res[0].points = event.event.action.data.points;
					res[0].devider = event.event.action.data.devider;

					this.locations.push(res[0]);

					console.log(this.locations);
				
				});
		});
	}

	//answer handling
	public checkAnswer(id) {
		this.stopTimer();
		if (this.given_answer == undefined) {
			alert('Je moet wel een antwoord kiezen');
		} else if (this.given_answer == 1) {
			this.hideWindow(id);
			document.getElementById(`right-${id}`).style.display = 'block';
		} else {
			this.hideWindow(id);
			document.getElementById(`wrong-${id}`).style.display = 'block';
		}
	}

	public updateTeam(id) {
		let team = this.localstorageService.getItem('team');

		//update team score and the questions that are answerd
		this.locations.forEach((location, index) => {
			if (location.id == id) {
				team.team_score = team.team_score += this.locations[index].points;
				this.answerd.push(location.question_id);

				team.questions_answerd = this.answerd;

				this.localstorageService.updateItem('team', team);

				this.teamService.updateTeam(team.id, { team_score: team.team_score })
					.subscribe((res: Response) => { },
						(err) => console.error(err));

				

				this.teamService.updateTeam(team.id, { questions_answerd: this.answerd })
					.subscribe((res: Response) => { },
						(err) => console.error(err));
			}
		});
	}

	public setValue(answer) {
		this.given_answer = answer;
	}
	public tryAgain(location) {
		this.locations.forEach((array_location, index) => {
			if (array_location.id == location.id) {
				this.locations[index].points = Math.round((this.locations[index].points / this.locations[index].devider));
			}
		});
		document.getElementById(`wrong-${location.id}`).style.display = 'none';
		this.showWindow(location)
	}
	public close(id) {
		document.getElementById(`wrong-${id}`).style.display = 'none';
		document.getElementById(`right-${id}`).style.display = 'none';
		if (this.given_answer == 0) {
			this.locations.forEach((location, index) => {
				if (location.id == id) {
					this.locations[index].points = 0;
				}
			});
		}
		this.changeMarker(id);
		this.updateTeam(id);
	}
	private changeMarker(id) {
		this.locations.forEach((location, index) => {
			if (location.id == id) {
				this.locations[index].map_icon = 2;
			}
		});
	}
	
	private startTimer(locationId) {
		let timeNow: number = Math.round((new Date()).getTime() / 1000);
		let timeEnd: number = timeNow + this.timeLimit;
		this.timeRemaining = this.timeLimit;

		this.timer = setInterval(() => {
			if (this.timeRemaining <= 0) {
				clearInterval(this.timer);
				this.checkAnswer(locationId);
			}

			return this.timeRemaining = timeEnd - Math.round((new Date()).getTime() / 1000);
		}, 500);
	}
	private stopTimer() {
		clearInterval(this.timer);
	}

	public giveHint(id){
		console.log(`this is a hint for q ${id}`);
	}
}
