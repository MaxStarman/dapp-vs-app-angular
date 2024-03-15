import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../env/environment";
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './components/login/login.component';
import {BlogComponent} from './components/blog/blog.component';
import {HomeComponent} from './components/home/home.component';
import {FrameComponent} from './components/frame/frame.component';
import {ButtonComponent} from './components/button/button.component';
import {UploadModalComponent} from './components/blog/upload-modal/upload-modal.component';
import {DisplayContentComponent} from './components/blog/display-content/display-content.component';


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		BlogComponent,
		HomeComponent,
		FrameComponent,
		ButtonComponent,
		UploadModalComponent,
		DisplayContentComponent
	],
	imports: [
		CommonModule,
		BrowserModule,
		ReactiveFormsModule,
		NgbModule,
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebase),
		RouterOutlet,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
