import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import {environment} from "../../../../intro-tour-client/src/environments/environment";



@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

    private apiUrl: string = environment.API_URL;

  constructor(
      private http: HttpClient,
      private route: Router,
  ) {}

  loginTo(data) {
    const httpData = {headers: new HttpHeaders({
        "email": data[1],
        "password": data[2]
    })};
    return this.http.post(this.apiUrl + "loginRequest" , httpData).subscribe(
        res => {
            console.log(res);
        },
        err => {
            console.log("Error occured");
        }
    );
  }
}
