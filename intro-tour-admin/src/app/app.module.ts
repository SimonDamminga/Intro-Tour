import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EventComponent } from './components/event/event.component';
import { NavigateComponent } from './components/navigate/navigate.component';
import { NumericFormControlDirective } from './directives/numericFormControl.directive';

import { AgmCoreModule } from '@agm/core';
import { PlayfieldComponent } from './components/event/playfield/playfield.component';


const appRoutes: Routes = [
  { path: 'event', component: EventComponent },
  {path: 'make-play-field', component: PlayfieldComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    NavigateComponent,
    NumericFormControlDirective,
    PlayfieldComponent
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
      apiKey: 'AIzaSyDY85XunkRxZh142fdwf4cpHqg7Q4Yv9Sc',
      libraries: ['drawing'],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
