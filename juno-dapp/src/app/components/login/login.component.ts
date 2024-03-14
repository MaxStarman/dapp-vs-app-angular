import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {InternetIdentityProvider, NFIDProvider, signIn, signOut} from '@junobuild/core';
import {UserModel} from "../../models/userModel";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DocService} from "../../services/doc.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	userLoginForm!: FormGroup
	userModel = new UserModel('', '', false);

	readonly signedIn$ = this.authService.signedIn$;
	readonly user$ = this.authService.user$;

	readonly signOut = signOut;

	constructor(
		@Inject(AuthService) private authService: AuthService,
		@Inject(DocService) private docService: DocService,
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
		this.checkUserStatus()
	}).catch(err => {
		console.log(err)
	});
	readonly singInNFID = async () => await signIn({
		provider: new NFIDProvider({
			appName: "Juno dBlog",
			logoUrl: ""
		})
	}).then(() => {
		this.checkUserStatus()
	}).catch(err => {
		console.log(err)
	});

	ngOnInit() {
		this.setFormControls()
	}

	async checkUserStatus() {
		this.userModel = this.userLoginForm.value;
		this.userModel.id = this.authService.userId;

		this.docService.getUserDoc(this.userModel.id).then((user) => {
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
					this.docService.setUserDoc(this.userModel)
				}
				this.docService.username$.next(this.userModel.username)
				this.redirectToBlog()
			}
		})
	}

	private redirectToBlog() {
		this.router?.navigate(['/blog']);
	}

	private setFormControls() {
		this.userLoginForm = this.fb.group({
			username: [this.userModel.username, Validators.required]
		});
	}
}
