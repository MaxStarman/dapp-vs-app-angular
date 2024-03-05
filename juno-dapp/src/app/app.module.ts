import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink, RouterOutlet} from "@angular/router";
import {BlogComponent} from './components/blog/blog.component';
import {DisplayContentComponent} from "./components/display-content/display-content.component";
import {FrameComponent} from './components/frame/frame.component';
import {HomeComponent} from './components/home/home.component';
import {ButtonComponent} from './components/utils/button/button.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from "./app-routing.module";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		BlogComponent,
		DisplayContentComponent,
		FrameComponent,
		HomeComponent,
		ButtonComponent
	],
	imports: [
		CommonModule,
		BrowserModule,
		FormsModule,
		NgbModule,
		RouterOutlet,
		RouterLink,
		BrowserAnimationsModule,
		AppRoutingModule,
		MatIconModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
