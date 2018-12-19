import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playfield',
  templateUrl: './playfield.component.html',
  styleUrls: ['./playfield.component.css']
})
export class PlayfieldComponent implements OnInit {

	curPosition = {
		x: null,
		y: null
	}

  constructor() { }

  ngOnInit() {
    this.getLocation();
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
  
  public test() {
    console.log('het werkt');
  }
}
