import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {

  constructor(
      private route: Router
  ) { }

  ngOnInit() {

  }

  logOut() {
      localStorage.removeItem('currentUser');
      this.route.navigate(['/login']);
  }
}
