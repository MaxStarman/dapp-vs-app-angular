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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './components/login/login.component';
import {BlogComponent} from './components/blog/blog.component';
import {HomeComponent} from './components/home/home.component';
import {FrameComponent} from './components/frame/frame.component';
import {ButtonComponent} from './components/button/button.component';
import {UploadModalComponent} from './components/blog/upload-modal/upload-modal.component';
import {DisplayContentComponent} from './components/blog/display-content/display-content.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";


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
		RouterOutlet,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AngularFirestoreModule,
		AngularFireStorageModule,
		MatTabsModule,
		MatFormFieldModule,
		MatInputModule,
		MatCardModule,
		MatDialogModule,
		MatSnackBarModule,
		MatButtonModule,
		MatTableModule,
		MatProgressSpinnerModule,
		MatIconModule,
		FormsModule,
		ReactiveFormsModule,
		MatIconModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
