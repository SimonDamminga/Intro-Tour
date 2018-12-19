import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {EventComponent} from './components/event/event.component';
import {NavigateComponent} from './components/navigate/navigate.component';
import {AdminloginComponent} from "./components/adminlogin/adminlogin.component";
import {RegisterComponent} from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const appRoutes: Routes = [
    {path: 'event', component: EventComponent},
    {path: 'login', component: AdminloginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'dashboard', component: DashboardComponent}

]

@NgModule({
    declarations: [
        AppComponent,
        EventComponent,
        NavigateComponent,
        AdminloginComponent,
        RegisterComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true}
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
