import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EventComponent } from './components/event/event.component';
import { NavigateComponent } from './components/navigate/navigate.component';
import { NumericFormControlDirective } from './directives/numericFormControl.directive';


const appRoutes: Routes = [
	{ path: 'event', component: EventComponent }
]

@NgModule({
	declarations: [
		AppComponent,
		EventComponent,
		NavigateComponent,
		NumericFormControlDirective
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		RouterModule.forRoot(
			appRoutes,
			{ enableTracing: true }
		)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
