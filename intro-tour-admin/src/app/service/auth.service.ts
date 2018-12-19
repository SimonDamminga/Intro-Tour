import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private route: Router,
    ) {
        //
    }

    private token = localStorage.getItem('currentUser');

    userAuth() {
        if (this.token == undefined) {
            this.route.navigateByUrl("/login");
        }
    }
}
