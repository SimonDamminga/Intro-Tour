import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EventComponent } from './components/event/event.component';
import { NavigateComponent } from './components/navigate/navigate.component';

import { AgmCoreModule } from '@agm/core';


const appRoutes: Routes = [
  {path: 'event', component: EventComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    NavigateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDY85XunkRxZh142fdwf4cpHqg7Q4Yv9Sc'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
