import {Component, OnInit} from '@angular/core';
import {AdminLoginService} from "../../service/admin-login.service";
import * as $ from "jquery";
import {Router} from "@angular/router";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(
        private adminLoginService: AdminLoginService,
        private route: Router
    ) {
    }

    ngOnInit() {
        if (localStorage.getItem('currentUser') != undefined) {
            this.route.navigateByUrl('/dashboard');
        }
    }

    registerTo() {
        let data = {
            username: $("input[name = 'username']").val(),
            email: $("input[name = 'e-mail']").val(),
            password: $("input[name = 'password']").val(),
            cPassword: $("input[name = 'cPassword']").val()
        };
        this.adminLoginService.SendTo(data, "register");

    }
}
