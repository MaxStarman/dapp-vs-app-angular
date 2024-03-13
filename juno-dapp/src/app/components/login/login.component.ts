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
		this.checkUser()
	});
	readonly singInNFID = async () => await signIn({
		provider: new NFIDProvider({
			appName: "Juno dBlog",
			logoUrl: ""
		})
	}).then(() => {
		this.checkUser()
	});

	ngOnInit() {
		this.setFormControls()
	}

	async checkUser() {
		this.userModel = this.userLoginForm.value;
		this.userModel.id = this.authService.userId;

		// TODO ce je prijavi, preveri ali je vnesen pravi username
		this.docService.getUserDoc(this.userModel.id).then((user) => {
			if (user && user.data.username != this.userModel.username) {
				// check for the same username
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
				this.redirectToBlog()
			}
		})

		// TODO add user data to session

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
