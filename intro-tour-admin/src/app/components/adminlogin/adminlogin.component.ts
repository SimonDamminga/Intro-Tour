import { Component, OnInit } from '@angular/core';
import {AdminLoginService} from "../../service/admin-login.service";

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

    constructor(private adminLoginService: AdminLoginService) {}

    ngOnInit() {
        //
    }

    loginTo() {
        let data = {
            username: "NekoBot",
            password: "admin"
        };
        this.adminLoginService.loginTo(data);
        console.log(data);
    }

}
