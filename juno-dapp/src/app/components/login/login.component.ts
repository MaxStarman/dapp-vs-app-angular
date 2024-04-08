import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {InternetIdentityProvider, NFIDProvider, signIn, signOut} from '@junobuild/core';
import {UserData} from "../../models/userData";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	userLoginForm!: FormGroup
	userModel: UserData = {uid: '', username: '', admin: false};

	readonly signedIn$ = this.authService.signedIn$;

	constructor(
		public authService: AuthService,
		private router: Router,
		private fb: FormBuilder,
		public snackBar: MatSnackBar
	) {
	}

	readonly signInII = async () => await signIn({
		provider: new InternetIdentityProvider({
			domain: "ic0.app"
		})
	}).then(() => {
		console.log('ii sign in')
		this.checkUserStatus()
	}).catch(err => {
		console.error(err)
	});
	readonly singInNFID = async () => await signIn({
		provider: new NFIDProvider({
			appName: "Juno dBlog",
			logoUrl: ""
		})
	}).then(() => {
		this.checkUserStatus()
	}).catch(err => {
		console.error(err)
	});

	ngOnInit() {
		this.setFormControls()
	}

	async checkUserStatus() {
		this.userModel = this.userLoginForm.value;
		this.userModel.uid = this.authService.userId;
		this.userModel.admin = false;

		this.authService.getUserDoc(this.userModel.uid).then((user) => {
			// check for the same username
			if (user && user.data.username != this.userModel.username) {
				// singOut if is not the same as in DB
				signOut()
				this.userLoginForm.reset()
				this.snackBar.open('Wrong username', 'Dismiss', {
					panelClass: ['error'],
					duration: 3000
				})
			} else {
				// add user to db
				if (!user) {
					this.authService.setUserDoc(this.userModel)
				}
				this.authService.username$.next(this.userModel.username)
				// this.navigateToBlog()
			}
		})
	}

	navigateToBlog() {
		this.router?.navigate(['/blog']);
	}

	private setFormControls() {
		this.userLoginForm = this.fb.group({
			username: [this.userModel.username, Validators.required]
		});
	}
}
