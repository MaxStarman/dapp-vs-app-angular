import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink, RouterOutlet} from '@angular/router';
import {BlogComponent} from './components/blog/blog.component';
import {DisplayContentComponent} from './components/blog/display-content/display-content.component';
import {FrameComponent} from './components/frame/frame.component';
import {HomeComponent} from './components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {UploadModalComponent} from './components/blog/upload-modal/upload-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ButtonComponent} from "./components/button/button.component";

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		BlogComponent,
		DisplayContentComponent,
		FrameComponent,
		HomeComponent,
		UploadModalComponent,
		ButtonComponent
	],
	imports: [
		CommonModule,
		BrowserModule,
		ReactiveFormsModule,
		NgbModule,
		RouterOutlet,
		RouterLink,
		BrowserAnimationsModule,
		AppRoutingModule,
		MatIconModule,
		MatTabsModule,
		MatFormFieldModule,
		MatInputModule,
		MatCardModule,
		MatDialogModule,
		MatSnackBarModule,
		MatButtonModule,
		MatTableModule,
		MatProgressSpinnerModule

	],
	providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}],
	exports: [
		UploadModalComponent,
		DisplayContentComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
