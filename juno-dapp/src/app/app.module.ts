import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'; // Import FormsModule for ngModel
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from "./components/login/login.component";

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
